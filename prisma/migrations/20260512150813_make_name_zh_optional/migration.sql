-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "sku" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "nameEn" TEXT NOT NULL,
    "nameZh" TEXT,
    "nameEs" TEXT,
    "nameFr" TEXT,
    "nameAr" TEXT,
    "nameRu" TEXT,
    "descriptionEn" TEXT,
    "descriptionZh" TEXT,
    "descriptionEs" TEXT,
    "descriptionFr" TEXT,
    "descriptionAr" TEXT,
    "descriptionRu" TEXT,
    "shortDescEn" TEXT,
    "shortDescZh" TEXT,
    "shortDescEs" TEXT,
    "shortDescFr" TEXT,
    "shortDescAr" TEXT,
    "shortDescRu" TEXT,
    "specifications" TEXT,
    "mainImage" TEXT,
    "images" TEXT,
    "isCustomizable" BOOLEAN NOT NULL DEFAULT true,
    "moq" INTEGER,
    "drawing" TEXT,
    "metaTitleEn" TEXT,
    "metaTitleZh" TEXT,
    "metaTitleEs" TEXT,
    "metaTitleFr" TEXT,
    "metaTitleAr" TEXT,
    "metaTitleRu" TEXT,
    "metaDescEn" TEXT,
    "metaDescZh" TEXT,
    "metaDescEs" TEXT,
    "metaDescFr" TEXT,
    "metaDescAr" TEXT,
    "metaDescRu" TEXT,
    "categoryId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("categoryId", "createdAt", "descriptionAr", "descriptionEn", "descriptionEs", "descriptionFr", "descriptionRu", "descriptionZh", "drawing", "id", "images", "isActive", "isCustomizable", "isFeatured", "mainImage", "metaDescAr", "metaDescEn", "metaDescEs", "metaDescFr", "metaDescRu", "metaDescZh", "metaTitleAr", "metaTitleEn", "metaTitleEs", "metaTitleFr", "metaTitleRu", "metaTitleZh", "moq", "nameAr", "nameEn", "nameEs", "nameFr", "nameRu", "nameZh", "shortDescAr", "shortDescEn", "shortDescEs", "shortDescFr", "shortDescRu", "shortDescZh", "sku", "slug", "sortOrder", "specifications", "updatedAt") SELECT "categoryId", "createdAt", "descriptionAr", "descriptionEn", "descriptionEs", "descriptionFr", "descriptionRu", "descriptionZh", "drawing", "id", "images", "isActive", "isCustomizable", "isFeatured", "mainImage", "metaDescAr", "metaDescEn", "metaDescEs", "metaDescFr", "metaDescRu", "metaDescZh", "metaTitleAr", "metaTitleEn", "metaTitleEs", "metaTitleFr", "metaTitleRu", "metaTitleZh", "moq", "nameAr", "nameEn", "nameEs", "nameFr", "nameRu", "nameZh", "shortDescAr", "shortDescEn", "shortDescEs", "shortDescFr", "shortDescRu", "shortDescZh", "sku", "slug", "sortOrder", "specifications", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
CREATE INDEX "Product_slug_idx" ON "Product"("slug");
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");
CREATE INDEX "Product_isActive_isFeatured_idx" ON "Product"("isActive", "isFeatured");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
