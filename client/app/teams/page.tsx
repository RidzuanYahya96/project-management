"use client";

import { useGetTeamsQuery } from "@/src/state/api";
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
    {field: "id", headerName: "Team ID", width: 100},
    {field: "teamName", headerName: "Team Name", width: 200},
    {field: "productOwnerUsername", headerName: "Product Owner", width: 200},
    {field: "projectManagerUsername", headerName: "Project Manager", width: 2000},
    
];

const Teams = () => {
    const {data: teams, isLoading, isError} = useGetTeamsQuery();
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    if (isLoading) return <div>Loading...</div>;
    if (isError || !teams) return <div>Error fetching teams</div>;

    return <div className="flex w-full flex-col p-8">
        <Header name="Teams" />
        <div style={{height: 650, width: "50%"}}>
            <DataGrid
                rows={teams || []}
                columns={columns}
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

export default Teams;