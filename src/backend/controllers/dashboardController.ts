import type { Request, Response } from "express";
import { DatabaseConnection } from "../db";
import type { BlogPostFormData } from "../../types/bitkrets";
import { blogPostFormSubmitType } from "../../constants";
import {
  createBlogPostService,
  editBlogPostService,
  deleteBlogPostService,
} from "../services/dashboardService";

export async function getBlogPost(req: Request, res: Response) {
  try {
    const blogId = req.params.id;
    const result = await DatabaseConnection.posts.findById(blogId);
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(404).send("Blog post not found");
  }
}

export async function getBlogPosts(_req: Request, res: Response) {
  try {
    const blogPosts = await DatabaseConnection.posts.find({}).exec();
    if (blogPosts && blogPosts.length > 0) {
      return res.status(200).send(blogPosts);
    } else {
      return res.status(204).send("There is not any blog posts to load");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error retrieving blog posts");
  }
}

export async function dashboard(req: Request, res: Response) {
  const formData: BlogPostFormData = req.body;

  if (formData.submitType === blogPostFormSubmitType.create) {
    try {
      await createBlogPostService(formData);
      console.log(`Created blogPost`);
      return res.send("created blog post");
    } catch (error) {
      console.log(error);
      return res.status(400).send("Failed to create blog post");
    }
  } else if (formData.submitType === blogPostFormSubmitType.edit) {
    try {
      await editBlogPostService(formData);
      console.log(`Updated blogPost: ${formData.blogId}`);
      return res.send("updated to db");
    } catch (error) {
      console.log(error);
      return res.status(400).send("Failed to edit post");
    }
  } else if (formData.submitType === blogPostFormSubmitType.delete) {
    try {
      await deleteBlogPostService(formData);
      res.status(200).send("deleted blog post");
    } catch (error) {
      console.log(error);
      return res.status(400).send("failed to delete blog post");
    }
  } else {
    return res.status(400).send("Invalid submit type");
  }
}
