
"use client";

import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/src/state/api";
import {
    Gantt,
    Willow,
    WillowDark,
    type ITask,
} from "@svar-ui/react-gantt";
import React, { useMemo, useState } from "react";

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type ViewMode = "day" | "week" | "month";

const TimelineView = ({ id, setIsModalNewTaskOpen }: Props) => {
    const isDarkMode = useAppSelector(
        (state) => state.global.isDarkMode
    );

    const {
        data: tasks,
        error,
        isLoading,
    } = useGetTasksQuery({ projectId: Number(id) });

    const [viewMode, setViewMode] = useState<ViewMode>("month");

    const ganttTasks: ITask[] = useMemo(() => {
        return (tasks ?? [])
            .filter((task) => task.startDate && task.dueDate)
            .map((task) => ({
                id: `Task-${task.id}`,
                text: task.title,
                start: new Date(task.startDate!),
                end: new Date(task.dueDate!),
                type: "task",
                progress: task.points
                    ? Math.min(100, (task.points / 10) * 100)
                    : 0,
            }))
            .filter(
                (task) =>
                    !isNaN(task.start.getTime()) &&
                    !isNaN(task.end.getTime()) &&
                    task.end >= task.start
            );
    }, [tasks]);

    const scales = useMemo(() => {
        if (viewMode === "day") {
            return [
                { unit: "day" as const, step: 1, format: "d MMM" },
            ];
        }

        if (viewMode === "week") {
            return [
                { unit: "week" as const, step: 1, format: "MMM yyyy" },
                { unit: "day" as const, step: 1, format: "d" },
            ];
        }

        return [
            { unit: "month" as const, step: 1, format: "MMMM yyyy" },
            { unit: "week" as const, step: 1, format: "w" },
        ];
    }, [viewMode]);

    const Theme = isDarkMode ? WillowDark : Willow;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div className="p-4 text-red-500">
                An error occurred while fetching tasks.
            </div>
        );
    }

    return (
        <div className="px-4 xl:px-6">
            <div className="flex flex-wrap items-center justify-between gap-2 py-5">
                <h1 className="me-2 text-lg font-bold dark:text-white">
                    Project Task Timeline
                </h1>

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
            </div>

            <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
                <div className="timeline">
                    {ganttTasks.length > 0 ? (
                        <Theme>
                            <Gantt
                                tasks={ganttTasks}
                                scales={scales}
                                cellWidth={
                                    viewMode === "month"
                                        ? 120
                                        : viewMode === "week"
                                        ? 80
                                        : 60
                                }
                                gridWidth={250}
                                cellHeight={44}
                                autoScale
                            />
                        </Theme>
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
