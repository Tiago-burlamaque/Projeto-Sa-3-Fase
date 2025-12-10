/*
  Warnings:

  - You are about to alter the column `custo_total` on the `movimentacao` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "public"."movimentacao" ALTER COLUMN "custo_total" SET DATA TYPE INTEGER;
