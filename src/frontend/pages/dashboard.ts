import { blogPostFormSubmitType } from "../../constants";
import type { BlogPost, BlogPostFormData } from "../../types/bitkrets";
import {
  createBlogPostForm,
  editBlogPostForm,
  createBlogPostList,
  renderBlogPostList,
  setupEditHandlers,
  setupDeleteHandlers,
  resetForm,
} from "../utils/blogPostFunctions";

function html() {
  return `
        <div id="blog-page">
            <h1>Dashboard</h1>
            <div id="blog-posts" style="display:flex;flex-direction:column;gap:1em">
                Loading blog posts...
            </div>
            <h3>Write new blog post:</h3>
            <form method="post" id="blog-form" style="display:flex;flex-direction:column;gap:1em;max-width:400px;">
                <input type="text" id="blog-id" value="" hidden>
                <label for="blog-title">Blog Title</label>
                <input type="text" name="blog-title" id="blog-title">
                <label for="blog-text">Blog Text</label>
                <textarea name="blog-text" id="blog-text" rows="4" cols="12"></textarea>
                <button type="submit" id="submit-button" data-submit-type="create">Create Post</button>
            </form>
        </div>
    `;
}

async function logic() {
  // Load and display blog posts using utility functions
  const blogPosts = await createBlogPostList();
  const blogPostsDiv = document.getElementById("blog-posts");

  if (blogPostsDiv) {
    if (blogPosts.length > 0) {
      blogPostsDiv.innerHTML = renderBlogPostList(blogPosts);
    } else {
      blogPostsDiv.innerHTML =
        "<p>No blog posts found. Create your first post!</p>";
    }
  }

  // Get form elements
  const blogForm = document.getElementById("blog-form") as HTMLFormElement;
  const blogId = document.getElementById("blog-id") as HTMLInputElement;
  const blogTitle = document.getElementById("blog-title") as HTMLInputElement;
  const blogText = document.getElementById("blog-text") as HTMLInputElement;
  const submitBtn = document.getElementById(
    "submit-button"
  ) as HTMLButtonElement;

  if (!blogForm || !blogId || !blogTitle || !blogText || !submitBtn) {
    console.error("Could not find required form elements");
    return;
  }

  // Setup event handlers using utility functions
  setupEditHandlers(blogForm, blogId, blogTitle, blogText, submitBtn);
  setupDeleteHandlers();

  // Handle form submission
  blogForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitType = submitBtn.getAttribute("data-submit-type");

    if (!submitType || !blogTitle.value.trim() || !blogText.value.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const formData: BlogPostFormData = {
      blogId: blogId.value,
      blogTitle: blogTitle.value.trim(),
      blogText: blogText.value.trim(),
      submitType: submitType as any,
    };

    let success = false;

    try {
      if (submitType === blogPostFormSubmitType.create) {
        success = await createBlogPostForm(formData);
      } else if (submitType === blogPostFormSubmitType.edit) {
        success = await editBlogPostForm(formData);
      }

      if (success) {
        resetForm(blogTitle, blogText, blogId, submitBtn);
        window.location.reload(); // Refresh to show updated posts
      } else {
        alert(`Failed to ${submitType} post. Please try again.`);
      }
    } catch (error) {
      console.error(`Error ${submitType}ing post:`, error);
      alert(`Failed to ${submitType} post. Please try again.`);
    }
  });
}

export function DashboardPage() {
  return {
    html: html,
    logic: logic,
  };
}
