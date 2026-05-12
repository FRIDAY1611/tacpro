-- AlterTable
ALTER TABLE "Category" ADD COLUMN "descriptionAr" TEXT;
ALTER TABLE "Category" ADD COLUMN "descriptionEs" TEXT;
ALTER TABLE "Category" ADD COLUMN "descriptionFr" TEXT;
ALTER TABLE "Category" ADD COLUMN "descriptionRu" TEXT;
ALTER TABLE "Category" ADD COLUMN "nameAr" TEXT;
ALTER TABLE "Category" ADD COLUMN "nameEs" TEXT;
ALTER TABLE "Category" ADD COLUMN "nameFr" TEXT;
ALTER TABLE "Category" ADD COLUMN "nameRu" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "descriptionAr" TEXT;
ALTER TABLE "Product" ADD COLUMN "descriptionEs" TEXT;
ALTER TABLE "Product" ADD COLUMN "descriptionFr" TEXT;
ALTER TABLE "Product" ADD COLUMN "descriptionRu" TEXT;
ALTER TABLE "Product" ADD COLUMN "metaDescAr" TEXT;
ALTER TABLE "Product" ADD COLUMN "metaDescEs" TEXT;
ALTER TABLE "Product" ADD COLUMN "metaDescFr" TEXT;
ALTER TABLE "Product" ADD COLUMN "metaDescRu" TEXT;
ALTER TABLE "Product" ADD COLUMN "metaTitleAr" TEXT;
ALTER TABLE "Product" ADD COLUMN "metaTitleEs" TEXT;
ALTER TABLE "Product" ADD COLUMN "metaTitleFr" TEXT;
ALTER TABLE "Product" ADD COLUMN "metaTitleRu" TEXT;
ALTER TABLE "Product" ADD COLUMN "nameAr" TEXT;
ALTER TABLE "Product" ADD COLUMN "nameEs" TEXT;
ALTER TABLE "Product" ADD COLUMN "nameFr" TEXT;
ALTER TABLE "Product" ADD COLUMN "nameRu" TEXT;
ALTER TABLE "Product" ADD COLUMN "shortDescAr" TEXT;
ALTER TABLE "Product" ADD COLUMN "shortDescEs" TEXT;
ALTER TABLE "Product" ADD COLUMN "shortDescFr" TEXT;
ALTER TABLE "Product" ADD COLUMN "shortDescRu" TEXT;

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "coverImage" TEXT,
    "category" TEXT,
    "titleEn" TEXT NOT NULL,
    "titleZh" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- CreateIndex
CREATE INDEX "BlogPost_slug_idx" ON "BlogPost"("slug");

-- CreateIndex
CREATE INDEX "BlogPost_isPublished_publishedAt_idx" ON "BlogPost"("isPublished", "publishedAt");
