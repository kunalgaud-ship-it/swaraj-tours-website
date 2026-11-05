
"use strict";

// Swaraj Tours and Travels WhatsApp number.
// Use country code 91 without +, spaces or hyphens.
const WHATSAPP_NUMBER = "919764383238";

const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");
const travelDateInput = document.getElementById("travelDate");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

// Set the minimum travel date to today's local date.
function getLocalDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

if (travelDateInput) {
  travelDateInput.min = getLocalDateString();
}

// Current year in the footer.
const currentYear = document.getElementById("currentYear");
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Mobile navigation.
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });
}

// Prefill journey type from service cards.
document.querySelectorAll("[data-journey]").forEach((link) => {
  link.addEventListener("click", () => {
    const journeyType = document.getElementById("journeyType");
    if (journeyType) {
      journeyType.value = link.dataset.journey;
    }
  });
});

// Prefill vehicle preference from fleet cards.
document.querySelectorAll("[data-vehicle]").forEach((link) => {
  link.addEventListener("click", () => {
    const vehicle = document.getElementById("vehicle");
    if (vehicle) {
      vehicle.value = link.dataset.vehicle;
    }
  });
});

// Example routes fill in destination and default pickup.
document.querySelectorAll("[data-destination]").forEach((button) => {
  button.addEventListener("click", () => {
    const destination = document.getElementById("destination");
    const pickup = document.getElementById("pickup");

    if (destination) {
      destination.value = button.dataset.destination;
    }

    if (pickup && !pickup.value.trim()) {
      pickup.value = "Nashik";
    }

    document.getElementById("booking")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    window.setTimeout(() => {
      document.getElementById("travelDate")?.focus({
        preventScroll: true
      });
    }, 400);
  });
});

// Build a WhatsApp enquiry from the form.
if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) {
      return;
    }

    const formData = new FormData(bookingForm);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const pickup = String(formData.get("pickup") || "").trim();
    const destination = String(formData.get("destination") || "").trim();
    const journeyType = String(formData.get("journeyType") || "").trim();
    const travelDate = String(formData.get("travelDate") || "").trim();
    const passengers = String(formData.get("passengers") || "").trim();
    const vehicle = String(formData.get("vehicle") || "No preference").trim();
    const notes = String(formData.get("notes") || "").trim();

    // Basic mobile-number validation. International formats are accepted.
    const phoneDigits = phone.replace(/\D/g, "");

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      formMessage.textContent =
        "Please enter a valid mobile number, including the country code if needed.";
      document.getElementById("phone").focus();
      return;
    }

    // Prevent selecting a past date even if a browser bypasses min.
    if (travelDate < getLocalDateString()) {
      formMessage.textContent = "Please select today or a future travel date.";
      travelDateInput.focus();
      return;
    }

    const message = [
      "Hello Swaraj Tours and Travels,",
      "",
      "I would like to enquire about a trip.",
      "",
      `Name: ${name}`,
      `My mobile number: ${phone}`,
      `Pickup location: ${pickup}`,
      `Destination: ${destination}`,
      `Journey type: ${journeyType}`,
      `Travel date: ${travelDate}`,
      `Passengers: ${passengers}`,
      `Preferred vehicle: ${vehicle}`,
      `Additional requirements: ${notes || "Not specified"}`,
      "",
      "Please confirm the fare, vehicle availability and trip details.",
      "I understand this enquiry is not a confirmed booking."
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    formMessage.textContent =
      "Opening WhatsApp. Please review the message and press Send there.";

    // This opens WhatsApp; the customer must send the message manually.
    window.location.href = whatsappURL;
  });
}