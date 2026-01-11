// https://typegoose.github.io/mongodb-memory-server/docs/guides/quick-start-guide
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { blogTitleLength } from "../constants";

export const blogPostSchema = new Schema({
  blogTitle: {
    type: String,
    required: true,
    min: blogTitleLength.minLength,
    max: blogTitleLength.maxLength,
  },
  blogText: { type: String, required: true },
});

export type BlogPostType = InferSchemaType<typeof blogPostSchema>;

export class DatabaseConnection {
  static testing: boolean;
  static connectionString: string;
  static memoryServer: MongoMemoryServer;
  static connection: mongoose.Connection;
  static posts: mongoose.Model<BlogPostType>;

  static async connect(testing: boolean, connectionString?: string) {
    this.testing = testing;
    console.log(`Connecting to ${testing ? "test" : "prod"} db...`);

    if (testing) {
      const memoryServer = await MongoMemoryServer.create({
        instance: {
          dbName: "bitkrets",
        },
      });
      this.memoryServer = memoryServer;
      this.connectionString = memoryServer.getUri();
    } else if (connectionString) {
      this.connectionString = connectionString;
    } else {
      // Default connection for development
      this.connectionString =
        process.env.MONGODB_URI || "mongodb://localhost:27017/bitkrets";
    }

    this.connection = await mongoose
      .createConnection(this.connectionString)
      .asPromise();

    this.posts = this.connection.model("Posts", blogPostSchema);

    console.log(`Connected to ${testing ? "test" : "prod"} db!`);
  }

  static async close() {
    console.log("Closing database connection...");
    if (this.testing) {
      await this.memoryServer.stop();
    }
    await this.connection.close();
    console.log(`Closed ${this.testing ? "test" : "prod"} db!`);
  }
}
