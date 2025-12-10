-- DropForeignKey
ALTER TABLE "public"."movimentacao" DROP CONSTRAINT "movimentacao_inventario_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."movimentacao" DROP CONSTRAINT "movimentacao_usuario_id_fkey";

-- AlterTable
ALTER TABLE "public"."movimentacao" ALTER COLUMN "inventario_id" DROP NOT NULL,
ALTER COLUMN "usuario_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."movimentacao" ADD CONSTRAINT "movimentacao_inventario_id_fkey" FOREIGN KEY ("inventario_id") REFERENCES "public"."inventario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."movimentacao" ADD CONSTRAINT "movimentacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
