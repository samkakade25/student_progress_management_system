import { PrismaClient } from "@prisma/client";
import { fetchUserRating, fetchUserSubmissions } from "../services/cfService";

const prisma = new PrismaClient();

export async function syncCodeforcesData(studentId: string, handle: string) {
    try {
        // Check if data was updated within the last 24 hours
        const student = await prisma.student.findUnique({
            where: { id: studentId },
        });

        if (student?.cfDataUpdatedAt) {
            const lastUpdated = new Date(student.cfDataUpdatedAt);
            const now = new Date();
            const hoursSinceUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);

            if (hoursSinceUpdate < 24) {
                console.log(`Skipping sync for ${handle}, data updated within 24 hours.`);
                return;
            }
        }

        // 1. Fetch contest rating data
        const ratingHistory = await fetchUserRating(handle);
        const contests = ratingHistory.map((r: any) => ({
            studentId,
            ratingChange: r.newRating - r.oldRating,
            rank: r.rank,
            problemsUnsolved: 0,
            date: new Date(r.ratingUpdateTimeSeconds * 1000),
        }));

        // Delete old contests
        await prisma.contest.deleteMany({ where: { studentId } });
        await prisma.contest.createMany({ data: contests });

        // 2. Fetch problem submissions
        const submissions = await fetchUserSubmissions(handle);

        // Filter accepted solutions
        const acSubs = submissions.filter((s: any) => s.verdict === "OK");

        // Map date - problems solved with rating
        const dateMap = new Map<string, number[]>();
        for (const sub of acSubs) {
            const date = new Date(sub.creationTimeSeconds * 1000);
            const dayKey = date.toISOString().split("T")[0];
            const rating = sub.problem.rating ?? 0;
            if (!dateMap.has(dayKey)) dateMap.set(dayKey, []);
            dateMap.get(dayKey)!.push(rating);
        }

        // Create ProblemStat entries
        await prisma.problemStat.deleteMany({ where: { studentId } });
        for (const [dateStr, ratings] of dateMap.entries()) {
            const avgRating = Math.round(
                ratings.reduce((a, b) => a + b, 0) / ratings.length
            );
            await prisma.problemStat.create({
                data: {
                    studentId,
                    date: new Date(dateStr),
                    rating: avgRating,
                },
            });
        }

        // Update student's ratings
        const latest = ratingHistory[ratingHistory.length - 1];
        await prisma.student.update({
            where: { id: studentId },
            data: {
                currentRating: latest.newRating,
                maxRating: Math.max(...ratingHistory.map((r: any) => r.newRating)),
                cfDataUpdatedAt: new Date(),
            },
        });

        console.log(`Synced Codeforces data for: ${handle}`);
    } catch (err) {
        console.error(`Error syncing Codeforces data for ${handle}:`, err);
    }
}