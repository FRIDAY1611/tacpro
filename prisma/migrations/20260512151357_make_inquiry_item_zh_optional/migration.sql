-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InquiryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inquiryId" TEXT NOT NULL,
    "productId" TEXT,
    "quantity" INTEGER,
    "unit" TEXT,
    "requirements" TEXT,
    "productNameEn" TEXT NOT NULL,
    "productNameZh" TEXT,
    "productSku" TEXT,
    CONSTRAINT "InquiryItem_inquiryId_fkey" FOREIGN KEY ("inquiryId") REFERENCES "Inquiry" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "InquiryItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_InquiryItem" ("id", "inquiryId", "productId", "productNameEn", "productNameZh", "productSku", "quantity", "requirements", "unit") SELECT "id", "inquiryId", "productId", "productNameEn", "productNameZh", "productSku", "quantity", "requirements", "unit" FROM "InquiryItem";
DROP TABLE "InquiryItem";
ALTER TABLE "new_InquiryItem" RENAME TO "InquiryItem";
CREATE INDEX "InquiryItem_inquiryId_idx" ON "InquiryItem"("inquiryId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
