document
  .getElementById("garbageForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form from reloading the popup

    const type = document.getElementById("type").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;

    const responseElement = document.getElementById("response");

    // Simulate sending data to a backend
    try {
      // Example backend endpoint (replace with your own API endpoint)
      const response = await fetch("https://example.com/api/sell-garbage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          quantity,
          price,
        }),
      });

      if (response.ok) {
        responseElement.textContent = "Garbage details submitted successfully!";
        responseElement.style.color = "green";
      } else {
        throw new Error("Failed to submit details.");
      }
    } catch (error) {
      responseElement.textContent = `Error: ${error.message}`;
      responseElement.style.color = "red";
    }
  });
