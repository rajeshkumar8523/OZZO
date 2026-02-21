//// EMAILJS  FRANCHISE APPLY ////
window.onload = function () {
  emailjs.init("bbTCIGiaKx5c6q8ju"); // ✅ Your actual EmailJS public key
  document
    .getElementById("franchiseForm")
    .addEventListener("submit", handleFranchiseSubmit);
};

const cards = document.querySelectorAll(".service-card");
const selectedServices = [];
const nextBtn = document.getElementById("nextBtn");

function updateNextVisibility() {
  nextBtn.style.display = selectedServices.length > 0 ? "inline-block" : "none";
}

cards.forEach((card) => {
  const serviceName = card.querySelector("h3")?.innerText.trim();

  const circle = document.createElement("div");
  circle.className = "select-circle";
  circle.innerHTML = `<i class="fas fa-check"></i>`;
  card.appendChild(circle);

  circle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isSelected = card.classList.toggle("selected");

    if (isSelected) {
      if (!selectedServices.includes(serviceName)) {
        selectedServices.push(serviceName);
      }
    } else {
      const index = selectedServices.indexOf(serviceName);
      if (index !== -1) selectedServices.splice(index, 1);
    }

    updateNextVisibility();
  });
});

function showForm() {
  if (selectedServices.length > 0) {
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("popupForm").style.display = "flex";
    document.getElementById("selectedServicePopup").value =
      selectedServices.join(", ");
  } else {
    alert("Please select at least one service.");
  }
}

function closePopup() {
  document.getElementById("popupForm").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
}

async function handleFranchiseSubmit(event) {
  event.preventDefault();

  const emailData = {
    to_name: "Blink Bowl",
    from_name: document.getElementById("name").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    contact: document.getElementById("mobile").value,
    gender: document.getElementById("gender").value, // Using getElementById after fixing HTML
    qualification: document.getElementById("qualification").value,
    location: document.getElementById("location").value,
    services: document.getElementById("selectedServicePopup").value,
    message: document.getElementById("message").value,
  };

  try {
    const response = await emailjs.send(
      "service_3ti5uys",
      "template_dwk55jv",
      emailData,
    );
    console.log("✅ SUCCESS!", response.status, response.text);
    document.getElementById("franchiseForm").reset();
    document.getElementById("popupForm").style.display = "none";
    document.getElementById("successMessage").style.display = "flex";
  } catch (error) {
    console.error("❌ FAILED...", error);
    alert("Submission failed. Please try again.");
  }
}

//// AUTO SLIDE IMAGES ////
const carousels = document.querySelectorAll(".carousel");

carousels.forEach((carousel) => {
  const images = carousel.querySelectorAll("img");
  let index = 0;

  setInterval(() => {
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
  }, 3000);
});

//// NAV MENUBAR ////
const menu = document.getElementById("mobileMenu");
const toggleBtn = document.getElementById("menuToggle");

function toggleMenu() {
  menu.classList.toggle("show");

  if (menu.classList.contains("show")) {
    toggleBtn.textContent = "✖";
    document.addEventListener("click", handleOutsideClick);
  } else {
    toggleBtn.textContent = "☰";
    document.removeEventListener("click", handleOutsideClick);
  }
}

function handleOutsideClick(event) {
  if (!menu.contains(event.target) && !toggleBtn.contains(event.target)) {
    menu.classList.remove("show");
    toggleBtn.textContent = "☰";
    document.removeEventListener("click", handleOutsideClick);
  }
}

// Optional: Reset on resize
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    menu.classList.remove("show");
    toggleBtn.textContent = "☰";
  }
});

// HEADING FLY ANIMATION
// Reusable function to animate text letter by letter
function animateHeadingText(text, elementId) {
  const heading = document.getElementById(elementId);

  // Check if element exists
  if (!heading) {
    console.error(`Element with id "${elementId}" not found`);
    return;
  }

  heading.innerHTML = "";

  [...text].forEach((char, i) => {
    const span = document.createElement("span");

    if (char === " ") {
      span.innerHTML = "&nbsp;";
    } else {
      span.textContent = char;
      span.style.animationDelay = `${i * 0.06}s`;
    }

    span.classList.add("letter");
    heading.appendChild(span);
  });
}

// Call the function for all headings
// Make sure you call this after the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  animateHeadingText("E-commerce Business Sector", "ecommerceHeading");
  animateHeadingText("Management Business Sector", "managementHeading");
  animateHeadingText("Rental Business Sector", "rentalHeading");
  animateHeadingText("Service Business Sector", "serviceHeading");
  animateHeadingText("Training Business Sector", "trainingHeading");
});

//// SCROLL BAR ////
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show/hide button on scroll
window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 100) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

// Scroll to top smoothly when button clicked
scrollTopBtn.addEventListener("click", () => {
  slowScrollToTop();
});

function slowScrollToTop() {
  const scrollSpeed = 3; // Lower = slower

  function scrollStep() {
    const currentScroll = window.scrollY;
    if (currentScroll > 0) {
      window.scrollTo(0, currentScroll - scrollSpeed);
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
}
