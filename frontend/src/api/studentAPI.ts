import axios from "axios"
import type { Student } from "../types/Student"

const API_URL = "http://localhost:4000/students"

export const getStudents = async (): Promise<Student[]> => {
    const res = await axios.get(API_URL)
    return res.data
}

export const createStudent = async (student: Student): Promise<Student> => {
    const res = await axios.post(API_URL, student)
    return res.data
}