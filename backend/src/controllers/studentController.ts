import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod"

const prisma = new PrismaClient()

const studentSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    codeforcesHandle: z.string(),
    currentRating: z.number(),
    maxRating: z.number()
})

export const getAllStudents = async (req: Request, res: Response) => {
    const students = await prisma.student.findMany()
    res.json(students)
}

export const createStudent = async (req: Request, res: Response) => {
    const result = studentSchema.safeParse(req.body)
    if (!result.success) {
        return res.status(400).json(result.error)
    }

    const data = result.data
    const student = await prisma.student.create({ data })
    res.json(student)
}