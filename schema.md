// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

datasource db {
provider = "sqlite"
url = env("DATABASE_URL")
}

generator client {
provider = "prisma-client-js"
}

model User {
id String @id @unique
username String @unique
hashed_password String
sessions Session[]
}

// model Post {
// // int idx are fine for now, but we should use UUIDs in the future
// id Int @id @default(autoincrement())
// title String
// content String?
// createdAt DateTime @default(now())
// updatedAt DateTime @updatedAt
// published Boolean @default(false)
// author User? @relation(fields: [authorId], references: [id])
// authorId String?
// }

model Quiz {
id Int @id @default(autoincrement())
title String
published Boolean @default(false)
questions String
}

model Question {
id Int @id @default(autoincrement())
content String
image_url String?
answers String
}

model Answer {
id Int @id @default(autoincrement())
content String
}

model Session {
id String @id
userId String
expiresAt DateTime
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
