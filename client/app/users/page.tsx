"use client";

import { useGetUsersQuery } from "@/src/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import Header from "@/src/components/Header";
import {
    DataGrid,
    GridColDef,
    Toolbar,
    ToolbarButton,
    ColumnsPanelTrigger,
    FilterPanelTrigger,
    ExportCsv,
} from "@mui/x-data-grid";
import Image from "next/image";
import { dataGridClassNames, dataGridSxStyles } from "@/src/lib/util";

const CustomToolbar = () => (
    <Toolbar className="flex gap-1">
        <ColumnsPanelTrigger
            render={<ToolbarButton size="small" />}
        >
            Columns
        </ColumnsPanelTrigger>

        <FilterPanelTrigger
            render={<ToolbarButton size="small" />}
        >
            Filter
        </FilterPanelTrigger>

        <ExportCsv render={<ToolbarButton size="small" />}>
            Export CSV
        </ExportCsv>
    </Toolbar>
);

const columns: GridColDef[] = [
    { field: "userId", headerName: "ID", flex: 0.5, minWidth: 70 },
    { field: "username", headerName: "Username", flex: 1, minWidth: 120 },
    {
        field: "profilePictureUrl",
        headerName: "Profile Picture",
        flex: 1,
        minWidth: 130,
        renderCell: (params) => (
            <div className="flex h-full w-full items-center justify-center">
                <div className="h-9 w-9">
                    <Image
                        src={`/${params.value}`}
                        alt={params.row.username}
                        width={100}
                        height={50}
                        className="h-full rounded-full object-cover"
                    />
                </div>
            </div>
        ),
    },
];

const Users = () => {
    const {data: users, isLoading, isError} = useGetUsersQuery();
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    if (isLoading) return <div>Loading...</div>;
    if (isError || !users) return <div>Error fetching users</div>;

    return <div className="flex w-full flex-col p-8">
        <Header name="Users" />
        <div style={{height: 650, width: "50%"}}>
            <DataGrid
                rows={users || []}
                columns={columns}
                getRowId={(row) => row.userId}
                pagination
                showToolbar
                slots={{
                    toolbar: CustomToolbar,
                }}
                className={dataGridClassNames}
                sx={{
                    ...dataGridSxStyles(isDarkMode),
                    backgroundColor: isDarkMode ? "#1b1f23" : "#ffffff",
                    color: isDarkMode ? "#e5e7eb" : "#111827",
                    borderColor: isDarkMode ? "#2d3135" : "#e5e7eb",

                    "& .MuiDataGrid-cell": {
                        backgroundColor: isDarkMode ? "#1b1f23" : "#ffffff",
                        color: isDarkMode ? "#e5e7eb" : "#111827",
                        borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
                    },

                    "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-toolbar": {
                        backgroundColor: isDarkMode ? "#101214" : "#ffffff",
                        color: isDarkMode ? "#e5e7eb" : "#111827",
                    },

                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: isDarkMode ? "#101214" : "#ffffff",
                        color: isDarkMode ? "#e5e7eb" : "#111827",
                    },
                }}
            />    
        </div>     
    </div>
}

export default Users;