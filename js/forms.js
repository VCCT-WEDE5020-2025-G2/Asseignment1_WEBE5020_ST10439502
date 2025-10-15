// Handle both forms in one script
document.addEventListener("DOMContentLoaded", () => {

  // Helper to show messages
  const showMessage = (el, msg, success = false) => {
    el.textContent = msg;
    el.style.color = success ? "green" : "red";
  };

  // ENQUIRY FORM
  const enquiryForm = document.getElementById("enquiryForm");
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = document.getElementById("formStatus");
      if (!enquiryForm.checkValidity()) {
        showMessage(status, "Please fill in all required fields correctly.");
        return;
      }

      const data = Object.fromEntries(new FormData(enquiryForm));

      try {
        const res = await fetch("https://httpbin.org/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          showMessage(status, "Your enquiry has been sent successfully!", true);
          enquiryForm.reset();
        } else throw new Error();
      } catch {
        showMessage(status, "Something went wrong. Please try again later.");
      }
    });
  }

  // CONTACT FORM
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = document.getElementById("contactStatus");
      if (!contactForm.checkValidity()) {
        showMessage(status, "Please complete all required fields properly.");
        return;
      }

      const data = Object.fromEntries(new FormData(contactForm));

      try {
        const res = await fetch("https://httpbin.org/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          showMessage(status, "Message sent successfully!", true);
          contactForm.reset();
        } else throw new Error();
      } catch {
        showMessage(status, "Failed to send. Please try again later.");
      }
    });
  }
});
