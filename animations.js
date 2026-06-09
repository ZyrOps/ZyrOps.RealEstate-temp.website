const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  if (window.Lenis) {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  gsap.from("[data-hero-reveal]", {
    y: 34,
    opacity: 0,
    duration: 0.75,
    ease: "power2.out",
    stagger: 0.12,
    delay: 0.35,
  });

  document.querySelectorAll("[data-animate]").forEach((section) => {
    const children = section.querySelectorAll("[data-stagger]");
    gsap.from(children.length ? children : section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      stagger: children.length ? 0.1 : 0,
    });
  });
}
