import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitCusName1763121595000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "CUS_NAME" ("Cus_id", "Cus_name") VALUES
            ('C0001', 'ลูกค้า 1'),
            ('C0002', 'ลูกค้า 2'),
            ('C0003', 'ลูกค้า 3');`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM "CUS_NAME" WHERE "Cus_id" IN ('C0001','C0002','C0003');`
        );
    }
}
