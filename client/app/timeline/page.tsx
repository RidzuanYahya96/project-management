
"use client";

import { useAppSelector } from "@/app/redux";
import Header from "@/src/components/Header";
import { useGetProjectsQuery } from "@/src/state/api";
import {
    Gantt,
    Willow,
    WillowDark,
    type ITask,
} from "@svar-ui/react-gantt";
import React, { useMemo, useState } from "react";

type ViewMode = "day" | "week" | "month";

const TimelineView = () => {
    const isDarkMode = useAppSelector(
        (state) => state.global.isDarkMode
    );

    const {
        data: projects,
        isLoading,
        isError,
    } = useGetProjectsQuery();

    const [viewMode, setViewMode] = useState<ViewMode>("month");

    const ganttTasks: ITask[] = useMemo(() => {
        return (projects ?? [])
            .filter((project) => project.startDate && project.endDate)
            .map((project) => ({
                id: `Project-${project.id}`,
                text: project.name,
                start: new Date(project.startDate!),
                end: new Date(project.endDate!),
                type: "summary",
                progress: 50,
                open: true,
            }))
            .filter(
                (project) =>
                    !isNaN(project.start.getTime()) &&
                    !isNaN(project.end.getTime()) &&
                    project.end >= project.start
            );
    }, [projects]);

    const scales = useMemo(() => {
        if (viewMode === "day") {
            return [
                { unit: "month" as const, step: 1, format: "MMMM yyyy" },
                { unit: "day" as const, step: 1, format: "d" },
            ];
        }

        if (viewMode === "week") {
            return [
                { unit: "month" as const, step: 1, format: "MMMM yyyy" },
                { unit: "week" as const, step: 1, format: "w" },
            ];
        }

        return [
            { unit: "year" as const, step: 1, format: "yyyy" },
            { unit: "month" as const, step: 1, format: "MMMM" },
        ];
    }, [viewMode]);

    const gridWidth = useMemo(() => {
        const longestName = Math.max(
            0,
            ...ganttTasks.map((project) => (project.text ?? "").length)
        );

        return Math.min(Math.max(longestName * 8 + 40, 350), 800);
    }, [ganttTasks]);

    const Theme = isDarkMode ? WillowDark : Willow;

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

                <select
                    className="w-64 rounded border border-gray-400 bg-white px-4 py-2 shadow dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
                    value={viewMode}
                    onChange={(event) =>
                        setViewMode(event.target.value as ViewMode)
                    }
                >
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                </select>
            </header>

            <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
                <div className="timeline">
                    {ganttTasks.length > 0 ? (
                        <Theme>
                            <Gantt
                                tasks={ganttTasks}
                                scales={scales}
                                cellWidth={
                                    viewMode === "month"
                                        ? 150
                                        : viewMode === "week"
                                        ? 100
                                        : 60
                                }
                                gridWidth={gridWidth}
                                cellHeight={44}
                                autoScale
                            />
                        </Theme>
                    ) : (
                        <p className="p-4">
                            No projects with valid start and end dates found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TimelineView;
