export const blogPostFormSubmitType = {
  create: "create",
  edit: "edit",
  delete: "delete",
} as const;

export const blogTitleLength = {
  minLength: 15,
  maxLength: 50,
};
