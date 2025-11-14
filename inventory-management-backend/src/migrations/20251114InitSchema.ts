import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1763121593000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const hasGoods = await queryRunner.hasTable('GOODS_NAME');
        if (!hasGoods) {
            await queryRunner.query(`
        CREATE TABLE "GOODS_NAME" (
          "Goods_id" varchar(10) PRIMARY KEY DEFAULT '',
          "Goods_name" varchar(30) NOT NULL DEFAULT '',
          "cost_unit" numeric(8,2) NOT NULL DEFAULT 0
        )
      `);
        }

        const hasCus = await queryRunner.hasTable('CUS_NAME');
        if (!hasCus) {
            await queryRunner.query(`
        CREATE TABLE "CUS_NAME" (
          "Cus_id" varchar(5) PRIMARY KEY DEFAULT '',
          "Cus_name" varchar(30) NOT NULL DEFAULT ''
        )
      `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const hasCus = await queryRunner.hasTable('CUS_NAME');
        if (hasCus) {
            await queryRunner.query(`DROP TABLE "CUS_NAME"`);
        }

        const hasGoods = await queryRunner.hasTable('GOODS_NAME');
        if (hasGoods) {
            await queryRunner.query(`DROP TABLE "GOODS_NAME"`);
        }
    }
}
