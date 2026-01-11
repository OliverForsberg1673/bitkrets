import { describe, expect, it } from "vitest";
import {
  createBlogPostService,
  deleteBlogPostService,
  editBlogPostService,
} from "../../../src/backend/services/dashboardService";
import {
  invalidCreateBlogPostFormData,
  invalidDeleteBlogPostFormData,
  invalidEditBlogPostFormData,
  validCreateBlogPostFormData,
} from "../../data/formData";

// TDD: Test service layer with database integration
// Tests should fail first (Red), then we implement to make them pass (Green)

describe("test create blog post service", () => {
  it("should throw error on invalid data", async () => {
    // TDD: Test that validation works - should reject invalid data
    await expect(
      createBlogPostService(invalidCreateBlogPostFormData[0])
    ).rejects.toThrowError();
  });
  it("should return valid result on valid data", async () => {
    // TDD: Test that service works with valid data
    const result = await createBlogPostService(validCreateBlogPostFormData);
    expect(result.insertedId).toBeDefined();
  });
});

describe("test edit blog post service", () => {
  it("should throw error on invalid data", async () => {
    await expect(
      editBlogPostService(invalidEditBlogPostFormData[0])
    ).rejects.toThrowError();
  });
  it("should return true on successful edit", async () => {
    // first create a post to edit
    const post = await createBlogPostService(validCreateBlogPostFormData);
    const formData = {
      blogId: post.insertedId.toString(),
      blogTitle: "This is a valid blog title for edit test",
      blogText: "Updated valid text",
      submitType: "edit" as const,
    };
    expect(await editBlogPostService(formData)).toBe(true);
  });
});

describe("test delete blog post service", () => {
  it("should throw error on invalid form data", async () => {
    await expect(
      deleteBlogPostService(invalidDeleteBlogPostFormData)
    ).rejects.toThrowError();
  });
  it("should return true on successful deletion", async () => {
    // first create a post to delete
    const post = await createBlogPostService(validCreateBlogPostFormData);
    const formData = {
      blogId: post.insertedId.toString(),
      submitType: "delete" as const,
    };
    expect(await deleteBlogPostService(formData)).toBe(true);
  });
});
