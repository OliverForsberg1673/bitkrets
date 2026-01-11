import type { BlogPost, BlogPostFormData } from "../../types/bitkrets";
import { blogPostFormSubmitType } from "../../constants";

// Frontend utility functions for blog post operations
// Note: These are not TDD'd as per user request

export async function createBlogPostForm(
  formData: BlogPostFormData
): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:3000/dashboard", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return response.ok;
  } catch (error) {
    console.error("Error creating blog post:", error);
    return false;
  }
}

export async function editBlogPostForm(
  formData: BlogPostFormData
): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:3000/dashboard", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return response.ok;
  } catch (error) {
    console.error("Error editing blog post:", error);
    return false;
  }
}

export async function deleteBlogPostForm(postId: string): Promise<boolean> {
  try {
    const formData: BlogPostFormData = {
      blogId: postId,
      blogTitle: "delete",
      blogText: "delete",
      submitType: blogPostFormSubmitType.delete,
    };

    const response = await fetch("http://localhost:3000/dashboard", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return false;
  }
}

export async function createBlogPostList(): Promise<BlogPost[]> {
  try {
    const response = await fetch("http://localhost:3000/posts");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blogPosts: BlogPost[] = await response.json();
    return blogPosts || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export function renderBlogPostList(posts: BlogPost[]): string {
  return posts
    .map(
      (post) =>
        `
        <div class="post" style="border:1px dotted; padding: 1em; margin: 0.5em 0;">
          <h5 data-title="${post._id}">${post.blogTitle}</h5>
          <p data-text="${post._id}">${post.blogText}</p>
          <button data-edit="${post._id}" class="edit-btn">Edit</button>
          <button data-delete="${post._id}" class="delete-btn">Delete</button>
        </div>
      `
    )
    .join("");
}

export function setupEditHandlers(
  _blogForm: HTMLFormElement,
  blogId: HTMLInputElement,
  blogTitle: HTMLInputElement,
  blogText: HTMLInputElement,
  submitBtn: HTMLButtonElement
) {
  const editBtnList = document.querySelectorAll(
    "[data-edit]"
  ) as NodeListOf<HTMLButtonElement>;

  editBtnList.forEach((editBtn) => {
    editBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const postId = editBtn.dataset["edit"];

      if (postId) {
        const titleElement = document.querySelector(`[data-title="${postId}"]`);
        const textElement = document.querySelector(`[data-text="${postId}"]`);

        blogTitle.value = titleElement?.innerHTML || "Could not load the post";
        blogText.value = textElement?.innerHTML || "Could not load the post";
        blogId.value = postId;
        submitBtn.setAttribute("data-submit-type", "edit");
        submitBtn.innerText = "Save Post";
      }
    });
  });
}

export function setupDeleteHandlers() {
  const deleteBtnList = document.querySelectorAll(
    "[data-delete]"
  ) as NodeListOf<HTMLButtonElement>;

  deleteBtnList.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const postId = deleteBtn.dataset["delete"];

      if (postId && confirm("Are you sure you want to delete this post?")) {
        const success = await deleteBlogPostForm(postId);
        if (success) {
          window.location.reload();
        } else {
          alert("Failed to delete post. Please try again.");
        }
      }
    });
  });
}

export function resetForm(
  blogTitle: HTMLInputElement,
  blogText: HTMLInputElement,
  blogId: HTMLInputElement,
  submitBtn: HTMLButtonElement
) {
  blogTitle.value = "";
  blogText.value = "";
  blogId.value = "";
  submitBtn.setAttribute("data-submit-type", "create");
  submitBtn.innerText = "Create Post";
}
