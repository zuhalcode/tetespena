/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `articles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "articles_title_key" ON "articles"("title");
