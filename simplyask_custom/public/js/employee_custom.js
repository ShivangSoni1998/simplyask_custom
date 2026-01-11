frappe.ui.form.on('Employee', {
    refresh: function(frm) {
        // 1. Add a custom class to this specific form wrapper
        // This acts as a "Scope" so we don't accidentally hide sidebars on other pages
        frm.page.wrapper.addClass('custom-full-width');

        // 2. Inject CSS rules specifically for this scope
        // We check if the style already exists to prevent duplicates
        if (!document.getElementById('custom-employee-css')) {
            $('<style id="custom-employee-css">')
                .prop('type', 'text/css')
                .html(`
                    /* 1. Hide Sidebar completely */
                    .custom-full-width .layout-side-section {
                        display: none !important;
                    }

                    /* 2. Hide the Toggle Button/Icon */
                    .custom-full-width .sidebar-toggle-btn {
                        display: none !important;
                    }
                    
                    /* 2. Force Main Section to take 100% width */
                    .custom-full-width .layout-main-section-wrapper {
                        flex: 0 0 100% !important;
                        max-width: 100% !important;
                        width: 100% !important;
                        padding-left: 0 !important; /* Remove gap left behind */
                    }
                    
                    /* 3. Hide Footer (Timeline/Activity) */
                    .custom-full-width .form-footer {
                        display: none !important;
                    }
                `)
                .appendTo('head');
        }
    }
});