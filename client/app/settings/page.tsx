"use client";

import Header from "@/src/components/Header";
import React from "react";
import { useAppSelector } from "../redux";

const Settings = () => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const userSettings = {
        username: "johndoe",
        email: "john.doe@example.com",
        teamName: "Development Team",
        roleName: "Developer",
    };

    const labelStyles = `block text-sm font-medium ${
        isDarkMode ? "text-white" : "text-gray-700"
    }`;
    const textStyles = `mt-1 block max-w-md rounded-md border p-2 shadow-sm ${
        isDarkMode
            ? "bg-[#1b1f23] text-white border-[#2d3135]"
            : "bg-white text-gray-900 border-gray-300"
    }`;

    return (
        <div className="p-8">
            <Header name="Settings" />
            <div className="space-y-4">
                <div>
                    <label className={labelStyles}>Username</label>
                    <div className={textStyles}>{userSettings.username}</div>
                </div>
            </div>
            <div>
                <label className={labelStyles}>Email</label>
                <div className={textStyles}>{userSettings.email}</div>
            </div>
            <div>
                <label className={labelStyles}>Team</label>
                <div className={textStyles}>{userSettings.teamName}</div>
            </div>
            <div>
                <label className={labelStyles}>Role</label>
                <div className={textStyles}>{userSettings.roleName}</div>
            </div>    
        </div>
    )
}

export default Settings;