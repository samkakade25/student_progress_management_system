import express, { Request, Response } from "express";
import { getAllStudents, createStudent } from "../controllers/studentController";
import { fetchCodeforcesUserData } from "../utils/fetchCodeforcesData";

const router = express.Router();

router.get("/", (req: Request, res: Response) => getAllStudents(req, res));
router.post("/", async (req: Request, res: Response) => {
  try {
    await createStudent(req, res);
  } catch (error) {
    res.status(500).send({ error: "An error occurred while creating the student." });
  }
});

router.get("/codeforces/:handle", async (req, res) => {
  const { handle } = req.params;
  try {
    const data = await fetchCodeforcesUserData(handle);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Codeforces data" });
  }
});

export default router;