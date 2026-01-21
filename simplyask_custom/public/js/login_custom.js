/* simplyask_custom/public/js/login_custom.js */

frappe.ready(function() {
    // 1. Hide the default header to prevent duplicates
    $('.page-card-head').hide();

    // 2. Inject our Custom Header (Only if it's not there yet)
    if ($('.custom-login-header').length === 0) {
        
        let headerHTML = `
            <div class="custom-login-header">
                <a href="https://simplyask.ai" target="_blank" class="brand-link">
                    SimplyAsk
                </a>
                
                <div class="welcome-text">
                    Welcome back,
                </div>
            </div>
        `;
        
        // Inject it at the very top of the card
        $('.login-content.page-card').prepend(headerHTML);
    }
});