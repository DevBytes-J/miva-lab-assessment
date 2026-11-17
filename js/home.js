function animateHomeCounters() {
  const counters = document.querySelectorAll(".home-strip strong[data-count]");
  counters.forEach((el) => {
    const target = parseInt(el.getAttribute("data-count") || "0", 10);
    let current = 0;
    el.textContent = "00";
    const stepTime = Math.max(110, Math.floor(900 / Math.max(target, 1)));
    const timer = setInterval(() => {
      current += 1;
      el.textContent = String(current).padStart(2, "0");
      if (current >= target) {
        clearInterval(timer);
      }
    }, stepTime);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const rotatingWordEl = document.getElementById("hero-rotating-word");
  if (rotatingWordEl) {
    const heroWords = ["Creative", "Thoughtful", "Clean", "Intentional"];
    let wordIndex = 0;
    setInterval(() => {
      rotatingWordEl.classList.add("word-out");
      setTimeout(() => {
        wordIndex = (wordIndex + 1) % heroWords.length;
        rotatingWordEl.textContent = heroWords[wordIndex];
        rotatingWordEl.classList.remove("word-out");
      }, 350);
    }, 2800);
  }

  const homeStrip = document.querySelector(".home-strip");
  if (homeStrip && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateHomeCounters();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(homeStrip);
  } else {
    animateHomeCounters();
  }
});
