document.addEventListener("click", function(event) {
    if (event.target.tagName === "A") {
      const url = new URL(event.target.href);
      if (["malicious.com", "fakebank.com", "phishingsite.net"].includes(url.hostname)) {
        alert("Warning: Phishing link detected!");
        event.preventDefault();
      }
    }
  });
  