/* ============================================================
   个人网站 · 交互脚本
   ============================================================ */

(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var menuToggle = document.getElementById("menuToggle");
  var navLinks = document.getElementById("navLinks");
  var backTop = document.getElementById("backTop");

  /* ---------- 导航栏滚动状态 ---------- */
  function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > 12);
    backTop.classList.toggle("show", window.scrollY > 480);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ---------- 移动端菜单 ---------- */
  menuToggle.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
  });

  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- 打字机效果 ---------- */
  // TODO(个人): 替换为你的职位 / 标签
  // TODO(个人): 替换为你的标签
  var roles = ["初中生", "热爱羽毛球", "热爱原神"];
  var typeTarget = document.getElementById("typeTarget");
  var roleIndex = 0;
  var charIndex = 0;
  var deleting = false;

  function type() {
    var current = roles[roleIndex];
    if (!deleting) {
      typeTarget.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
      setTimeout(type, 75);
    } else {
      typeTarget.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 350);
        return;
      }
      setTimeout(type, 38);
    }
  }

  type();

  /* ---------- 滚动显现 ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- 滚动高亮当前板块 ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navAnchors = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window) {
    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navAnchors.forEach(function (link) {
            var active = link.getAttribute("href") === "#" + entry.target.id;
            link.classList.toggle("is-active", active);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (section) {
      spyObserver.observe(section);
    });
  }

  /* ---------- 回到顶部 ---------- */
  backTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 页脚年份 ---------- */
  document.getElementById("year").textContent = String(new Date().getFullYear());
})();
