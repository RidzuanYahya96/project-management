"use client";

import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/src/state/api";
import {
    Gantt,
    ViewMode,
    type Task,
} from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React, { useMemo, useState } from "react";

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TimelineView = ({
    id,
    setIsModalNewTaskOpen,
}: Props) => {
    const isDarkMode = useAppSelector(
        (state) => state.global.isDarkMode
    );

    const {
        data: tasks,
        error,
        isLoading,
    } = useGetTasksQuery({ projectId: Number(id) });

    const [viewMode, setViewMode] = useState<ViewMode>(
        ViewMode.Month
    );

    const ganttTasks: Task[] = useMemo(() => {
        return (tasks ?? [])
            .filter((task) => task.startDate && task.dueDate)
            .map((task) => ({
                start: new Date(task.startDate!),
                end: new Date(task.dueDate!),
                name: task.title,
                id: `Task-${task.id}`,
                type: "task" as const,
                progress: task.points
                    ? Math.min(100, (task.points / 10) * 100)
                    : 0,
                isDisabled: false,
            }))
            .filter(
                (task) =>
                    !isNaN(task.start.getTime()) &&
                    !isNaN(task.end.getTime()) &&
                    task.end >= task.start
            );
    }, [tasks]);

    const handleViewModeChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setViewMode(event.target.value as ViewMode);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>An error occurred while fetching tasks.</div>;
    }

    const listCellWidth = useMemo(() => {
        const longestName = Math.max(
            0,
            ...(ganttTasks.map((task) => task.name.length))
        );

        // Estimate 8px per character, plus padding
        const nameWidth = longestName * 8 + 40;

        // Reserve space for From and To date columns
        const dateColumnsWidth = 260;

        // Keep the list within reasonable limits
        const totalWidth = nameWidth + dateColumnsWidth;

        return `${Math.min(Math.max(totalWidth, 350), 800)}px`;
    }, [ganttTasks]);

    return (
        <div className="px-4 xl:px-6">
            <div className="flex flex-wrap items-center justify-between gap-2 py-5">
                <h1 className="me-2 text-lg font-bold dark:text-white">
                    Project Task Timeline
                </h1>

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
            </div>

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
                            listCellWidth="200px"
                            barBackgroundColor={
                                isDarkMode ? "#101214" : "#aeb8c2"
                            }
                            barBackgroundSelectedColor={
                                isDarkMode ? "#000000" : "#9ba1a6"
                            }
                        />
                    ) : (
                        <p className="p-4">
                            No tasks with valid start and due dates found.
                        </p>
                    )}
                </div>

                <div className="px-4 pb-5 pt-4">
                    <button
                        type="button"
                        className="flex items-center rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                        onClick={() => setIsModalNewTaskOpen(true)}
                    >
                        Add New Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimelineView;