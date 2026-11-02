export const dataGridClassNames =
    "border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary";

export const dataGridSxStyles = (isDarkMode: boolean) => {
    return {
        color: isDarkMode ? "#e5e7eb" : "#111827",
        backgroundColor: isDarkMode ? "#1b1f23" : "#ffffff",
        border: `1px solid ${isDarkMode ? "#2d3135" : "#e5e7eb"}`,

        "& .MuiDataGrid-columnHeaders": {
            color: isDarkMode ? "#e5e7eb" : "#111827",
            backgroundColor: isDarkMode ? "#1d1f21" : "#ffffff",
        },

        "& .MuiDataGrid-columnHeader": {
            backgroundColor: isDarkMode ? "#1d1f21" : "#ffffff",
            color: isDarkMode ? "#e5e7eb" : "#111827",
        },

        "& .MuiDataGrid-columnHeaderTitle": {
            color: isDarkMode ? "#e5e7eb" : "#111827",
        },

        "& .MuiDataGrid-filler": {
            backgroundColor: isDarkMode ? "#1d1f21" : "#ffffff",
        },

        "& .MuiDataGrid-cell": {
            color: isDarkMode ? "#e5e7eb" : "#111827",
            //borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
            border: "none"
        },

        "& .MuiDataGrid-row": {
            backgroundColor: isDarkMode ? "#1b1f23" : "#ffffff",
        },

        "& .MuiDataGrid-row:hover": {
            backgroundColor: isDarkMode ? "#272b30" : "#f9fafb",
        },

        "& .MuiDataGrid-withBorderColor": {
            borderColor: isDarkMode ? "#2d3135" : "#e5e7eb",
        },

        "& .MuiIconButton-root": {
            color: isDarkMode ? "#a3a3a3" : "#4b5563",
        },

        "& .MuiTablePagination-root": {
            color: isDarkMode ? "#a3a3a3" : "#4b5563",
        },

        "& .MuiTablePagination-selectIcon": {
            color: isDarkMode ? "#a3a3a3" : "#4b5563",
        }, 
    };
};