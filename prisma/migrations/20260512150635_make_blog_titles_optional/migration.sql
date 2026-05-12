-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BlogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "coverImage" TEXT,
    "category" TEXT,
    "titleEn" TEXT NOT NULL,
    "titleZh" TEXT,
    "titleEs" TEXT,
    "titleFr" TEXT,
    "titleAr" TEXT,
    "titleRu" TEXT,
    "excerptEn" TEXT,
    "excerptZh" TEXT,
    "excerptEs" TEXT,
    "excerptFr" TEXT,
    "excerptAr" TEXT,
    "excerptRu" TEXT,
    "contentEn" TEXT,
    "contentZh" TEXT,
    "contentEs" TEXT,
    "contentFr" TEXT,
    "contentAr" TEXT,
    "contentRu" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_BlogPost" ("category", "contentAr", "contentEn", "contentEs", "contentFr", "contentRu", "contentZh", "coverImage", "createdAt", "excerptAr", "excerptEn", "excerptEs", "excerptFr", "excerptRu", "excerptZh", "id", "isPublished", "publishedAt", "slug", "titleAr", "titleEn", "titleEs", "titleFr", "titleRu", "titleZh", "updatedAt") SELECT "category", "contentAr", "contentEn", "contentEs", "contentFr", "contentRu", "contentZh", "coverImage", "createdAt", "excerptAr", "excerptEn", "excerptEs", "excerptFr", "excerptRu", "excerptZh", "id", "isPublished", "publishedAt", "slug", "titleAr", "titleEn", "titleEs", "titleFr", "titleRu", "titleZh", "updatedAt" FROM "BlogPost";
DROP TABLE "BlogPost";
ALTER TABLE "new_BlogPost" RENAME TO "BlogPost";
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
CREATE INDEX "BlogPost_slug_idx" ON "BlogPost"("slug");
CREATE INDEX "BlogPost_isPublished_publishedAt_idx" ON "BlogPost"("isPublished", "publishedAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
