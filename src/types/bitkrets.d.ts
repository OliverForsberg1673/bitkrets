import { blogPostFormSubmitType } from "../constants";
import type { Schema, InferSchemaType } from "mongoose";

export type BlogPostFormSubmitType =
  (typeof blogPostFormSubmitType)[keyof typeof blogPostFormSubmitType];

export type CreateBlogPostFormData = {
  blogTitle: string;
  blogText: string;
  submitType: blogPostFormSubmitType.create;
};

export type EditBlogPostFormData = {
  blogId: string;
  blogTitle: string;
  blogText: string;
  submitType: blogPostFormSubmitType.edit;
};

export type DeleteBlogPostFormData = {
  blogId: string;
  submitType: blogPostFormSubmitType.delete;
};

export type BlogPostFormData = {
  blogId: string;
  blogTitle: string;
  blogText: string;
  submitType:
    | blogPostFormSubmitType.create
    | blogPostFormSubmitType.edit
    | blogPostFormSubmitType.delete;
};

export type UserFormData = {
  email: string;
  password: string;
};

export interface BlogPost {
  // https://www.mongodb.com/docs/drivers/node/current/typescript/#working-with-the-_id-field
  _id?: mongoDB.ObjectId;
  blogTitle: string;
  blogText: string;
}

export interface User {
  // https://www.mongodb.com/docs/drivers/node/current/typescript/#working-with-the-_id-field
  _id?: mongoDB.ObjectId;
  email: string;
  password: string;
  salt: string; // stores the salt used to hash the password
}
