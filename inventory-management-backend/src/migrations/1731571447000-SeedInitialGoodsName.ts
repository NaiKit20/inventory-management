import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedInitialGoodsName1731571447000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert initial goods data
    await queryRunner.query(`
      INSERT INTO "GOODS_NAME" ("Goods_id", "Goods_name", "cost_unit") VALUES
        ('G001', 'Laptop', 25000.00),
        ('G002', 'Mouse', 500.00),
        ('G003', 'Keyboard', 1200.00),
        ('G004', 'Monitor', 8000.00),
        ('G005', 'USB Cable', 150.00),
        ('G006', 'Headphones', 2500.00),
        ('G007', 'Webcam', 3500.00),
        ('G008', 'Microphone', 4000.00),
        ('G009', 'Desk Chair', 6500.00),
        ('G010', 'Standing Desk', 15000.00)
      ON CONFLICT ("Goods_id") DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the seeded data
    await queryRunner.query(`
      DELETE FROM "GOODS_NAME" 
      WHERE "Goods_id" IN ('G001', 'G002', 'G003', 'G004', 'G005', 'G006', 'G007', 'G008', 'G009', 'G010');
    `);
  }
}
