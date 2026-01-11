import { afterAll, beforeAll } from "vitest";
import { DatabaseConnection } from "../src/backend/db";

beforeAll(async () => {
  try {
    await DatabaseConnection.connect(true);
  } catch (error) {
    console.log("Failed to connect to test database: ", error);
  }
});

afterAll(async () => {
  try {
    await DatabaseConnection.close();
  } catch (error) {
    console.log("Failed to close test database connection: ", error);
  }
});
