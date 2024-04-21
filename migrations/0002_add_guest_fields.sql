-- RedefineTables
CREATE TABLE "new_Guest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "attend" BOOLEAN NOT NULL,
    "plusOne" BOOLEAN NOT NULL DEFAULT false,
    "plusOneName" TEXT,
    "plusOneLastName" TEXT,
    "kids" INTEGER NOT NULL DEFAULT 0,
    "comments" TEXT,
    "tableAssignment" TEXT,
    "address" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Guest" ("attend", "createdAt", "email", "id", "lastName", "name", "phone") SELECT "attend", "createdAt", "email", "id", "lastName", "name", "phone" FROM "Guest";
DROP TABLE "Guest";
ALTER TABLE "new_Guest" RENAME TO "Guest";
CREATE UNIQUE INDEX "Guest_id_key" ON "Guest"("id");