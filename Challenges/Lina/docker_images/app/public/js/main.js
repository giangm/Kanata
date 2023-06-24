document.getElementById("profile").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
  
    const jsonData = {};
    for (let [key, value] of formData.entries()) {
      jsonData[key] = value;
    }
  
    fetch("/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonData)
    })
  });
  