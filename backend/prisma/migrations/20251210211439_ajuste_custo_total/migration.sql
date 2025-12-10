/*
  Warnings:

  - Changed the type of `custo_total` on the `movimentacao` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."movimentacao" DROP COLUMN "custo_total",
ADD COLUMN     "custo_total" DOUBLE PRECISION NOT NULL;
