import { DataSource } from "typeorm";
import { join } from "path";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER || "inventory_management_root",
  password: process.env.DB_PASSWORD || "inventory_management_password",
  database: process.env.DB_NAME || "inventory_management_db",
  entities: [join(__dirname, "**", "*.entity{.ts,.js}")],
  migrations: [join(__dirname, "migrations", "*{.ts,.js}")],
  synchronize: false, // Disable for migrations
  logging: false,
});
