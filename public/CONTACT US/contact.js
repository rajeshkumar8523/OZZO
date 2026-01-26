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


//// EMAILJS SEND MESSAGE ////

window.onload = function () {
  emailjs.init("bbTCIGiaKx5c6q8ju");

  document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const form = this;
    const successMsg = document.getElementById("successMessage");
    const heading = document.querySelector(".form-card h3");

    emailjs.sendForm("service_3ti5uys", "template_5xxqxmv", form)
      .then(function () {
        // Hide form elements and heading
        heading.style.display = "none";
        Array.from(form.elements).forEach(el => {
          if (el.tagName !== "DIV") el.style.display = "none";
        });

        // Show success message
        successMsg.style.display = "flex";

        // Reset form fields
        form.reset();

        // Show form back after 3 seconds
        setTimeout(() => {
          heading.style.display = "";
          Array.from(form.elements).forEach(el => {
            el.style.display = "";
          });
          successMsg.style.display = "none";
        }, 6000);
      })
      .catch(function (error) {
        alert("❌ Failed to send message. Please try again.");
        console.error("EmailJS Error:", error);
      });
  });
};


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
