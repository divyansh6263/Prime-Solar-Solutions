// Prime Solar Solution - Application Logic

// 1. MOCK DATA DEFINITIONS (Default database state)
const DEFAULT_SETTINGS = {
    brandName: "Prime Solar Solution",
    email: "divyansh62soni@gmail.com",
    phone: "+91 82239 13807",
    address: "102 Solar Arcade, Green Energy Park, India",
    heroTitle: "Empower Your Home with Clean Solar Energy",
    heroSubtitle: "Cut your electricity bills, reduce your carbon footprint, and secure energy independence with India's most trusted solar installer.",
    heroBg: "assets/hero_solar_panels.png"
};

// Authentication Configuration
const AUTHORIZED_EMAILS = ["jalajgupta550@gmail.com", "divyansh62soni@gmail.com"];
const PORTAL_PASSWORD = "Divyansh@primesolarsolutions";

class AuthManager {
    static isLoggedIn() {
        return sessionStorage.getItem("prime_solar_authenticated") === "true";
    }

    static login(email, password) {
        if (!AUTHORIZED_EMAILS.includes(email.toLowerCase())) {
            return { success: false, message: "Access Denied: Email is not authorized." };
        }
        if (password !== PORTAL_PASSWORD) {
            return { success: false, message: "Access Denied: Incorrect password." };
        }
        sessionStorage.setItem("prime_solar_authenticated", "true");
        sessionStorage.setItem("prime_solar_user", email);
        return { success: true };
    }

    static loginWithGoogle(email) {
        if (!AUTHORIZED_EMAILS.includes(email.toLowerCase())) {
            return { success: false, message: "Access Denied: Account email is not authorized for staff access." };
        }
        sessionStorage.setItem("prime_solar_authenticated", "true");
        sessionStorage.setItem("prime_solar_user", email);
        return { success: true };
    }

    static logout() {
        sessionStorage.removeItem("prime_solar_authenticated");
        sessionStorage.removeItem("prime_solar_user");
        window.location.hash = "#/";
        window.location.reload();
    }
}

const DEFAULT_PRODUCTS = [
    {
        id: "prod-1",
        title: "Prime-Shield Monocrystalline Panel",
        efficiency: "22.8% Cell Efficiency",
        price: "₹45,000 / kW",
        desc: "Sleek all-black monocrystalline solar module. Engineered for maximum output under low-light or diffuse daylight conditions. Built-in bypass diodes reduce shading losses.",
        image: "assets/monocrystalline_panel.png",
        category: "Solar Modules"
    },
    {
        id: "prod-2",
        title: "Eco-Grid Polycrystalline Panel",
        efficiency: "18.6% Cell Efficiency",
        price: "₹36,000 / kW",
        desc: "Cost-effective and highly durable solar panels tailored for severe climate resistance. Features a robust anodized aluminum alloy frame.",
        image: "",
        category: "Solar Modules"
    },
    {
        id: "prod-3",
        title: "Opti-Flow Smart Inverter",
        efficiency: "98.2% Conversion Rating",
        price: "₹28,500",
        desc: "Next-gen grid-tied utility inverter with dynamic dual MPPT tracker channels. Offers integrated Wi-Fi for real-time mobile app telemetry.",
        image: "",
        category: "Inverters"
    },
    {
        id: "prod-4",
        title: "SolStor-10 Lithium-Ion Battery",
        efficiency: "10 kWh Storage Capacity",
        price: "₹1,85,000",
        desc: "Sleek wall-mounted residential battery storage system. Features intelligent battery management system (BMS) for reliable night-time emergency backup.",
        image: "",
        category: "Batteries"
    }
];

const DEFAULT_GALLERY = [
    {
        id: "gal-1",
        title: "Residential Rooftop Setup",
        desc: "5kW Monocrystalline grid installation in Indore.",
        image: "assets/hero_solar_panels.png"
    },
    {
        id: "gal-2",
        title: "Commercial Warehouse Array",
        desc: "45kW high-load system supporting cooling grids.",
        image: "assets/monocrystalline_panel.png"
    },
    {
        id: "gal-3",
        title: "Solar Agriculture Pump",
        desc: "7.5HP water-lift array powering drip farming.",
        image: "assets/hero_solar_panels.png"
    }
];

// Fallback visual SVG representing products that have no uploaded images
const PRODUCT_PLACEHOLDER_SVG = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='100%25' height='100%25' fill='%230f172a'/%3E%3Cg transform='translate(150, 100)' fill='%23f59e0b'%3E%3Cpath d='M50 0 L100 30 L50 60 L0 30 Z' opacity='0.8'/%3E%3Cpath d='M50 20 L100 50 L50 80 L0 50 Z' opacity='0.6'/%3E%3Cpath d='M50 40 L100 70 L50 100 L0 70 Z' opacity='0.4'/%3E%3C/g%3E%3Ctext x='50%25' y='80%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='16'%3ESolar Equipment%3C/text%3E%3C/svg%3E`;

// 2. STATE MANAGER
class Database {
    static getSettings() {
        const data = localStorage.getItem("prime_solar_settings");
        return data ? JSON.parse(data) : DEFAULT_SETTINGS;
    }
    
    static saveSettings(settings) {
        localStorage.setItem("prime_solar_settings", JSON.stringify(settings));
    }

    static getProducts() {
        const data = localStorage.getItem("prime_solar_products");
        return data ? JSON.parse(data) : DEFAULT_PRODUCTS;
    }

    static saveProducts(products) {
        localStorage.setItem("prime_solar_products", JSON.stringify(products));
    }

    static getGallery() {
        const data = localStorage.getItem("prime_solar_gallery");
        return data ? JSON.parse(data) : DEFAULT_GALLERY;
    }

    static saveGallery(gallery) {
        localStorage.setItem("prime_solar_gallery", JSON.stringify(gallery));
    }

    static getLeads() {
        const data = localStorage.getItem("prime_solar_leads");
        return data ? JSON.parse(data) : [];
    }

    static saveLeads(leads) {
        localStorage.setItem("prime_solar_leads", JSON.stringify(leads));
    }

    static restoreDefaults() {
        localStorage.removeItem("prime_solar_settings");
        localStorage.removeItem("prime_solar_products");
        localStorage.removeItem("prime_solar_gallery");
        // We keep leads as they are user submissions, but we can clear them too if requested.
        alert("Settings and Catalog restored to original design defaults!");
        window.location.reload();
    }
}

// 3. CORE APPLICATION INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    // Check local storage configuration
    if (!localStorage.getItem("prime_solar_settings")) {
        Database.saveSettings(DEFAULT_SETTINGS);
    }
    if (!localStorage.getItem("prime_solar_products")) {
        Database.saveProducts(DEFAULT_PRODUCTS);
    }
    if (!localStorage.getItem("prime_solar_gallery")) {
        Database.saveGallery(DEFAULT_GALLERY);
    }

    // Self-healing check for brand name updates
    let settings = Database.getSettings();
    if (settings.brandName === "Prime Solar") {
        settings.brandName = "Prime Solar Solution";
        Database.saveSettings(settings);
    }

    initTheme();
    initRouter();
    initMobileNav();
    initCalculator();
    initScrollAnimations();
    initScrollSpy();
    initContactForm();
    initAdminPortal();

    // Render landing page
    renderPublicSite();
});

// 4. ROUTER CONTROLLER (SPA Navigation)
function initRouter() {
    const handleRoute = () => {
        const hash = window.location.hash || "#/";
        const publicView = document.getElementById("public-view");
        const adminView = document.getElementById("admin-view");
        const header = document.querySelector(".main-header");
        const footer = document.querySelector(".main-footer");
        const navLinks = document.querySelectorAll(".nav-link");

        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove("active"));

        if (hash.startsWith("#/admin")) {
            // Show Admin View wrapper
            publicView.classList.add("hidden");
            adminView.classList.remove("hidden");
            footer.classList.add("hidden"); // Hide footer on admin page

            if (!AuthManager.isLoggedIn()) {
                // Show Auth Login view, Hide Workspace
                document.getElementById("admin-auth-container").classList.remove("hidden");
                document.getElementById("admin-workspace-container").classList.add("hidden");
                
                // Remove active classes
                navLinks.forEach(link => link.classList.remove("active"));
                const adminNavLink = document.getElementById("admin-nav-link");
                if (adminNavLink) adminNavLink.classList.remove("active");
            } else {
                // Hide Auth Login, Show Workspace
                document.getElementById("admin-auth-container").classList.add("hidden");
                document.getElementById("admin-workspace-container").classList.remove("hidden");

                // Set active tab to general settings initially
                switchAdminTab("settings");
                // Scroll to top
                window.scrollTo({ top: 0 });
                renderAdminPanel();
                
                // Mark Admin link as active and ensure visible
                const adminLink = document.getElementById("admin-nav-link");
                if (adminLink) {
                    adminLink.classList.add("active");
                    adminLink.classList.remove("hidden");
                }
            }
        } else {
            // Show Public View
            adminView.classList.add("hidden");
            publicView.classList.remove("hidden");
            footer.classList.remove("hidden"); // Show footer on public pages
            
            // Map sub-hashes to active state links
            if (hash.startsWith("#calculator")) {
                document.querySelector('[data-section="calculator"]').classList.add("active");
            } else if (hash.startsWith("#flow")) {
                document.querySelector('[data-section="flow"]').classList.add("active");
            } else if (hash.startsWith("#products")) {
                document.querySelector('[data-section="products"]').classList.add("active");
            } else if (hash.startsWith("#contact")) {
                document.querySelector('[data-section="contact"]').classList.add("active");
            } else {
                document.querySelector('[data-section="home"]').classList.add("active");
            }
            renderPublicSite();
        }
    };

    window.addEventListener("hashchange", handleRoute);
    window.addEventListener("load", handleRoute);

    // Simple smooth routing for landing page links
    document.querySelectorAll(".nav-link:not(.admin-btn)").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            if (href.startsWith("#") && href !== "#/") {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const offsetPosition = targetElement.offsetTop - 80; // height of fixed header
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                    // Set hash without jump
                    history.pushState(null, null, href);
                    // Update active nav-link
                    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
                    this.classList.add("active");
                }
            }
        });
    });
}

// 5. LIGHT / DARK THEME TOGGLE
function initTheme() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;
    
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("prime_solar_theme") || "light";
    if (savedTheme === "light") {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
    } else {
        body.classList.add("dark-theme");
        body.classList.remove("light-theme");
    }

    themeToggleBtn.addEventListener("click", () => {
        if (body.classList.contains("dark-theme")) {
            body.classList.remove("dark-theme");
            body.classList.add("light-theme");
            localStorage.setItem("prime_solar_theme", "light");
        } else {
            body.classList.remove("light-theme");
            body.classList.add("dark-theme");
            localStorage.setItem("prime_solar_theme", "dark");
        }
    });
}

// 6. MOBILE HEADER BURGER MENU
function initMobileNav() {
    const toggleBtn = document.getElementById("mobile-nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    toggleBtn.addEventListener("click", () => {
        toggleBtn.classList.toggle("open");
        navMenu.classList.toggle("open");
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            toggleBtn.classList.remove("open");
            navMenu.classList.remove("open");
        });
    });
}

// 7. INTERACTIVE SOLAR ENERGY CALCULATOR
function initCalculator() {
    const currencySelect = document.getElementById("currency-select");
    const billInput = document.getElementById("bill-input");
    const areaInput = document.getElementById("area-input");
    const sunHours = document.getElementById("sun-hours");

    const billValDisplay = document.getElementById("bill-val-display");
    const areaValDisplay = document.getElementById("area-val-display");

    // Recalculate outputs
    const updateCalculator = () => {
        const currency = currencySelect.value;
        const bill = parseFloat(billInput.value);
        const area = parseFloat(areaInput.value);
        const dailySunHours = parseFloat(sunHours.value);

        // UI Slider value display updates
        const symbol = currency === "INR" ? "₹" : "$";
        billValDisplay.textContent = `${symbol}${bill.toLocaleString(currency === "INR" ? "en-IN" : "en-US")}`;
        areaValDisplay.textContent = `${area} sq. ft.`;

        // Mathematical Solar Algorithms
        // Assumptions:
        // Average unit price: INR = ₹8/kWh, USD = $0.15/kWh
        const kwhPrice = currency === "INR" ? 8 : 0.15;
        const monthlyKwh = bill / kwhPrice;
        
        // Solar system sizing formula: (Monthly kWh / 30 days) / (Sun Hours * efficiency factor (approx 75% system yield))
        let recommendedSizekW = (monthlyKwh / 30) / (dailySunHours * 0.75);
        recommendedSizekW = Math.round(recommendedSizekW * 10) / 10; // Round to 1 decimal

        // Minimum system threshold
        if (recommendedSizekW < 1) recommendedSizekW = 1.0;

        // Space limit: A typical 1 kW system requires about 80-100 sq. ft. of roof space
        const maximumSpacekW = Math.floor(area / 90);
        let optimalSizekW = recommendedSizekW;
        let warningText = "";

        if (optimalSizekW > maximumSpacekW) {
            optimalSizekW = maximumSpacekW > 0 ? maximumSpacekW : 1;
        }

        // Panel calculation: standard panel is 330W (0.33 kW)
        const panelCount = Math.ceil(optimalSizekW / 0.33);

        // Savings: Solar offset is ~85% of monthly bill if size is sufficient
        const savingsFactor = optimalSizekW >= recommendedSizekW ? 0.88 : (optimalSizekW / recommendedSizekW) * 0.88;
        const monthlySavings = Math.round(bill * savingsFactor);
        const lifetimeSavings = monthlySavings * 12 * 25; // 25 year warranty span

        // Carbon Footprint Offset: 1 kW solar generates ~1,200 kWh clean power/year.
        // Each kWh offsets ~0.85 kg (0.00085 tons) of coal grid CO2.
        // Annual CO2 Saved = optimalSizekW * 1.2 metric tons of CO2.
        const annualCo2Saved = Math.round((optimalSizekW * 1.2) * 10) / 10;

        // Tree Equivalent: 1 mature tree absorbs ~22 kg (0.022 tons) of CO2/year.
        // Trees Equivalent = Annual CO2 Saved (kg) / 22
        const treesEquivalent = Math.round((annualCo2Saved * 1000) / 22);

        // Render Outputs in DOM
        document.getElementById("res-system-size").textContent = `${optimalSizekW.toFixed(1)} kW`;
        document.getElementById("res-panel-count").textContent = `${panelCount} Panels`;
        document.getElementById("res-monthly-savings").textContent = `${symbol}${monthlySavings.toLocaleString()}`;
        document.getElementById("res-lifetime-savings").textContent = `${symbol}${lifetimeSavings.toLocaleString()}`;
        document.getElementById("res-co2-saved").textContent = `${annualCo2Saved.toFixed(1)} Tons`;
        document.getElementById("res-trees-equivalent").textContent = `${treesEquivalent} Trees`;
    };

    // Attach Event Listeners
    billInput.addEventListener("input", updateCalculator);
    areaInput.addEventListener("input", updateCalculator);
    currencySelect.addEventListener("change", () => {
        // Adjust slider bounds for currency scale difference
        if (currencySelect.value === "USD") {
            billInput.min = "20";
            billInput.max = "1000";
            billInput.step = "10";
            billInput.value = "150";
        } else {
            billInput.min = "1000";
            billInput.max = "50000";
            billInput.step = "500";
            billInput.value = "5000";
        }
        updateCalculator();
    });
    sunHours.addEventListener("change", updateCalculator);

    // Initial Trigger
    updateCalculator();
}

// 8. SCROLL ANIMATION SYSTEM (Intersection Observer)
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.12 // Trigger when 12% of element enters viewport
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // Stop observing once animated in
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(elem => {
        scrollObserver.observe(elem);
    });

    // Special trigger for the flow section diagram to trigger paths glowing
    const flowSection = document.getElementById("flow");
    if (flowSection) {
        const flowObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelector(".energy-flow-container").classList.add("visible");
                }
            });
        }, { threshold: 0.2 });
        flowObserver.observe(flowSection);
    }
}

// 8b. SCROLL SPY FOR NAVIGATION HIGHLIGHT
function initScrollSpy() {
    const sections = [
        { id: "hero", nav: "home" },
        { id: "calculator", nav: "calculator" },
        { id: "flow", nav: "flow" },
        { id: "products", nav: "products" },
        { id: "contact", nav: "contact" }
    ];

    window.addEventListener("scroll", () => {
        // If we are currently on the admin page, do not spy
        if (window.location.hash.startsWith("#/admin")) return;

        let currentSection = "home";
        const scrollPosition = window.scrollY + 200; // Offset for header height

        sections.forEach(section => {
            const el = document.getElementById(section.id);
            if (el) {
                const top = el.offsetTop;
                const height = el.offsetHeight;
                if (scrollPosition >= top && scrollPosition < top + height) {
                    currentSection = section.nav;
                }
            }
        });

        // If at the bottom, select contact
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
            currentSection = "contact";
        }

        // Update active class on nav links
        const navLinks = document.querySelectorAll(".nav-menu .nav-link");
        navLinks.forEach(link => {
            if (link.getAttribute("data-section") === currentSection) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    });
}

// 9. PUBLIC LEAD FORM INTAKE
function initContactForm() {
    const contactForm = document.getElementById("public-contact-form");
    const successMsg = document.getElementById("form-success-msg");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Extract values
            const name = document.getElementById("form-name").value;
            const phone = document.getElementById("form-phone").value;
            const email = document.getElementById("form-email").value;
            const message = document.getElementById("form-message").value;
            const timestamp = new Date().toLocaleString();

            const newLead = { name, phone, email, message, timestamp };

            // Save to LocalStorage DB
            const leads = Database.getLeads();
            leads.unshift(newLead); // Add to beginning of array
            Database.saveLeads(leads);

            // Display success UI state
            contactForm.reset();
            successMsg.classList.remove("hidden");
            
            setTimeout(() => {
                successMsg.classList.add("hidden");
            }, 6000);
        });
    }
}

// 10. PUBLIC SITE RENDER ENGINE
function renderPublicSite() {
    const settings = Database.getSettings();
    const products = Database.getProducts();
    const gallery = Database.getGallery();

    // Toggle header admin panel nav link visibility based on login state
    const adminNavLink = document.getElementById("admin-nav-link");
    if (adminNavLink) {
        if (AuthManager.isLoggedIn()) {
            adminNavLink.classList.remove("hidden");
        } else {
            adminNavLink.classList.add("hidden");
        }
    }

    // 1. Text & Config updates
    document.title = `${settings.brandName} | Clean & Renewable Energy Systems`;
    document.getElementById("nav-brand-name").textContent = settings.brandName;
    document.getElementById("footer-brand-name").textContent = settings.brandName;
    document.getElementById("footer-copyright-name").textContent = settings.brandName;

    // Contact Information details
    document.getElementById("contact-email-val").textContent = settings.email;
    document.getElementById("contact-email-val").href = `mailto:${settings.email}`;
    document.getElementById("footer-email-val").textContent = settings.email;
    document.getElementById("footer-email-val").href = `mailto:${settings.email}`;

    document.getElementById("contact-phone-val").textContent = settings.phone;
    document.getElementById("contact-phone-val").href = `tel:${settings.phone.replace(/\s+/g, '')}`;
    document.getElementById("footer-phone-val").textContent = settings.phone;
    document.getElementById("footer-phone-val").href = `tel:${settings.phone.replace(/\s+/g, '')}`;

    document.getElementById("contact-address-val").textContent = settings.address;
    document.getElementById("footer-address-val").textContent = settings.address;

    // Hero Text contents
    document.getElementById("hero-title").textContent = settings.heroTitle;
    document.getElementById("hero-subtitle").textContent = settings.heroSubtitle;
    
    // Hero Background image
    const heroBgElem = document.getElementById("hero-bg-elem");
    if (settings.heroBg) {
        heroBgElem.style.backgroundImage = `url('${settings.heroBg}')`;
    }

    // 2. Render Products Grid
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = ""; // Clear existing

    products.forEach(prod => {
        const card = document.createElement("div");
        card.className = "product-card card animate-on-scroll visible"; // Keep visible class to avoid re-triggering issues inside dynamic templates

        const imgSrc = prod.image || PRODUCT_PLACEHOLDER_SVG;

        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${imgSrc}" alt="${prod.title}" class="product-img">
                <span class="product-tag">${prod.category || 'Solar Panel'}</span>
            </div>
            <h3>${prod.title}</h3>
            <p class="product-desc">${prod.desc}</p>
            <div class="product-meta-row">
                <span class="product-efficiency"><i class="fa-solid fa-gauge-high"></i> ${prod.efficiency}</span>
                <span class="product-price">${prod.price}</span>
            </div>
        `;
        productsContainer.appendChild(card);
    });

    // 3. Render Gallery
    const galleryContainer = document.getElementById("gallery-container");
    galleryContainer.innerHTML = "";

    gallery.forEach(item => {
        const col = document.createElement("div");
        col.className = "gallery-item";

        col.innerHTML = `
            <img src="${item.image || PRODUCT_PLACEHOLDER_SVG}" alt="${item.title}">
            <div class="gallery-item-overlay">
                <div class="gallery-info">
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                </div>
            </div>
        `;
        galleryContainer.appendChild(col);
    });
}

// 11. ADMIN PORTAL CONTROLLER
function initAdminPortal() {
    // 1. Authentication Tab Switching
    const tabGoogleBtn = document.getElementById("btn-auth-tab-google");
    const tabPassBtn = document.getElementById("btn-auth-tab-pass");
    const panelGoogle = document.getElementById("auth-panel-google");
    const panelPass = document.getElementById("auth-panel-pass");
    const authErrorMsg = document.getElementById("auth-error-msg");

    tabGoogleBtn.addEventListener("click", () => {
        tabGoogleBtn.classList.add("active");
        tabPassBtn.classList.remove("active");
        panelGoogle.classList.remove("hidden");
        panelPass.classList.add("hidden");
        authErrorMsg.classList.add("hidden");
    });

    tabPassBtn.addEventListener("click", () => {
        tabPassBtn.classList.add("active");
        tabGoogleBtn.classList.remove("active");
        panelPass.classList.remove("hidden");
        panelGoogle.classList.add("hidden");
        authErrorMsg.classList.add("hidden");
    });

    // 2. Mock Google Sign-In Trigger
    const btnGoogleOAuth = document.getElementById("btn-google-oauth");
    const googleOauthPopup = document.getElementById("google-oauth-popup");
    const btnGoogleClose = document.getElementById("btn-google-oauth-close");
    const googleAccountItems = document.querySelectorAll(".google-account-item:not(#google-account-custom)");
    const googleCustomItem = document.getElementById("google-account-custom");
    const googleCustomInputPanel = document.getElementById("google-oauth-custom-input-panel");
    const googleCustomEmailInput = document.getElementById("google-oauth-custom-email");
    const btnGoogleCustomCancel = document.getElementById("btn-google-custom-cancel");
    const btnGoogleCustomSubmit = document.getElementById("btn-google-custom-submit");

    btnGoogleOAuth.addEventListener("click", () => {
        googleOauthPopup.classList.remove("hidden");
        googleCustomInputPanel.classList.add("hidden");
        googleCustomEmailInput.value = "";
    });

    btnGoogleClose.addEventListener("click", () => {
        googleOauthPopup.classList.add("hidden");
    });

    // Handle Google Account selection click
    googleAccountItems.forEach(item => {
        item.addEventListener("click", () => {
            const email = item.getAttribute("data-email");
            const result = AuthManager.loginWithGoogle(email);
            
            googleOauthPopup.classList.add("hidden");

            if (result.success) {
                authErrorMsg.classList.add("hidden");
                // Success: Reload routing to dashboard
                window.location.hash = "#/admin";
                renderPublicSite();
                initRouter();
            } else {
                document.getElementById("auth-error-text").textContent = result.message;
                authErrorMsg.classList.remove("hidden");
            }
        });
    });

    // Custom Google Account toggle
    googleCustomItem.addEventListener("click", () => {
        googleCustomInputPanel.classList.toggle("hidden");
        googleCustomEmailInput.focus();
    });

    btnGoogleCustomCancel.addEventListener("click", () => {
        googleCustomInputPanel.classList.add("hidden");
        googleCustomEmailInput.value = "";
    });

    btnGoogleCustomSubmit.addEventListener("click", () => {
        const email = googleCustomEmailInput.value.trim();
        if (!email) return;

        const result = AuthManager.loginWithGoogle(email);
        googleOauthPopup.classList.add("hidden");

        if (result.success) {
            authErrorMsg.classList.add("hidden");
            window.location.hash = "#/admin";
            renderPublicSite();
            initRouter();
        } else {
            document.getElementById("auth-error-text").textContent = result.message;
            authErrorMsg.classList.remove("hidden");
        }
    });

    // 3. Password Submit Sign-In Form Handler
    const passwordLoginForm = document.getElementById("admin-password-login-form");
    passwordLoginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value.trim();
        const pass = document.getElementById("login-password").value;

        const result = AuthManager.login(email, pass);

        if (result.success) {
            authErrorMsg.classList.add("hidden");
            passwordLoginForm.reset();
            // Success: Reload routing to dashboard
            window.location.hash = "#/admin";
            renderPublicSite();
            initRouter();
        } else {
            document.getElementById("auth-error-text").textContent = result.message;
            authErrorMsg.classList.remove("hidden");
        }
    });

    // 4. Admin Sidebar Logout Trigger
    document.getElementById("btn-admin-logout").addEventListener("click", () => {
        AuthManager.logout();
    });

    // Sidebar Tab Navigation
    const tabs = document.querySelectorAll(".admin-nav-link");
    tabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            e.preventDefault();
            const tabId = tab.getAttribute("data-tab");
            switchAdminTab(tabId);
        });
    });

    // Restore default buttons
    document.getElementById("btn-restore-defaults").addEventListener("click", () => {
        if (confirm("Are you sure you want to restore the layout, text, and mock product list to default state? This will overwrite your changes.")) {
            Database.restoreDefaults();
        }
    });

    // Settings Submit handler
    const settingsForm = document.getElementById("admin-settings-form");
    const settingsSuccessMsg = document.getElementById("settings-save-success");

    settingsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const settings = {
            brandName: document.getElementById("settings-brand-name").value,
            email: document.getElementById("settings-email").value,
            phone: document.getElementById("settings-phone").value,
            address: document.getElementById("settings-address").value,
            heroTitle: document.getElementById("settings-hero-title").value,
            heroSubtitle: document.getElementById("settings-hero-subtitle").value,
            heroBg: document.getElementById("settings-hero-bg-preview").src // Loaded base64
        };

        Database.saveSettings(settings);
        
        // Show status
        settingsSuccessMsg.classList.remove("hidden");
        setTimeout(() => {
            settingsSuccessMsg.classList.add("hidden");
        }, 4000);

        renderPublicSite();
    });

    // Image Upload Handlers (converts file uploads into base64 strings)
    const fileReader = (file, imgElement, labelElement) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            imgElement.src = e.target.result;
            imgElement.classList.remove("hidden");
        };
        reader.readAsDataURL(file);
        if (labelElement) {
            labelElement.textContent = file.name;
        }
    };

    // Settings Hero Uploader
    document.getElementById("hero-bg-upload").addEventListener("change", function() {
        if (this.files && this.files[0]) {
            fileReader(
                this.files[0], 
                document.getElementById("settings-hero-bg-preview"),
                document.getElementById("hero-file-name")
            );
        }
    });

    // Products Image Uploader
    document.getElementById("prod-image-upload").addEventListener("change", function() {
        if (this.files && this.files[0]) {
            fileReader(
                this.files[0],
                document.getElementById("prod-image-preview"),
                document.getElementById("prod-image-filename")
            );
        }
    });

    // Gallery Uploaders
    document.getElementById("gallery-new-upload").addEventListener("change", function() {
        if (this.files && this.files.length > 0) {
            const files = Array.from(this.files);
            let processed = 0;

            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const gallery = Database.getGallery();
                    const newId = "gal-" + Date.now() + Math.random().toString(36).substr(2, 5);
                    gallery.push({
                        id: newId,
                        title: file.name.split(".")[0].replace(/[_-]/g, " "),
                        desc: "Installed and configured by Prime Solar engineering team.",
                        image: e.target.result
                    });
                    Database.saveGallery(gallery);
                    processed++;

                    if (processed === files.length) {
                        renderAdminGallery();
                        renderPublicSite();
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    });

    // Product form Submit CRUD (Add or Update)
    const productForm = document.getElementById("admin-product-form");
    const productSuccessMsg = document.getElementById("product-save-success");

    productForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const editId = document.getElementById("product-edit-id").value;
        const products = Database.getProducts();

        const title = document.getElementById("prod-title").value;
        const efficiency = document.getElementById("prod-efficiency").value;
        const price = document.getElementById("prod-price").value;
        const desc = document.getElementById("prod-desc").value;
        const previewSrc = document.getElementById("prod-image-preview").src;
        // Check if preview has a valid source (not placeholder or empty)
        const image = previewSrc.startsWith("data:") ? previewSrc : "";

        if (editId) {
            // Update mode
            const index = products.findIndex(p => p.id === editId);
            if (index !== -1) {
                products[index] = {
                    id: editId,
                    title,
                    efficiency,
                    price,
                    desc,
                    image: image || products[index].image, // keep old image if no new upload
                    category: "Equipment"
                };
            }
        } else {
            // Insert mode
            const newProduct = {
                id: "prod-" + Date.now(),
                title,
                efficiency,
                price,
                desc,
                image,
                category: "Equipment"
            };
            products.push(newProduct);
        }

        Database.saveProducts(products);

        // Reset Form
        resetProductForm();

        // Show status
        productSuccessMsg.classList.remove("hidden");
        setTimeout(() => {
            productSuccessMsg.classList.add("hidden");
        }, 4000);

        // Redraw lists
        renderAdminProducts();
        renderPublicSite();
    });

    // Cancel Product Edit
    document.getElementById("btn-cancel-edit-product").addEventListener("click", () => {
        resetProductForm();
    });
}

// Switch Sidebar tabs in admin panel
function switchAdminTab(tabId) {
    const tabs = document.querySelectorAll(".admin-nav-link");
    const sections = document.querySelectorAll(".admin-tab-content");

    tabs.forEach(tab => {
        if (tab.getAttribute("data-tab") === tabId) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    });

    sections.forEach(sec => {
        if (sec.id === `tab-${tabId}`) {
            sec.classList.remove("hidden");
        } else {
            sec.classList.add("hidden");
        }
    });
}

// Load configurations into Admin Fields
function renderAdminPanel() {
    renderAdminSettings();
    renderAdminProducts();
    renderAdminGallery();
    renderAdminLeads();
}

function renderAdminSettings() {
    const settings = Database.getSettings();

    document.getElementById("settings-brand-name").value = settings.brandName;
    document.getElementById("settings-email").value = settings.email;
    document.getElementById("settings-phone").value = settings.phone;
    document.getElementById("settings-address").value = settings.address;
    document.getElementById("settings-hero-title").value = settings.heroTitle;
    document.getElementById("settings-hero-subtitle").value = settings.heroSubtitle;

    const imgPreview = document.getElementById("settings-hero-bg-preview");
    if (settings.heroBg) {
        imgPreview.src = settings.heroBg;
        imgPreview.classList.remove("hidden");
    } else {
        imgPreview.classList.add("hidden");
    }
}

function renderAdminProducts() {
    const products = Database.getProducts();
    const tableBody = document.getElementById("admin-products-table-body");
    tableBody.innerHTML = "";

    products.forEach(p => {
        const row = document.createElement("tr");
        const imgSrc = p.image || PRODUCT_PLACEHOLDER_SVG;

        row.innerHTML = `
            <td><img src="${imgSrc}" class="admin-table-img" alt="${p.title}"></td>
            <td><strong>${p.title}</strong></td>
            <td>${p.efficiency}</td>
            <td>${p.price}</td>
            <td>
                <div class="admin-table-actions">
                    <button class="btn-icon btn-icon-edit" onclick="editProduct('${p.id}')" title="Edit Item"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-icon btn-icon-delete" onclick="deleteProduct('${p.id}')" title="Delete Item"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editProduct(productId) {
    const products = Database.getProducts();
    const p = products.find(prod => prod.id === productId);

    if (p) {
        document.getElementById("product-edit-id").value = p.id;
        document.getElementById("prod-title").value = p.title;
        document.getElementById("prod-efficiency").value = p.efficiency;
        document.getElementById("prod-price").value = p.price;
        document.getElementById("prod-desc").value = p.desc;
        
        // Show cancel button
        document.getElementById("btn-cancel-edit-product").classList.remove("hidden");
        document.getElementById("product-form-title").textContent = "Modify Product";
        document.getElementById("product-form-desc").textContent = `Editing product: ${p.title}. You can overwrite specifications or swap the graphic representation.`;
        document.getElementById("btn-save-product").innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Update Product`;

        const previewImg = document.getElementById("prod-image-preview");
        if (p.image) {
            previewImg.src = p.image;
            previewImg.classList.remove("hidden");
            document.getElementById("prod-image-filename").textContent = "Existing image loaded";
        } else {
            previewImg.classList.add("hidden");
            previewImg.src = "";
            document.getElementById("prod-image-filename").textContent = "No image attached";
        }

        // Scroll to editor card form
        document.querySelector(".product-editor-card").scrollIntoView({ behavior: "smooth" });
    }
}

function deleteProduct(productId) {
    if (confirm("Are you sure you want to remove this product listing from the website catalog?")) {
        let products = Database.getProducts();
        products = products.filter(p => p.id !== productId);
        Database.saveProducts(products);
        
        renderAdminProducts();
        renderPublicSite();
    }
}

function resetProductForm() {
    document.getElementById("admin-product-form").reset();
    document.getElementById("product-edit-id").value = "";
    document.getElementById("btn-cancel-edit-product").classList.add("hidden");
    document.getElementById("product-form-title").textContent = "Add New Product";
    document.getElementById("product-form-desc").textContent = "Provide item characteristics, pricing, efficiency rates, and images to display in the main store listing.";
    document.getElementById("btn-save-product").innerHTML = `<i class="fa-solid fa-circle-plus"></i> Add Product`;
    
    const previewImg = document.getElementById("prod-image-preview");
    previewImg.classList.add("hidden");
    previewImg.src = "";
    document.getElementById("prod-image-filename").textContent = "No file selected";
}

function renderAdminGallery() {
    const gallery = Database.getGallery();
    const grid = document.getElementById("admin-gallery-grid");
    grid.innerHTML = "";

    gallery.forEach(item => {
        const card = document.createElement("div");
        card.className = "gallery-admin-card";

        card.innerHTML = `
            <img src="${item.image || PRODUCT_PLACEHOLDER_SVG}" alt="${item.title}">
            <div class="gallery-admin-delete-overlay">
                <button onclick="deleteGalleryItem('${item.id}')" title="Delete Image"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function deleteGalleryItem(id) {
    if (confirm("Remove this installation project photograph from the portfolio gallery?")) {
        let gallery = Database.getGallery();
        gallery = gallery.filter(item => item.id !== id);
        Database.saveGallery(gallery);

        renderAdminGallery();
        renderPublicSite();
    }
}

function renderAdminLeads() {
    const leads = Database.getLeads();
    const tableBody = document.getElementById("admin-leads-table-body");
    tableBody.innerHTML = "";

    if (leads.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding: 24px; color: var(--text-muted);">No quote requests submitted yet.</td></tr>`;
        return;
    }

    leads.forEach((lead, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><small>${lead.timestamp || 'N/A'}</small></td>
            <td><strong>${lead.name}</strong></td>
            <td><a href="tel:${lead.phone}">${lead.phone}</a></td>
            <td><a href="mailto:${lead.email}">${lead.email}</a></td>
            <td><div style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${lead.message}">${lead.message}</div></td>
            <td>
                <button class="btn-icon btn-icon-delete" onclick="deleteLead(${index})" title="Delete Lead"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteLead(index) {
    if (confirm("Remove this client query log from the database?")) {
        const leads = Database.getLeads();
        leads.splice(index, 1);
        Database.saveLeads(leads);
        
        renderAdminLeads();
    }
}

// Attach functions to global window object so onclick attributes in strings can resolve them
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.deleteGalleryItem = deleteGalleryItem;
window.deleteLead = deleteLead;
