document.addEventListener("DOMContentLoaded", async () => {
  const auth = localStorage.getItem("auth");
  if (!auth) {
    window.location.href = "/views/login.html";
    return;
  }

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("auth");
    window.location.href = "/views/login.html";
  });

  let editingPostId = null;

  async function loadPosts() {
    try {
      const res = await fetch("https://blog-backend-e8yb.onrender.com/api/posts");
      if (res.ok) {
        const posts = await res.json();
        const container = document.getElementById("postsList");
        container.innerHTML = "";
        posts.forEach(post => {
          const div = document.createElement("div");
          div.style.borderBottom = "1px solid #ccc";
          div.style.padding = "8px 0";

          div.innerHTML = `
            <strong>${post.title}</strong> <em>(${post.category})</em>
            <button class="edit-btn" data-id="${post.id}" style="margin-left: 10px;">Edit</button>
            <button class="delete-btn" data-id="${post.id}" style="margin-left: 5px; color: red;">Delete</button>
          `;

          container.appendChild(div);
        });

        document.querySelectorAll(".edit-btn").forEach(btn => {
          btn.addEventListener("click", async () => {
            const id = btn.getAttribute("data-id");
            const post = posts.find(p => p.id == id);
            if (!post) {
              alert("Post not found.");
              return;
            }
            document.getElementById("postTitle").value = post.title;
            document.getElementById("postCategory").value = post.category;
            document.getElementById("postMarkdown").value = post.body; 
            editingPostId = id;
            document.querySelector("#postForm button[type=submit]").textContent = "Save";

            window.scrollTo({ top: 0, behavior: "smooth" });
          });
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
          btn.addEventListener("click", async () => {
            const id = btn.getAttribute("data-id");
            if (confirm("Do you really want to delete?")) {
              try {
                const res = await fetch(`https://blog-backend-e8yb.onrender.com/api/posts/${id}`, {
                  method: "DELETE",
                  headers: {
                    "Authorization": `Basic ${auth}`
                  }
                });
                if (res.ok) {
                  alert("Post deleted.");
                  await loadPosts();
                } else {
                  alert("Failed to delete post. Please try again.");
                }
              } catch (error) {
                console.error("Error:", error);
                alert("Error to delete post. See console for details.");
              }
            }
          });
        });
      }
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  }

  await loadPosts();

  document.getElementById("postForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("postTitle").value.trim();
    const category = document.getElementById("postCategory").value.trim();
    const markdown = document.getElementById("postMarkdown").value.trim();

    if (!title || !category || !markdown) {
      alert("title, Category and Text in MD are required.");
      return;
    }

    const body = marked.parse(markdown);

    try {
      let res;

      if (editingPostId) {
        res = await fetch(`https://blog-backend-e8yb.onrender.com/api/posts/${editingPostId}`, {
          method: "PUT",
          headers: {
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title, category, body }),
        });
      } else {
        res = await fetch("https://blog-backend-e8yb.onrender.com/api/posts", {
          method: "POST",
          headers: {
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title, category, body }),
        });
      }

      if (res.ok) {
        alert(editingPostId ? "Post edited successfully!" : "Post created successfully!");
        document.getElementById("postForm").reset();
        editingPostId = null;
        document.querySelector("#postForm button[type=submit]").textContent = "Create";
        await loadPosts();
      } else {
        alert("Failed saving post. Check the console for details.");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Error saving post. See console for details.");
    }
  });
});
