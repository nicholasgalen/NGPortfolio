document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (!form) {
    console.error("Form #loginForm not found.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const basicAuth = btoa(`${username}:${password}`);

    try {
      const response = await fetch("https://blog-backend-e8yb.onrender.com/admin", {
        headers: {
          "Authorization": `Basic ${basicAuth}`,
        },
      });

      if (response.ok) {
        const text = await response.text();
        alert("Login completado: " + text);
        localStorage.setItem("auth", basicAuth);
        window.location.href = "/views/admin.html";
      } else {
        alert("Invalid login attributes.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
