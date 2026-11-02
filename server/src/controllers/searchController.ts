import { Request, Response } from "express";
//import { PrismaClient } from "@prisma/client";
import prisma from "../lib/prisma";

//const prisma = new PrismaClient();


export const search = async (
    req: Request,
    res: Response
): Promise<void> => {
    const query = String(req.query.query ?? "").trim();

    if (!query) {
        res.json({
            tasks: [],
            projects: [],
            users: [],
        });
        return;
    }

    try {
        const [tasks, projects, users] = await Promise.all([
            prisma.task.findMany({
                where: {
                    OR: [
                        { title: { contains: query, mode: "insensitive" } },
                        { description: { contains: query, mode: "insensitive" } },
                    ],
                },
            }),

            prisma.project.findMany({
                where: {
                    OR: [
                        { name: { contains: query, mode: "insensitive" } },
                        { description: { contains: query, mode: "insensitive" } },
                    ],
                },
            }),

            prisma.user.findMany({
                where: {
                    username: { contains: query, mode: "insensitive" },
                },
            }),
        ]);

        res.json({ tasks, projects, users });
    } catch (error: unknown) {
        console.error("Error performing search:", error);

        res.status(500).json({
            message: "Error performing search.",
        });
    }
}; 