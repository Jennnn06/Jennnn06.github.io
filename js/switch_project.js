(() => {
  "use strict";

  function initializePortfolio() {
    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");

    function reflectTheme() {
      const dark = root.dataset.theme === "dark";
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#121c17" : "#f5f5ef");
      if (themeToggle) {
        themeToggle.setAttribute("aria-pressed", String(dark));
        themeToggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      }
    }

    if (root.dataset.theme !== "dark") root.dataset.theme = "light";
    reflectTheme();
    themeToggle?.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      reflectTheme();
      try {
        localStorage.setItem("jen-portfolio-theme", root.dataset.theme);
      } catch {
        // The theme still works when storage is unavailable.
      }
    });

    const phoneTabs = Array.from(document.querySelectorAll("[data-phone-tab]"));
    const phonePanels = Array.from(document.querySelectorAll("[data-phone-panel]"));
    const phoneHistory = [];
    let currentPhoneTab = "home";

    function activatePhoneTab(name, { remember = true, focus = false } = {}) {
      const nextTab = phoneTabs.find((tab) => tab.dataset.phoneTab === name);
      const nextPanel = phonePanels.find((panel) => panel.dataset.phonePanel === name);
      if (!nextTab || !nextPanel) return;

      if (remember && currentPhoneTab !== name) phoneHistory.push(currentPhoneTab);
      currentPhoneTab = name;

      phoneTabs.forEach((tab) => {
        const selected = tab === nextTab;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
      phonePanels.forEach((panel) => {
        panel.hidden = panel !== nextPanel;
      });
      if (focus) nextTab.focus();
    }

    phoneTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activatePhoneTab(tab.dataset.phoneTab));
      tab.addEventListener("keydown", (event) => {
        let nextIndex;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (index + 1) % phoneTabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (index - 1 + phoneTabs.length) % phoneTabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = phoneTabs.length - 1;
        } else {
          return;
        }
        event.preventDefault();
        activatePhoneTab(phoneTabs[nextIndex].dataset.phoneTab, { focus: true });
      });
    });

    document.querySelectorAll("[data-phone-open]").forEach((button) => {
      button.addEventListener("click", () => {
        activatePhoneTab(button.dataset.phoneOpen, { focus: true });
      });
    });

    document.querySelectorAll("[data-phone-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.phoneAction;
        if (action === "back") {
          activatePhoneTab(phoneHistory.pop() || "home", { remember: false, focus: true });
        } else if (action === "home") {
          activatePhoneTab("home", { focus: true });
        } else if (action === "recent" && phoneTabs.length) {
          const currentIndex = phoneTabs.findIndex((tab) => tab.dataset.phoneTab === currentPhoneTab);
          activatePhoneTab(phoneTabs[(currentIndex + 1) % phoneTabs.length].dataset.phoneTab, { focus: true });
        }
      });
    });
    activatePhoneTab("home", { remember: false });

    const phoneTime = document.getElementById("phoneTime");
    const phoneDate = document.getElementById("phoneDate");
    const currentYear = document.getElementById("currentYear");

    function updateClock() {
      const now = new Date();
      if (phoneTime) {
        phoneTime.textContent = now.toLocaleTimeString([], {
          hour: "2-digit", minute: "2-digit", hour12: false,
        });
      }
      if (phoneDate) {
        phoneDate.textContent = now.toLocaleDateString(undefined, {
          weekday: "short", month: "short", day: "numeric",
        });
      }
      if (currentYear) currentYear.textContent = String(now.getFullYear());
    }
    updateClock();
    if (phoneTime || phoneDate) window.setInterval(updateClock, 30000);

    const filterButtons = Array.from(document.querySelectorAll("[data-project-filter]"));
    const projectCards = Array.from(document.querySelectorAll("[data-project-card]"));
    const projectCount = document.getElementById("projectCount");

    function filterProjects(category) {
      let count = 0;
      projectCards.forEach((card) => {
        const visible = category === "all" || card.dataset.category === category;
        card.hidden = !visible;
        if (visible) count += 1;
      });
      filterButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.projectFilter === category));
      });
      if (projectCount) {
        projectCount.textContent = `${String(count).padStart(2, "0")} ${count === 1 ? "project" : "projects"}`;
      }
    }
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => filterProjects(button.dataset.projectFilter));
    });
    document.querySelectorAll('a[href="#pos-project"], .phone-text-link[href="#projects"]').forEach((link) => {
      link.addEventListener("click", () => filterProjects("all"));
    });
    if (projectCards.length) filterProjects("all");

    initializeGallery();
    initializeSectionNavigation();
  }

  function initializeGallery() {
    const dialog = document.getElementById("projectDialog");
    const galleryImage = document.getElementById("galleryImage");
    const title = document.getElementById("dialogTitle");
    const description = document.getElementById("dialogDescription");
    const caption = document.getElementById("galleryCaption");
    const count = document.getElementById("galleryCount");
    if (!dialog || !galleryImage || !title || !description || !caption || !count) return;

    const galleries = {
      sales: {
        title: "Sales Pro — Android Point of Sale",
        description: "My latest major company project: an Android point-of-sale system connecting checkout, payments, inventory, product management, and operational reporting.",
        images: [
          { file: "images/project_sales_pro/Screenshot_20261108-171141.png", caption: "Point-of-sale checkout with product browsing and cart" },
          { file: "images/project_sales_pro/Screenshot_20261108-171253.png", caption: "Payment details with cash tender, totals, and change" },
          { file: "images/project_sales_pro/Screenshot_20261108-171257.png", caption: "Sales invoice preview after finalizing a transaction" },
          { file: "images/project_sales_pro/Screenshot_20261108-171147.png", caption: "Inventory tools for physical counts and stock movements" },
          { file: "images/project_sales_pro/Screenshot_20261108-171157.png", caption: "Physical inventory form with product quantity reconciliation" },
          { file: "images/project_sales_pro/Screenshot_20261108-171207.png", caption: "Product, combo, category, and supplier management" },
          { file: "images/project_sales_pro/Screenshot_20261108-171217.png", caption: "Sales, inventory, user logs, and end-of-day reporting" },
          { file: "images/project_sales_pro/Screenshot_20261108-171314.png", caption: "UI, store, and Bluetooth or Wi-Fi printer settings" },
          { file: "images/project_sales_pro/Screenshot_20261108-171308.png", caption: "Cloud setup with server, branch, and cloud ID fields" },
          { file: "images/project_sales_pro/Screenshot_20261108-171110.png", caption: "Sales Pro Beta login and sync screen" },
          { file: "images/project_sales_pro/Screenshot_20261108-171351.png", caption: "Point-of-sale screen after voiding a transaction" },
          { file: "images/project_sales_pro/Screenshot_20261108-171215.png", caption: "Reports menu with cashier and terminal operations" },
        ],
      },
      noli: {
        title: "Noli Me Tangere: Ibarra’s Quest",
        description: "A 2D educational capstone game that brings José Rizal’s novel to life through animated chapters, roleplay, and quizzes.",
        images: Array.from({ length: 6 }, (_, index) => ({
          file: `images/project_noli_me/${index + 1}.jpg`,
          caption: `Ibarra’s Quest — screenshot ${index + 1} of 6`,
        })),
      },
      inventory: {
        title: "Web Inventory Management",
        description: "An inventory and personnel management system with mobile integration, ID printing, and check-in and check-out tracking.",
        images: Array.from({ length: 4 }, (_, index) => ({
          file: `images/project_web_inventory/${index + 1}.jpg`,
          caption: `Web Inventory Management — screenshot ${index + 1} of 4`,
        })),
      },
    };

    let gallery;
    let imageIndex = 0;
    let imageRequest = 0;
    let opener;

    function showImage(index) {
      if (!gallery?.images.length) return;
      imageIndex = (index + gallery.images.length) % gallery.images.length;
      const request = ++imageRequest;
      const selectedIndex = imageIndex;
      const selectedGallery = gallery;
      const selectedImage = selectedGallery.images[selectedIndex];
      const preload = new Image();
      galleryImage.setAttribute("aria-busy", "true");

      preload.onload = () => {
        if (request !== imageRequest || !dialog.open) return;
        galleryImage.src = preload.src;
        galleryImage.alt = `${selectedGallery.title} — ${selectedImage.caption}`;
        galleryImage.hidden = false;
        galleryImage.setAttribute("aria-busy", "false");
        caption.textContent = selectedImage.caption;
        count.textContent = `${String(selectedIndex + 1).padStart(2, "0")} / ${String(selectedGallery.images.length).padStart(2, "0")}`;
      };
      preload.onerror = () => {
        if (request !== imageRequest || !dialog.open) return;
        galleryImage.setAttribute("aria-busy", "false");
        caption.textContent = "This screenshot could not load. Try another image using the arrow buttons.";
      };
      preload.src = selectedImage.file;
    }

    document.querySelectorAll("[data-gallery]").forEach((button) => {
      button.addEventListener("click", () => {
        gallery = galleries[button.dataset.gallery];
        if (!gallery?.images.length) return;
        opener = button;
        title.textContent = gallery.title;
        description.textContent = gallery.description;
        galleryImage.hidden = true;
        galleryImage.removeAttribute("src");
        caption.textContent = "Loading screenshot…";
        count.textContent = `01 / ${String(gallery.images.length).padStart(2, "0")}`;
        if (!dialog.open) dialog.showModal();
        showImage(0);
      });
    });

    document.getElementById("galleryPrevious")?.addEventListener("click", () => showImage(imageIndex - 1));
    document.getElementById("galleryNext")?.addEventListener("click", () => showImage(imageIndex + 1));
    document.getElementById("closeGallery")?.addEventListener("click", () => dialog.close());

    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener("keydown", (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        showImage(imageIndex + (event.key === "ArrowRight" ? 1 : -1));
      }
    });
    dialog.addEventListener("close", () => {
      imageRequest += 1;
      opener?.focus();
    });
  }

  function initializeSectionNavigation() {
    if (!("IntersectionObserver" in window)) return;
    const links = Array.from(document.querySelectorAll("[data-section-link]"));
    const sections = links.map((link) => {
      const href = link.getAttribute("href");
      return href?.startsWith("#") ? document.getElementById(href.slice(1)) : null;
    }).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      const activeEntry = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
      if (!activeEntry) return;
      links.forEach((link) => {
        if (link.getAttribute("href") === `#${activeEntry.target.id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }, { rootMargin: "-10% 0px -60% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePortfolio, { once: true });
  } else {
    initializePortfolio();
  }
})();
