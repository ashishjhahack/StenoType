import { config } from "dotenv";
import pg from "pg";

config({ path: ".env.local" });

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

try {
  await client.connect();

  const result = await client.query(
    "SELECT current_database(), current_user"
  );

  console.log("✅ Database connection successful");
  console.log("Database:", result.rows[0].current_database);
  console.log("User:", result.rows[0].current_user);
} catch (error) {
  console.error("❌ Database connection failed");
  console.error(error.message);
} finally {
  await client.end().catch(() => {});
}