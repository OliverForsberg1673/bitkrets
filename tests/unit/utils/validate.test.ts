import { test, expect } from "vitest";
import {
  validateBlogIdIsNumber,
  validateBlogPostFormData,
  validateBlogTitleLength,
  validateCreateBlogPostFormData,
  validateDeleteBlogPostFormData,
  validateEditBlogPostFormData,
  validateEmailAddressStructure,
  validatePasswordStrength,
} from "../../../src/utils/validate";
import { blogTitleLength } from "../../../src/constants";
import {
  invalidCreateBlogPostFormData,
  invalidDeleteBlogPostFormData,
  invalidEditBlogPostFormData,
  validCreateBlogPostFormData,
  validDeleteBlogPostFormData,
  validEditBlogPostFormData,
} from "../../data/formData";

test("test validate formData is string", () => {
  expect(
    validateBlogPostFormData({
      blogId: "fakeID",
      blogTitle: "asd",
      blogText: "asd",
      submitType: "create",
    })
  ).toBe(true);
});

// TDD: Write tests first to describe functionality
// "I want a function that validates email address structures"
// Then implement the function to make tests pass
test("test returns valid email address", () => {
  const invalidEmailAddressStructure = "asd@asd";
  const validEmailAddressStructure = "asd@asd.se";
  expect(
    // TDD: Test invalid email first
    validateEmailAddressStructure(invalidEmailAddressStructure)
  ).toBe(false);
  expect(
    // TDD: Then test valid email
    validateEmailAddressStructure(validEmailAddressStructure)
  ).toBe(true);
});

test("test valid password strength", () => {
  // invalid password strengths
  const shortPassword = "not-16-chars";
  const notAnyLower = "ONLY-UPPER-CASE1";
  const notAnyNumber = "NOT-aNY-NUMBER!";
  const notAnySpecialCharacters = "notAnySpecialCharacters1";
  expect(validatePasswordStrength(shortPassword)).toBe(false);
  expect(validatePasswordStrength(notAnyLower)).toBe(false);
  expect(validatePasswordStrength(notAnyNumber)).toBe(false);
  expect(validatePasswordStrength(notAnySpecialCharacters)).toBe(false);

  // valid password strength
  const correctPasswordStrength = "This-is-a-valid-password-1;";
  expect(validatePasswordStrength(correctPasswordStrength)).toBe(true);
});

test("test valid blogId value", () => {
  // invalid blogId (!number)
  const invalidBlogId = "asd";
  expect(validateBlogIdIsNumber(invalidBlogId)).toBe(false);

  // valid blogId (number)
  const validBlogId = "123";
  expect(validateBlogIdIsNumber(validBlogId)).toBe(true);
});

function generateRandomBlogTitle(blogTitleLength: number) {
  const characters = "ASDAFAASDdSGSAGAgsagsagSGAGagaGGAgaa";
  let randomBlogTitle = "";
  for (let i = 0; i <= blogTitleLength; i++) {
    randomBlogTitle += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomBlogTitle;
}

test("test validateBlogTitle", () => {
  // too short blog title
  expect(
    validateBlogTitleLength(
      generateRandomBlogTitle(blogTitleLength.minLength - 1)
    )
  ).toBe(false);
  // too long blog title
  expect(
    validateBlogTitleLength(
      generateRandomBlogTitle(blogTitleLength.maxLength + 1)
    )
  ).toBe(false);
});

// TDD: Test form validation with comprehensive test data
test("test validateCreateBlogPostFormData", () => {
  // Test all invalid scenarios first
  invalidCreateBlogPostFormData.map((formData) => {
    expect(validateCreateBlogPostFormData(formData)).toBe(false);
  });
  // Then test valid scenario
  expect(validateCreateBlogPostFormData(validCreateBlogPostFormData)).toBe(
    true
  );
});

test("test validateEditBlogPostFormData", () => {
  invalidEditBlogPostFormData.map((formData) => {
    expect(validateEditBlogPostFormData(formData)).toBe(false);
  });
  expect(validateEditBlogPostFormData(validEditBlogPostFormData)).toBe(true);
});

test("test validateDeleteBlogPostFormData", () => {
  expect(validateDeleteBlogPostFormData(invalidDeleteBlogPostFormData)).toBe(
    false
  );
  expect(validateDeleteBlogPostFormData(validDeleteBlogPostFormData)).toBe(
    true
  );
});
