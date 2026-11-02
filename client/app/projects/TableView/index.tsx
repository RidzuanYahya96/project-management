import { useAppSelector } from "@/app/redux";
import Header from "@/src/components/Header";
import { dataGridClassNames, dataGridSxStyles } from "@/src/lib/util";
import { useGetTasksQuery } from "@/src/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
}


const columns: GridColDef[] = [
    {
        field: "title",
        headerName: "Title",
        minWidth: 120,
        flex: 1,
    },
    {
        field: "description",
        headerName: "Description",
        minWidth: 180,
        flex: 2,
    },
    {
        field: "status",
        headerName: "Status",
        minWidth: 120,
        flex: 1,
        renderCell: (params) => (
            <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold leading-5 text-green-800">
                {params.value}
            </span>
        ),
    },
    {
        field: "priority",
        headerName: "Priority",
        minWidth: 90,
        flex: 0.7,
    },
    {
        field: "tags",
        headerName: "Tags",
        minWidth: 110,
        flex: 1,
    },
    {
        field: "startDate",
        headerName: "Start Date",
        minWidth: 120,
        flex: 1,
    },
    {
        field: "dueDate",
        headerName: "Due Date",
        minWidth: 120,
        flex: 1,
    },
    {
        field: "author",
        headerName: "Author",
        minWidth: 120,
        flex: 1,
        renderCell: (params) => params.value?.author || "Unknown",
    },
    {
        field: "assignee",
        headerName: "Assignee",
        minWidth: 120,
        flex: 1,
        renderCell: (params) => params.value?.assignee || "Unassigned",
    },
];

const TableView = ({ id, setIsModalNewTaskOpen }: Props) => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const {
        data: tasks,           
        error,
        isLoading,
    } = useGetTasksQuery({ projectId: Number(id) });

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>An error occured while fetching tasks</div>

    return (
        <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
            <div className="pt-5">
                <Header name="Table"
                    buttonComponent={
                        <button
                            className="flex items-center  rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                            onClick={() => setIsModalNewTaskOpen(true)}
                        >
                            Add Task
                        </button>  
                    }  
                    isSmallText
                />
            </div>
                <DataGrid 
                    rows={tasks || []} 
                    columns={columns}
                    className={dataGridClassNames}
                    sx={dataGridSxStyles(isDarkMode)}
                    disableRowSelectionOnClick
                />

        </div>
    )
}

export default TableView;