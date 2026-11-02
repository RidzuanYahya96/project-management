"use client";

import { useAppSelector } from "@/app/redux";
import Header from "@/src/components/Header";
import { useGetProjectsQuery } from "@/src/state/api";
import {
    Gantt,
    ViewMode,
    type Task,
} from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React, { useMemo, useState } from "react";

const TimelineView = () => {
    const isDarkMode = useAppSelector(
        (state) => state.global.isDarkMode
    );

    const {
        data: projects,
        isLoading,
        isError
    } = useGetProjectsQuery();

    const [viewMode, setViewMode] = useState<ViewMode>(
        ViewMode.Month
    );

    const ganttTasks: Task[] = useMemo(() => {
        return (projects ?? [])
            .filter((project) => project.startDate && project.endDate)
            .map((project) => ({
                start: new Date(project.startDate!),
                end: new Date(project.endDate!),
                name: project.name,
                id: `Project-${project.id}`,
                type: "project" as const,
                progress: 50,
                isDisabled: false,
            }))
            .filter(
                (project) =>
                    !isNaN(project.start.getTime()) &&
                    !isNaN(project.end.getTime()) &&
                    project.end >= project.start
            );
    }, [projects]);

    const listCellWidth = useMemo(() => {
        const longestName = Math.max(
            0,
            ...ganttTasks.map((project) => project.name.length)
        );

        // Estimate 8px per character, plus padding
        const nameWidth = longestName * 8 + 40;

        // Reserve space for From and To date columns
        const dateColumnsWidth = 260;

        const totalWidth = nameWidth + dateColumnsWidth;

        return `${Math.min(Math.max(totalWidth, 350), 800)}px`;
    }, [ganttTasks]);

    const handleViewModeChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setViewMode(event.target.value as ViewMode);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !projects) {
        return <div>An error occurred while fetching projects.</div>;
    }

    return (
        <div className="max-w-full p-8">
            <header className="mb-4 flex items-center justify-between">
                <Header name="Projects Timeline" />

                <div className="relative inline-block w-64">
                    <select
                        className="block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 shadow dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
                        value={viewMode}
                        onChange={handleViewModeChange}
                    >
                        <option value={ViewMode.Day}>Day</option>
                        <option value={ViewMode.Week}>Week</option>
                        <option value={ViewMode.Month}>Month</option>
                    </select>
                </div>
            </header>

            <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
                <div className="timeline">
                    {ganttTasks.length > 0 ? (
                        <Gantt
                            tasks={ganttTasks}
                            viewMode={viewMode}
                            locale="en-US"
                            columnWidth={
                                viewMode === ViewMode.Month
                                    ? 150
                                    : viewMode === ViewMode.Week
                                    ? 250
                                    : 60
                            }
                            listCellWidth="175px"
                            projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937"}
                            projectProgressColor={isDarkMode ? "#1f2937" : "#aeb8c2"}
                            projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
                        />
                    ) : (
                        <p className="p-4">
                            No tasks with valid start and due dates found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TimelineView;