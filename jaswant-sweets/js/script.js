/* ==========================================================
   Jaswant Sweets Ujaliwadi - main script (vanilla JavaScript)
   Every feature checks that its elements exist, so the same
   file can safely be loaded on all pages without errors.
   ========================================================== */
document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Toast notifications ---------- */
  var toastBox = document.getElementById("toast-container");
  function showToast(message, isError) {
    if (!toastBox) return;
    var toast = document.createElement("div");
    toast.className = "toast" + (isError ? " error-toast" : "");
    toast.textContent = message;
    toastBox.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 3500);
  }

  /* ---------- 2. Mobile hamburger menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  function setMenu(open) {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(!menu.classList.contains("open"));
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
  }

  /* ---------- 3. Smooth scrolling for in-page links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var target = document.querySelector(link.getAttribute("href"));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
    });
  });

  /* ---------- 4. Product category filter ---------- */
  var filterButtons = document.querySelectorAll(".filter-btn");
  var productCards = document.querySelectorAll(".product-card");
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var category = btn.dataset.filter;
      filterButtons.forEach(function (b) {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", String(b === btn));
      });
      productCards.forEach(function (card) {
        var show = category === "all" || card.dataset.category === category;
        card.classList.toggle("hidden", !show);
      });
    });
  });

  /* ---------- 5. FAQ accordion (one answer open at a time) ---------- */
  var questions = document.querySelectorAll(".faq-question");
  questions.forEach(function (q) {
    q.addEventListener("click", function () {
      var isOpen = q.getAttribute("aria-expanded") === "true";
      questions.forEach(function (other) {            // close all first
        other.setAttribute("aria-expanded", "false");
        other.nextElementSibling.style.maxHeight = null;
      });
      if (!isOpen) {                                  // then open the clicked one
        q.setAttribute("aria-expanded", "true");
        q.nextElementSibling.style.maxHeight = q.nextElementSibling.scrollHeight + "px";
      }
    });
  });

  /* ---------- 6. Gallery lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lightImg = lightbox.querySelector("img");
    var lightCaption = lightbox.querySelector("p");
    var closeBtn = lightbox.querySelector(".lightbox-close");
    var lastFocused = null;
    var closeLightbox = function () {
      lightbox.classList.remove("open");
      if (lastFocused) lastFocused.focus();
    };
    document.querySelectorAll(".gallery-item").forEach(function (item) {
      item.addEventListener("click", function () {
        lastFocused = item;
        lightImg.src = item.dataset.full;
        lightImg.alt = item.dataset.caption;
        lightCaption.textContent = item.dataset.caption;
        lightbox.classList.add("open");
        closeBtn.focus();
      });
    });
    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLightbox(); });
  }

  /* ---------- 7. Scroll-to-top button ---------- */
  var toTop = document.getElementById("to-top");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("show", window.scrollY > 400);
    });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 8. Form validation (contact + bulk order) ---------- */
  // Returns an error message for one field, or "" if it is valid.
  function getError(field) {
    var value = field.value.trim();
    if (field.required && value === "") return "This field is required.";
    if (value === "") return "";
    if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value))
      return "Enter a valid email, for example name@example.com.";
    if (field.dataset.type === "phone" && !/^[6-9]\d{9}$/.test(value.replace(/[\s+\-]|^91/g, "")))
      return "Enter a valid 10-digit Indian mobile number.";
    if (field.dataset.minlength && value.length < Number(field.dataset.minlength))
      return "Please enter at least " + field.dataset.minlength + " characters.";
    if (field.type === "number" && Number(value) < Number(field.min || 1))
      return "Minimum quantity is " + (field.min || 1) + ".";
    if (field.type === "date" && field.min && value < field.min)
      return "Please choose today's date or a later date.";
    return "";
  }

  function showFieldError(field, message) {
    var box = field.closest(".field").querySelector(".error");
    box.textContent = message;
    field.setAttribute("aria-invalid", message ? "true" : "false");
  }

  document.querySelectorAll("form[data-validate]").forEach(function (form) {
    var fields = form.querySelectorAll("input, select, textarea");
    var success = form.querySelector(".form-success");

    fields.forEach(function (field) {   // live feedback once the user leaves a field
      field.addEventListener("blur", function () { showFieldError(field, getError(field)); });
      field.addEventListener("input", function () {
        if (field.getAttribute("aria-invalid") === "true") showFieldError(field, getError(field));
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();               // stop the page reload: there is no backend
      var firstInvalid = null;
      fields.forEach(function (field) {
        var message = getError(field);
        showFieldError(field, message);
        if (message && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        firstInvalid.focus();
        showToast("Please fix the highlighted fields.", true);
        return;
      }
      // Frontend-only: the data is NOT sent or stored anywhere.
      success.textContent = form.dataset.success;
      success.classList.add("show");
      showToast(form.dataset.success);
      form.reset();
    });
  });

  /* ---------- 9. Bulk order form: min date + product pre-fill ---------- */
  var dateInput = document.getElementById("b-date");
  if (dateInput) {
    var d = new Date();
    dateInput.min = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  var productSelect = document.getElementById("b-product");
  var wanted = new URLSearchParams(window.location.search).get("product");  // from "Enquire Now"
  if (productSelect && wanted) {
    Array.prototype.forEach.call(productSelect.options, function (opt) {
      if (opt.value === wanted) productSelect.value = wanted;
    });
  }
});
