document.getElementById("api-button")?.addEventListener("click", async (e) => {
  const button = e.currentTarget;
  const originalText = button.textContent;

  button.disabled = true;
  button.textContent = "API Down ...";

  try {
    const response = await fetch("https://api.gentlehill.co/", {
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    console.log("Gentle Hill API response:", data);
  } catch (error) {
    console.error("Gentle Hill API test failed:", error);
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
});