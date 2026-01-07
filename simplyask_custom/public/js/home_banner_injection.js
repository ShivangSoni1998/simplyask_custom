frappe.router.on('change', () => {
    try {
        setup_simplyask_banner();
    } catch (e) {
        console.warn("SimplyAsk Banner Error:", e);
    }
});

$(document).ready(() => {
    try {
        setup_simplyask_banner();
    } catch (e) {
        console.warn("SimplyAsk Banner Error:", e);
    }
});

function setup_simplyask_banner() {
    // 1. Check if we are on the Standard Home Workspace
    // The route is usually ['Workspaces', 'Home'] or just ['home'] depending on version
    let route = frappe.get_route();
    
    // Adjust 'Home' if your workspace is named differently
    let is_home = (route[0] === 'Workspaces' && route[1] === 'Home');

    // 2. Identify the target container
    // .layout-main-section is the standard container for page content
    let $container = $('.layout-main-section');
    
    // 3. LOGIC: 
    if (is_home) {
        // If we are on Home, and banner is missing, Inject it.
        if ($('#simplyask-banner').length === 0) {
            inject_banner_html($container);
        }
    } else {
        // If we are NOT on Home, ensure banner is gone.
        // (Frappe usually clears the DOM on nav, but this is a safety check)
        $('#simplyask-banner').remove();
    }
}

function inject_banner_html($container) {
    const banner_html = `
    <div id="simplyask-banner" class="simplyask-banner">
        <div class="hero-content">
            <h1>Hi <span id="user-first-name">Team Member</span>,</h1>
            <p>Glad you are here.</p>
        </div>
    </div>
    <style>
        .simplyask-banner {
            background-image: url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop'); 
            background-size: cover;
            background-position: center;
            height: 220px; 
            display: flex;
            align-items: center;
            padding-left: 40px;
            border-radius: 8px;
            margin-bottom: 24px;
            position: relative;
            color: white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .simplyask-banner::before {
            content: ""; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.35); border-radius: 8px;
        }
        .hero-content { position: relative; z-index: 2; }
        .hero-content h1 { font-size: 2.2rem; font-weight: 700; margin-bottom: 8px; color: white; }
        .hero-content p { font-size: 1.1rem; opacity: 0.95; color: #f5f5f5; }
    </style>
    `;

    // Prepend adds it to the TOP of the container, before the shortcuts
    $container.prepend(banner_html);

    // Set Name
    let user_fullname = frappe.user.full_name || "Team Member";
    let first_name = user_fullname.split(" ")[0]; 
    $("#user-first-name").text(first_name);
}