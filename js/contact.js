document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const phoneInput = document.getElementById("contact-phone");
  const messageInput = document.getElementById("contact-message");

  const errorName = document.getElementById("error-name");
  const errorEmail = document.getElementById("error-email");
  const errorPhone = document.getElementById("error-phone");
  const errorMessage = document.getElementById("error-message");

  const defaultView = document.getElementById("contact-default-view");
  const successView = document.getElementById("contact-success-view");
  const successFirstName = document.getElementById("success-first-name");
  const sendAnotherBtn = document.getElementById("send-another-btn");

  function showError(el, msg) {
    if (!el) return;
    if (msg) {
      el.textContent = msg;
      el.style.display = "block";
    } else {
      el.textContent = "";
      el.style.display = "none";
    }
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const values = {
        name: nameInput ? nameInput.value : "",
        email: emailInput ? emailInput.value : "",
        phone: phoneInput ? phoneInput.value : "",
        message: messageInput ? messageInput.value : "",
      };

      const next = {};
      if (!values.name.trim()) next.name = "Please enter your name.";
      if (!values.email.trim()) next.email = "Please enter your email.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
        next.email = "Enter a valid email address.";
      if (!values.phone.trim()) next.phone = "Please enter your phone number.";
      else if (!/^\d+$/.test(values.phone))
        next.phone = "Use digits only, without spaces.";
      if (!values.message.trim())
        next.message = "Tell me a little about your message.";

      showError(errorName, next.name || "");
      showError(errorEmail, next.email || "");
      showError(errorPhone, next.phone || "");
      showError(errorMessage, next.message || "");

      if (!Object.keys(next).length) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "Send my message";
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Sending...";
        }

        fetch("https://formspree.io/f/mzznwwnq", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((response) => {
            if (response.ok) {
              const firstName = values.name.trim().split(" ")[0];
              if (successFirstName) {
                successFirstName.textContent = `${firstName}.`;
              }
              if (defaultView) defaultView.style.display = "none";
              if (successView) successView.style.display = "flex";
              window.scrollTo({ top: 0, behavior: "smooth" });
              contactForm.reset();
            } else {
              response.json().then((data) => {
                if (data && data.errors && data.errors.length) {
                  showError(
                    errorMessage,
                    data.errors.map((err) => err.message).join(", ")
                  );
                } else {
                  showError(
                    errorMessage,
                    "There was a problem sending your message. Please try again."
                  );
                }
              }).catch(() => {
                showError(
                  errorMessage,
                  "There was a problem sending your message. Please try again."
                );
              });
            }
          })
          .catch(() => {
            showError(
              errorMessage,
              "Network error. Please check your connection and try again."
            );
          })
          .finally(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnHtml;
            }
          });
      }
    });
  }

  if (sendAnotherBtn) {
    sendAnotherBtn.addEventListener("click", () => {
      if (nameInput) nameInput.value = "";
      if (emailInput) emailInput.value = "";
      if (phoneInput) phoneInput.value = "";
      if (messageInput) messageInput.value = "";
      showError(errorName, "");
      showError(errorEmail, "");
      showError(errorPhone, "");
      showError(errorMessage, "");
      if (successView) successView.style.display = "none";
      if (defaultView) defaultView.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
