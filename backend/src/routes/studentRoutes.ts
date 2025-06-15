import express, { Request, Response } from "express";
import { getAllStudents, createStudent } from "../controllers/studentController";

const router = express.Router();

router.get("/", (req: Request, res: Response) => getAllStudents(req, res));
router.post("/", async (req: Request, res: Response) => {
  try {
    await createStudent(req, res);
  } catch (error) {
    res.status(500).send({ error: "An error occurred while creating the student." });
  }
});

export default router;