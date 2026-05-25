frappe.router.on('change', () => {
    try {
        setup_simplyask_banner();
        setup_team_updates();
    } catch (e) {
        console.warn("SimplyAsk Home Injection Error:", e);
    }
});

$(document).ready(() => {
    try {
        setup_simplyask_banner();
        setup_team_updates();
    } catch (e) {
        console.warn("SimplyAsk Home Injection Error:", e);
    }
});

function setup_simplyask_banner() {
    // 1. Check if we are on the Standard Home Workspace
    let route = frappe.get_route();
    let is_home = (route[0] === 'Workspaces' && route[1] === 'Home');

    // 2. Identify the target container
    let $container = $('.layout-main-section');

    // 3. LOGIC
    if (is_home) {
        if ($('#simplyask-banner').length === 0) {
            inject_banner_html($container);
        }
    } else {
        $('#simplyask-banner').remove();
    }
}

function setup_team_updates() {
    let route = frappe.get_route();
    let is_home = (route[0] === 'Workspaces' && route[1] === 'Home');

    if (is_home) {
        if ($('#simplyask-team-updates').length === 0) {
            inject_team_updates_html();
        }
    } else {
        $('#simplyask-team-updates').remove();
    }
}

function inject_team_updates_html() {
    // Hardcoded posts for now (UI mock — no real BE wiring).
    // Order: newest first. Each post is data-driven so adding/editing
    // posts is straightforward — just edit this array.
    const posts = [
        {
            author: 'Simplexiar and SimplyAsk Family',
            avatar: 'SA',
            time: 'May 14, 2026, 2:17 PM',
            body: `<p>Happy Victoria Day to our Canadian colleagues! They will be observing this day on Monday May 18th. Enjoy the spring weather!</p>`
        },
        {
            author: 'Simplexiar and SimplyAsk Family',
            avatar: 'SA',
            time: 'Mar 31, 2026, 7:56 PM',
            body: `<p>Good Friday is the best Friday! Our Canadian colleagues will be observing this holiday on April 3rd. Enjoy your time off!</p>`
        },
        {
            author: 'Shuli Gortler',
            avatar: 'SG',
            time: 'Mar 8, 2026, 2:22 PM',
            body: `<p>Happy International Women's Day!</p>
                   <p>Today we celebrate the incredible women on our team and around the world — your talent, leadership, resilience, and the impact you make every day.<br>
                   Thank you for everything you bring to our workplace and community.</p>
                   <span class="see-more">See more...</span>`,
            reactions: { emojis: '👍 🌷 🤩', count: 4 }
        }
    ];

    const card_html = (post) => {
        // Hash-based color per author so each post avatar feels distinct
        const bg = (window.simplyask_avatar_color && window.simplyask_avatar_color(post.author))
            || '#ff9205';
        return `
        <div class="post-card">
            <div class="post-header">
                <div class="post-avatar" style="background:${bg};">${post.avatar}</div>
                <div class="post-meta">
                    <div class="post-author">${post.author}</div>
                    <div class="post-time">${post.time}</div>
                </div>
            </div>
            <div class="post-body">${post.body}</div>
            ${post.reactions ? `
                <div class="post-reactions">
                    <div>
                        <span class="reactions-emojis">${post.reactions.emojis}</span>
                        <span>${post.reactions.count}</span>
                    </div>
                    ${post.reactions.comments ? `<span>${post.reactions.comments} comments</span>` : ''}
                </div>
            ` : ''}
            <div class="post-actions">
                <button class="post-action-btn">
                    <span class="action-icon">😀</span>
                    <span>React</span>
                </button>
                <button class="post-action-btn">
                    <span class="action-icon">💬</span>
                    <span>Comment</span>
                </button>
            </div>
        </div>
    `;
    };

    const team_updates_html = `
        <div id="simplyask-team-updates" class="simplyask-team-updates">
            ${posts.map(card_html).join('')}
        </div>
    `;

    let $banner = $('#simplyask-banner');
    if ($banner.length > 0) {
        $banner.after(team_updates_html);
    } else {
        $('.layout-main-section').prepend(team_updates_html);
    }
}

function inject_banner_html($container) {
    // --- 1. SAFE NAME FETCHING (Fixes your crash) ---
    // We try multiple sources to get the name safely
    let full_name = "Team Member";

    if (frappe.session && frappe.session.user_fullname) {
        full_name = frappe.session.user_fullname;
    } else if (frappe.user && frappe.user.full_name) {
        full_name = frappe.user.full_name;
    }

    // Ensure it is actually a string before splitting
    let first_name = "Team Member";
    if (typeof full_name === 'string') {
        first_name = full_name.split(" ")[0];
    }

    // --- 2. THE HTML (HiBob Style) ---
    const banner_html = `
    <div id="simplyask-banner" class="simplyask-banner">
        <div class="hero-content">
            <h1>Hi ${first_name},</h1>
            <p>glad you're here <span class="wave-hand">👋</span></p>
        </div>
    </div>
    <style>
        /* Import Font if not already loaded */
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');

        .simplyask-banner {
            /* Keep your custom background image */
            background-image: url('/assets/simplyask_custom/images/simplyask_banner.png'); 
            background-size: cover;
            background-position: center;
            height: 220px; 
            display: flex;
            align-items: center;
            padding-left: 50px; /* Slightly more padding like HiBob */
            border-radius: 12px;
            margin-bottom: 24px;
            position: relative;
            color: white;
            font-family: 'Montserrat', sans-serif; /* HiBob Font Match */
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .hero-content { 
            position: relative; 
            z-index: 2; 
        }

        /* The "Hi Name," part */
        .hero-content h1 { 
            font-size: 2.8rem; /* Large and bold */
            font-weight: 700; 
            margin-bottom: 4px; 
            color: white;
            letter-spacing: -0.5px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        /* The "glad you're here" part */
        .hero-content p { 
            font-size: 1.4rem; 
            font-weight: 500;
            opacity: 0.95; 
            color: #ffffff; 
            margin-top: 0;
        }

        /* --- THE WAVING ANIMATION --- */
        .wave-hand {
            display: inline-block;
            animation-name: wave-animation;
            animation-duration: 2.5s;
            animation-iteration-count: infinite; /* Waving forever */
            transform-origin: 70% 70%;
        }

        @keyframes wave-animation {
            0% { transform: rotate( 0.0deg) }
            10% { transform: rotate(14.0deg) } 
            20% { transform: rotate(-8.0deg) }
            30% { transform: rotate(14.0deg) }
            40% { transform: rotate(-4.0deg) }
            50% { transform: rotate(10.0deg) }
            60% { transform: rotate( 0.0deg) }
            100% { transform: rotate( 0.0deg) }
        }
    </style>
    `;

    $container.prepend(banner_html);
}