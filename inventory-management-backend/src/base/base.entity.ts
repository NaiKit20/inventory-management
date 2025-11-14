import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export class BaseEntity {
  @CreateDateColumn({ name: "created_at", nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date;
}
