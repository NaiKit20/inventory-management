import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitGoodsName1763121594000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "GOODS_NAME" ("Goods_id", "Goods_name", "cost_unit") VALUES
      ('G000000001', 'สินค้า A', 50.5),
      ('G000000002', 'สินค้า B', 100.75),
      ('G000000003', 'สินค้า C', 1000.0);`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM "GOODS_NAME" WHERE "Goods_id" IN ('G000000001','G000000002','G000000003');`
        );
    }
}
