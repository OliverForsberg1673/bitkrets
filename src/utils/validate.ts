import { blogPostFormSubmitType, blogTitleLength } from "../constants";
import type {
  BlogPostFormSubmitType,
  BlogPostFormData,
  CreateBlogPostFormData,
  EditBlogPostFormData,
  DeleteBlogPostFormData,
} from "../types/bitkrets";

export function validateBlogPostFormData(formData: BlogPostFormData) {
  const blogTitle = formData.blogTitle;
  const blogText = formData.blogText;
  if (typeof blogTitle === "string" || typeof blogText === "string") {
    if (blogTitle.length > 0 && blogText.length > 0) {
      return true;
    }
  }
  return false;
}

// validate email address structure
export function validateEmailAddressStructure(emailAddress: string) {
  const validEmailStructure =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return validEmailStructure.test(emailAddress);
}

// validate password strength
export function validatePasswordStrength(password: string) {
  const validPasswordStrength =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{16,}$/;
  return validPasswordStrength.test(password);
}

// validate blogId is ObjectId or numeric string
export function validateBlogIdIsNumber(blogId: string) {
  // Accept both ObjectId format and numeric strings for backward compatibility
  if (blogId.length === 24 && /^[0-9a-fA-F]{24}$/.test(blogId)) {
    return true; // Valid ObjectId
  }
  return Number.isInteger(Number(blogId)); // Valid numeric string
}

// validate blogId
export function validateBlogId(blogId: string) {
  return validateBlogIdIsNumber(blogId);
}

// validate that blog title is string
export function validateBlogTitleIsString(blogTitle: string) {
  return typeof blogTitle === "string";
}

// validate blogTitle min 15 max 50 characters
export function validateBlogTitleLength(blogTitle: string) {
  return (
    blogTitle.length > blogTitleLength.minLength &&
    blogTitle.length < blogTitleLength.maxLength
  );
}

// run all blog title validations
export function validateBlogTitle(blogTitle: string) {
  return (
    validateBlogTitleIsString(blogTitle) && validateBlogTitleLength(blogTitle)
  );
}

// validate blog text is string
export function validateBlogTextIsString(blogText: string) {
  return typeof blogText === "string";
}

// validate blog text <= 1000 characters
export function validateBlogTextLength(blogText: string) {
  return blogText.length > 0 && blogText.length <= 1000;
}

// run all blog text validations
export function validateBlogText(blogText: string) {
  return validateBlogTextIsString(blogText) && validateBlogTextLength(blogText);
}

// validate form data submit type with provided submit type
export function validateSubmitType(
  submitType: BlogPostFormSubmitType,
  expected: BlogPostFormSubmitType
) {
  return submitType === expected;
}

// validateCreateBlogPostFormData
export function validateCreateBlogPostFormData(
  createBlogPostFormData: CreateBlogPostFormData
) {
  // validate blog title
  const validBlogTitle = validateBlogTitle(createBlogPostFormData.blogTitle);
  // validate blog text
  const validBlogText = validateBlogText(createBlogPostFormData.blogText);
  // validate submit type
  const validSubmitType = validateSubmitType(
    createBlogPostFormData.submitType,
    // we choose what type to validate with
    blogPostFormSubmitType.create
  );

  return validBlogTitle && validBlogText && validSubmitType;
}

// validateEditBlogPostFormData
export function validateEditBlogPostFormData(
  editBlogPostFormData: EditBlogPostFormData
) {
  // validate blog id
  const validBlogId = validateBlogId(editBlogPostFormData.blogId);
  // validate blog title
  const validBlogTitle = validateBlogTitle(editBlogPostFormData.blogTitle);
  // validate blog text
  const validBlogText = validateBlogText(editBlogPostFormData.blogText);
  // validate submit type
  const validSubmitType = validateSubmitType(
    editBlogPostFormData.submitType,
    // we choose what type to validate with
    blogPostFormSubmitType.edit
  );

  return validBlogId && validBlogTitle && validBlogText && validSubmitType;
}

// validateDeleteBlogPostFormData
export function validateDeleteBlogPostFormData(
  deleteBlogPostFormData: DeleteBlogPostFormData
) {
  // validate blogId
  const validBlogId = validateBlogId(deleteBlogPostFormData.blogId);
  // validate submit type
  const validSubmitType = validateSubmitType(
    deleteBlogPostFormData.submitType,
    blogPostFormSubmitType.delete
  );

  return validBlogId && validSubmitType;
}
