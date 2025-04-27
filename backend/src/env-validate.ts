import { z } from 'zod';
import { config } from 'dotenv';

config();

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "Database URL is required"),
  PRISMA_CLIENT_OUTPUT_DIR: z.string().min(1, "Output dir of prisma client is required"),
  API_PORT: z.string().optional().default("3000"),

});

function validateEnv() {
  try {
    envSchema.parse(process.env);
    console.log("Environment variables are valid");
  } catch (error) {
    console.error("Error: Invalid environment variables:", error.errors);
    process.exit(1);
  }
}

export default validateEnv;