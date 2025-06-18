import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod"
import { syncCodeforcesData } from "../utils/syncCfData";
import { fetchCodeforcesUserData } from "../utils/fetchCodeforcesData";

const prisma = new PrismaClient()

const studentSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    codeforcesHandle: z.string()
})

export const getAllStudents = async (req: Request, res: Response) => {
    const students = await prisma.student.findMany();

    // Update Codeforces data for each student
    for (const student of students) {
        if (student.codeforcesHandle) {
            await syncCodeforcesData(student.id, student.codeforcesHandle);
        }
    }

    // Fetch updated students
    const updatedStudents = await prisma.student.findMany();
    res.json(updatedStudents);
};

export const createStudent = async (req: Request, res: Response) => {
    const result = studentSchema.safeParse(req.body)
    if (!result.success) {
        return res.status(400).json(result.error)
    }

    const {name, email, phone, codeforcesHandle} = result.data

    const cfData = await fetchCodeforcesUserData(codeforcesHandle)
    const student = await prisma.student.create({ 
        data: {
            name,
            email,
            phone,
            codeforcesHandle,
            currentRating: cfData?.rating ?? 0,
            maxRating: cfData?.maxRating ?? 0,
            cfDataUpdatedAt: new Date()
        }
    })
    res.json(student)
}

export const updateCfHandle = async (req: Request, res: Response) => {
    const studentId = req.params.id
    const { handle } = req.body

    await prisma.student.update({
        where: { id: studentId },
        data: { codeforcesHandle: handle }
    })

    // Trigger sync immediately
    await syncCodeforcesData(studentId, handle)

    res.json({ message: "Handle updated and data synced" })
}