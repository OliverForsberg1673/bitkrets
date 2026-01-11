import type {
  CreateBlogPostFormData,
  DeleteBlogPostFormData,
  EditBlogPostFormData,
} from "../../types/bitkrets";
import {
  validateCreateBlogPostFormData,
  validateDeleteBlogPostFormData,
  validateEditBlogPostFormData,
} from "../../utils/validate";
import { DatabaseConnection } from "../db";

// TDD: Service layer implementation - validates data before database operations
// This follows the pattern: validate input -> perform operation -> return result

const FormError = new Error("Invalid form data");

export async function createBlogPost(
  createBlogPostFormData: CreateBlogPostFormData
) {
  return await DatabaseConnection.posts.create({
    blogTitle: createBlogPostFormData.blogTitle,
    blogText: createBlogPostFormData.blogText,
  });
}

// TDD: Service function that validates before creating
export async function createBlogPostService(formData: CreateBlogPostFormData) {
  // Validate form data first (TDD principle - fail fast on invalid input)
  if (!validateCreateBlogPostFormData(formData)) {
    throw FormError;
  }
  const result = await createBlogPost(formData);
  return { insertedId: result._id };
}

export async function editBlogPost(formData: EditBlogPostFormData) {
  const result = await DatabaseConnection.posts.updateOne(
    { _id: formData.blogId },
    {
      $set: {
        blogTitle: formData.blogTitle,
        blogText: formData.blogText,
      },
    }
  );
  return result.modifiedCount === 1;
}

export async function editBlogPostService(formData: EditBlogPostFormData) {
  if (!validateEditBlogPostFormData(formData)) {
    throw FormError;
  }
  return await editBlogPost(formData);
}

export async function deleteBlogPost(formData: DeleteBlogPostFormData) {
  const result = await DatabaseConnection.posts.deleteOne({
    _id: formData.blogId,
  });
  return result.deletedCount === 1;
}

export async function deleteBlogPostService(formData: DeleteBlogPostFormData) {
  if (!validateDeleteBlogPostFormData(formData)) {
    throw FormError;
  }
  return await deleteBlogPost(formData);
}
