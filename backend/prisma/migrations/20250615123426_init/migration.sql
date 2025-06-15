-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "codeforcesHandle" TEXT NOT NULL,
    "currentRating" INTEGER NOT NULL,
    "maxRating" INTEGER NOT NULL,
    "cfDataUpdatedAt" TIMESTAMP(3),
    "reminderEmails" INTEGER NOT NULL DEFAULT 0,
    "emailReminders" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contest" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "ratingChange" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "problemsUnsolved" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemStat" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "ProblemStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_codeforcesHandle_key" ON "Student"("codeforcesHandle");

-- AddForeignKey
ALTER TABLE "Contest" ADD CONSTRAINT "Contest_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemStat" ADD CONSTRAINT "ProblemStat_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
