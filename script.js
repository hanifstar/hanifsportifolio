// Import Firebase
import firebase from "firebase/app"
import "firebase/firestore"

// Firebase Configuration
const firebaseConfig = {
  // Replace with your Firebase config
   apiKey: "AIzaSyCayGcfnpCAGNDph3YTyEA9_KDdD2C5Fg0",
  authDomain: "my-tiktok-cbd6f.firebaseapp.com",
  databaseURL: "https://my-tiktok-cbd6f-default-rtdb.firebaseio.com",
  projectId: "my-tiktok-cbd6f",
  storageBucket: "my-tiktok-cbd6f.firebasestorage.app",
  messagingSenderId: "964441294320",
  appId: "1:964441294320:web:4c8da74a0cee8ed2644935",
  measurementId: "G-RYBWW6XB10"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

// DOM Elements
const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const themeToggle = document.getElementById("theme-toggle")
const contactForm = document.getElementById("contact-form")
const submitBtn = document.getElementById("submit-btn")
const modal = document.getElementById("modal")
const closeModal = document.getElementById("close-modal")

// Navigation functionality
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling and active link highlighting
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Update active navigation link on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const scrollPos = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active")
      })
      if (navLink) {
        navLink.classList.add("active")
      }
    }
  })

  // Navbar background on scroll
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      navbar.style.background = "rgba(17, 24, 39, 0.98)"
    }
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      navbar.style.background = "rgba(17, 24, 39, 0.95)"
    }
  }
})

// Theme toggle functionality
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)

  // Update icon
  const icon = themeToggle.querySelector("i")
  icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon"
})

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light"
document.documentElement.setAttribute("data-theme", savedTheme)
const themeIcon = themeToggle.querySelector("i")
themeIcon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon"

// Typing animation for hero text
const typingText = document.querySelector(".typing-text")
if (typingText) {
  const text = typingText.textContent
  typingText.textContent = ""
  let i = 0

  function typeWriter() {
    if (i < text.length) {
      typingText.textContent += text.charAt(i)
      i++
      setTimeout(typeWriter, 100)
    }
  }

  setTimeout(typeWriter, 1000)
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el)
})

// Skill bars animation
const skillsSection = document.getElementById("skills")
let skillsAnimated = false

const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !skillsAnimated) {
        animateSkillBars()
        skillsAnimated = true
      }
    })
  },
  { threshold: 0.5 },
)

if (skillsSection) {
  skillsObserver.observe(skillsSection)
}

function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width")
    setTimeout(() => {
      bar.style.width = width + "%"
    }, 300)
  })
}

// Form validation
function validateForm() {
  const name = document.getElementById("name").value.trim()
  const email = document.getElementById("email").value.trim()
  const subject = document.getElementById("subject").value.trim()
  const message = document.getElementById("message").value.trim()

  let isValid = true

  // Clear previous errors
  document.querySelectorAll(".error-message").forEach((error) => {
    error.textContent = ""
  })

  // Name validation
  if (name.length < 2) {
    document.getElementById("name-error").textContent = "Name must be at least 2 characters long"
    isValid = false
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    document.getElementById("email-error").textContent = "Please enter a valid email address"
    isValid = false
  }

  // Subject validation
  if (subject.length < 5) {
    document.getElementById("subject-error").textContent = "Subject must be at least 5 characters long"
    isValid = false
  }

  // Message validation
  if (message.length < 10) {
    document.getElementById("message-error").textContent = "Message must be at least 10 characters long"
    isValid = false
  }

  return isValid
}

// Contact form submission
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  if (!validateForm()) {
    return
  }

  // Show loading state
  submitBtn.classList.add("loading")

  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    subject: document.getElementById("subject").value.trim(),
    message: document.getElementById("message").value.trim(),
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    read: false,
  }

  try {
    await db.collection("messages").add(formData)

    // Show success message
    showModal("success", "Message Sent!", "Thank you for your message. I'll get back to you soon!")

    // Reset form
    contactForm.reset()
  } catch (error) {
    console.error("Error sending message:", error)
    showModal("error", "Error", "There was an error sending your message. Please try again.")
  } finally {
    submitBtn.classList.remove("loading")
  }
})

// Modal functionality
function showModal(type, title, message) {
  const modalIcon = modal.querySelector(".modal-icon")
  const modalTitle = modal.querySelector(".modal-title")
  const modalMessage = modal.querySelector(".modal-message")

  modalIcon.className = type === "success" ? "fas fa-check-circle modal-icon" : "fas fa-exclamation-circle modal-icon"
  modalIcon.style.color = type === "success" ? "#10b981" : "#ef4444"
  modalTitle.textContent = title
  modalMessage.textContent = message

  modal.style.display = "block"
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none"
})

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none"
  }
})

// Floating icons animation
const floatingIcons = document.querySelectorAll(".floating-icons i")
floatingIcons.forEach((icon, index) => {
  icon.style.animationDelay = `${index * 0.5}s`
})

// Smooth scroll indicator
const scrollIndicator = document.querySelector(".scroll-indicator")
if (scrollIndicator) {
  scrollIndicator.addEventListener("click", () => {
    document.getElementById("about").scrollIntoView({
      behavior: "smooth",
    })
  })
}

// Service cards hover effect
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Initialize animations on page load
window.addEventListener("load", () => {
  // Add visible class to hero elements after a delay
  setTimeout(() => {
    document.querySelectorAll(".hero .fade-in").forEach((el) => {
      el.classList.add("visible")
    })
  }, 500)
})

// Preloader (optional)
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})
