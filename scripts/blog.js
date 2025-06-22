let currentPage = 0;
const pageSize = 10;

function loadPosts(page = 0) {
  showApiNotice();
  fetch(`https://blog-backend-e8yb.onrender.com/api/posts/page?page=${page}&size=${pageSize}`)
    .then(res => res.json())
    .then(data => {
      hideApiNotice();
      const posts = data.content;
      const totalPages = data.totalPages;

      const container = document.getElementById("posts");
      container.innerHTML = "";
      posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.className = "post-card";
        const firstImageMatch = post.body.match(/<img[^>]+src="([^">]+)"/);
        const firstImage = firstImageMatch ? firstImageMatch[1] : '';

        postDiv.innerHTML = `
          ${firstImage ? `<img src="${firstImage}" class="post-image" alt="Thumbnail">` : ""}
          <h3>${post.title}</h3>
          <p class="meta">${new Date(post.createdAt).toLocaleDateString()} | ${post.category}</p>
          <div class="post-snippet">${post.body.replace(/<[^>]*>?/gm, '').substring(0, 120)}...</div>
          <button class="read-more-button" onclick="location.href='/views/post.html?title=${encodeURIComponent(post.title)}'">Read Now</button>
        `;
        container.appendChild(postDiv);
      });

      createPagination(page, totalPages);
    })
    .catch(err => {
      document.getElementById("apiNotice").textContent = "⚠️ Failed to load posts. Please try again later.";
      console.error(err);
    });
}

function createPagination(current, totalPages) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 0; i < totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.onclick = () => {
      currentPage = i;
      loadPosts(i);
    };
    if (i === current) btn.style.fontWeight = 'bold';
    pagination.appendChild(btn);
  }
}

function loadCategories() {
  showApiNotice();
  fetch("https://blog-backend-e8yb.onrender.com/api/posts/categories")
    .then(res => res.json())
    .then(categories => {
      hideApiNotice();
      const list = document.getElementById("categoryList");
      list.innerHTML = "";
      categories.forEach(cat => {
        const li = document.createElement("li");
        li.textContent = cat;
        li.onclick = () => {
          showApiNotice();
          fetch(`https://blog-backend-e8yb.onrender.com/api/posts/category/${cat}`)
            .then(res => res.json())
            .then(posts => {
              hideApiNotice();
              loadFromResponse(posts);
            });
        };
        list.appendChild(li);
      });
    });
}

function searchPosts(keyword) {
  fetch(`https://blog-backend-e8yb.onrender.com/api/posts/search?keyword=${encodeURIComponent(keyword)}`)
    .then(res => res.json())
    .then(posts => {
      loadFromResponse(posts);
    });
}

function loadFromResponse(posts) {
  const container = document.getElementById("posts");
  container.innerHTML = "";
  posts.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.className = "post-card";
    const firstImageMatch = post.body.match(/<img[^>]+src="([^">]+)"/);
    const firstImage = firstImageMatch ? firstImageMatch[1] : '';

    postDiv.innerHTML = `
      ${firstImage ? `<img src="${firstImage}" class="post-image" alt="Thumbnail">` : ""}
      <h3>${post.title}</h3>
      <p class="meta">${new Date(post.createdAt).toLocaleDateString()} | ${post.category}</p>
      <div class="post-snippet">${post.body.replace(/<[^>]*>?/gm, '').substring(0, 120)}...</div>
      <button class="read-more-button" onclick="location.href='/views/post.html?title=${encodeURIComponent(post.title)}'">Read Now</button>
    `;
    container.appendChild(postDiv);
  });
  document.getElementById("pagination").innerHTML = "";
}

function showApiNotice() {
  const notice = document.getElementById("apiNotice");
  if (notice) notice.style.display = "block";
}

function hideApiNotice() {
  const notice = document.getElementById("apiNotice");
  if (notice) notice.style.display = "none";
}

document.getElementById("searchInput").addEventListener("input", e => {
  const keyword = e.target.value.trim();
  if (keyword.length >= 3) {
    searchPosts(keyword);
  } else {
    loadPosts(currentPage);
  }
});

loadPosts();
loadCategories();
