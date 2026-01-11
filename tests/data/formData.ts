import { blogPostFormSubmitType } from "../../src/constants";
import type {
  CreateBlogPostFormData,
  DeleteBlogPostFormData,
  EditBlogPostFormData,
} from "../../src/types/bitkrets";

// TDD: Test data for validation - designed to test edge cases and validation logic
export const invalidCreateBlogPostFormData: CreateBlogPostFormData[] = [
  {
    blogTitle: "This is a valid blog title",
    blogText: "", // Empty text should fail validation
    submitType: blogPostFormSubmitType.create,
  },
  {
    blogTitle: "", // Empty title should fail validation
    blogText: "This is valid blog text",
    submitType: blogPostFormSubmitType.create,
  },
  {
    blogTitle: "This is valid blog title",
    blogText: "This is valid blog text",
    submitType: "" as any, // Invalid submit type should fail
  },
];
export const validCreateBlogPostFormData: CreateBlogPostFormData = {
  blogTitle: "This is a valid blog title for testing",
  blogText: "Valid blog text",
  submitType: blogPostFormSubmitType.create,
};

export const invalidEditBlogPostFormData: EditBlogPostFormData[] = [
  {
    blogId: "asd",
    blogTitle: "This is a valid blog title",
    blogText: "Valid blog text",
    submitType: blogPostFormSubmitType.edit,
  },
  {
    blogId: "123",
    blogTitle: "",
    blogText: "This is valid blog text",
    submitType: blogPostFormSubmitType.edit,
  },
  {
    blogId: "123",
    blogTitle: "Valid blog title",
    blogText: "",
    submitType: blogPostFormSubmitType.edit,
  },
  {
    blogId: "123",
    blogTitle: "This is valid blog title",
    blogText: "This is valid blog text",
    submitType: "" as any,
  },
];
export const validEditBlogPostFormData: EditBlogPostFormData = {
  blogId: "123",
  blogTitle: "This is a valid blog title for testing",
  blogText: "Valid blog text",
  submitType: blogPostFormSubmitType.edit,
};

export const invalidDeleteBlogPostFormData: DeleteBlogPostFormData = {
  blogId: "asd",
  submitType: blogPostFormSubmitType.delete,
};
export const validDeleteBlogPostFormData: DeleteBlogPostFormData = {
  blogId: "123",
  submitType: blogPostFormSubmitType.delete,
};
