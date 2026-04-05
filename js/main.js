document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  highlightActiveNav();

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", handleContactSubmit);
    form.addEventListener("reset", () => {
      clearAlert();
      form.classList.remove("was-validated");
      [...form.querySelectorAll(".form-control")].forEach((el) => {
        el.classList.remove("is-valid", "is-invalid");
      });
    });
  }
});

function highlightActiveNav() {
  const links = document.querySelectorAll(".navbar .nav-link[href]");
  const current = normalizePath(window.location.pathname);

  links.forEach((link) => {
    const href = link.getAttribute("href");
    const linkPath = normalizePath(href);

    if (current === linkPath) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

function normalizePath(path) {
  const clean = path.split("?")[0].split("#")[0];
  if (!clean || clean === "/" || clean.endsWith("/")) return "index.html";
  return clean.substring(clean.lastIndexOf("/") + 1);
}

function handleContactSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const alertBox = document.getElementById("formAlert");

  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const mobile = document.getElementById("mobile");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  form.classList.add("was-validated");
  clearValidation([fullName, email, mobile, subject, message]);

  if (!form.checkValidity()) {
    showAlert("Please fill all required fields correctly.", "danger");
    markInvalid([fullName, email, mobile, subject, message]);
    return;
  }

  const mobileValue = mobile.value.trim();
  const mobileRegex = /^[0-9]{10}$/;

  if (!mobileRegex.test(mobileValue)) {
    mobile.classList.add("is-invalid");
    showAlert("Mobile number must be exactly 10 digits.", "danger");
    return;
  }

  showAlert("Message sent successfully. I will get back soon.", "success");
  form.reset();
  form.classList.remove("was-validated");
}

function showAlert(message, type) {
  const alertBox = document.getElementById("formAlert");
  if (!alertBox) return;

  alertBox.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}

function clearAlert() {
  const alertBox = document.getElementById("formAlert");
  if (alertBox) alertBox.innerHTML = "";
}

function clearValidation(fields) {
  fields.forEach((field) => {
    if (field) field.classList.remove("is-valid", "is-invalid");
  });
}

function markInvalid(fields) {
  fields.forEach((field) => {
    if (field && !field.value.trim()) {
      field.classList.add("is-invalid");
    }
  });
}