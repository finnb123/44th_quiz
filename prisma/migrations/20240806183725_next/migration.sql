/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_QuestionToQuiz` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `correct` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `questionId` on the `Answer` table. All the data in the column will be lost.
  - Added the required column `answers` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questions` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_QuestionToQuiz_B_index";

-- DropIndex
DROP INDEX "_QuestionToQuiz_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_QuestionToQuiz";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Answer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL
);
INSERT INTO "new_Answer" ("content", "id") SELECT "content", "id" FROM "Answer";
DROP TABLE "Answer";
ALTER TABLE "new_Answer" RENAME TO "Answer";
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "image_url" TEXT,
    "answers" TEXT NOT NULL
);
INSERT INTO "new_Question" ("content", "id", "image_url") SELECT "content", "id", "image_url" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE TABLE "new_Quiz" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "questions" TEXT NOT NULL
);
INSERT INTO "new_Quiz" ("id", "published", "title") SELECT "id", "published", "title" FROM "Quiz";
DROP TABLE "Quiz";
ALTER TABLE "new_Quiz" RENAME TO "Quiz";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
