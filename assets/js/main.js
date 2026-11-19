(function () {
  "use strict";

  var EN = {
    "nav.about": "About",
    "nav.research": "Research",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    "hero.eyebrow": "Ocean University of China",
    "hero.role": "Computer Science · Undergraduate",

    "about.title": "About",
    "about.p1":
      "I am an undergraduate in Computer Science at Ocean University of China. During my undergraduate studies I participated in a knowledge tracing research project, working on heterogeneous graph and hypergraph fusion as well as multimodal learning behavior modeling; the project was recognized as a National-Level Undergraduate Innovation and Entrepreneurship Training Program.",
    "about.p2":
      "Small tools and life-logging works from coursework and personal practice are listed in the projects section below.",

    "research.title": "Research",
    "research.hdhkt.sub": "2027 · Second Author",
    "research.hdhkt.desc":
      "A knowledge tracing method that fuses heterogeneous graphs with difficulty-aware hypergraphs, published in Pattern Recognition.",
    "research.unikt.sub":
      "Datasets & Benchmarks Track · Accepted · Second Author",
    "research.unikt.desc":
      "A unified framework for knowledge tracing experiments, covering data processing, training, hyperparameter search, evaluation, and efficiency benchmarks.",
    "research.axikt.venue": "Under Review",
    "research.axikt.sub": "Research Paper",
    "research.axikt.desc":
      "Research on multi-scale temporal modeling and concept-independent memory for long sequences.",
    "research.mmkt.venue": "National-Level Program",
    "research.mmkt.sub": "Research Program",
    "research.mmkt.title":
      "A Multimodal Knowledge Tracing Method Based on Dynamic Cognitive Modeling Learning",
    "research.mmkt.desc":
      "A National-Level Undergraduate Innovation and Entrepreneurship Training Program project. This research focuses on Knowledge Tracing (KT): given a student's historical response interactions and the relational information of educational content, it dynamically estimates the learner's latent mastery of each knowledge concept and predicts the probability of correctly answering subsequent exercises, providing a modeling basis for personalized exercise recommendation and adaptive learning.",

    "projects.title": "Projects",
    "projects.xhzy.badge": "Digital Learning Platform",
    "projects.xhzy.desc": "A digital learning platform for red slogan culture.",
    "projects.ongoing.badge": "Life Logging",
    "projects.ongoing.desc": "A mini program for recording daily life.",
    "projects.msd.title": "Mobile Software Development",
    "projects.msd.badge": "Coursework",
    "projects.msd.desc": "Course experiments and project archive.",

    "link.repo": "Repository",
    "link.demo": "Live Demo",
    "link.more": "More public repositories",

    "contact.title": "Contact",
    "contact.label": "Email: ",

    "footer.built":
      "Built with plain HTML / CSS / JavaScript · Hosted on GitHub Pages"
  };

  var TITLE = {
    zh: "Xianglian Peng · 个人主页",
    en: "Xianglian Peng · Personal Homepage"
  };

  var nodes = document.querySelectorAll("[data-i18n]");
  var original = new Map();

  nodes.forEach(function (node) {
    original.set(node, node.textContent);
  });

  var langBtn = document.getElementById("lang-toggle");
  var langLabel = langBtn ? langBtn.querySelector(".lang-label") : null;

  function applyLang(lang, persist) {
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    document.title = TITLE[lang] || TITLE.zh;

    nodes.forEach(function (node) {
      var key = node.getAttribute("data-i18n");
      if (lang === "en" && EN[key]) {
        node.textContent = EN[key];
      } else {
        node.textContent = original.get(node);
      }
    });

    if (langLabel) {
      langLabel.textContent = lang === "en" ? "中" : "EN";
    }
    langBtn.setAttribute(
      "aria-label",
      lang === "en" ? "切换到中文" : "Switch to English"
    );
    if (persist) {
      try {
        localStorage.setItem("lang", lang);
      } catch (e) {}
    }
  }

  if (langBtn) {
    langBtn.addEventListener("click", function () {
      var current = document.documentElement.lang === "en" ? "en" : "zh";
      applyLang(current === "en" ? "zh" : "en", true);
    });
  }

  var savedLang = null;
  try {
    savedLang = localStorage.getItem("lang");
  } catch (e) {}
  applyLang(savedLang === "en" ? "en" : "zh", false);

  /* Theme */
  var themeBtn = document.getElementById("theme-toggle");
  var root = document.documentElement;

  function setTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }

  var savedTheme = null;
  try {
    savedTheme = localStorage.getItem("theme");
  } catch (e) {}
  if (!savedTheme) {
    savedTheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }
  setTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var isDark = root.getAttribute("data-theme") === "dark";
      setTheme(isDark ? "light" : "dark");
    });
  }

  /* Year */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Scroll progress */
  var progress = document.getElementById("progress");
  function updateProgress() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var ratio = max > 0 ? doc.scrollTop / max : 0;
    if (progress) {
      progress.style.width = (ratio * 100).toFixed(2) + "%";
    }
  }
  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        updateProgress();
        ticking = false;
      });
    },
    { passive: true }
  );
  window.addEventListener("resize", updateProgress);
  updateProgress();

  /* Active navigation */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav a[href^="#"]')
  );
  var sections = Array.prototype.slice.call(
    document.querySelectorAll("main section[id]")
  );
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var hash = "#" + entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === hash
            );
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
      spy.observe(section);
    });
  }

  /* Staggered reveal */
  Array.prototype.forEach.call(
    document.querySelectorAll(".item-list, .paper-list"),
    function (list) {
      Array.prototype.forEach.call(list.children, function (child, index) {
        child.style.transitionDelay = Math.min(index * 70, 280) + "ms";
      });
    }
  );

  /* Reveal on scroll */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            el.classList.add("is-visible");
            io.unobserve(el);
            if (el.style.transitionDelay) {
              window.setTimeout(function () {
                el.style.transitionDelay = "";
              }, 900);
            }
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
