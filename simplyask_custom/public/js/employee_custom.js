frappe.ui.form.on('Employee', {
    refresh: function(frm) {
        // 1. Add a unique class to the wrapper so we don't break other pages
        frm.page.wrapper.addClass('custom-employee-layout');

        // 2. Inject CSS rules if they don't exist yet
        if (!document.getElementById('custom-employee-css')) {
            $('<style id="custom-employee-css">')
                .prop('type', 'text/css')
                .html(`
                    /* --- 1. HIDE THE FOOTER (Timeline/Activity) --- */
                    .custom-employee-layout .form-footer {
                        display: none !important;
                    }

                    /* --- 2. HIDE SPECIFIC SIDEBAR SECTIONS --- */
                    /* I picked these class names directly from your screenshot */
                    
                    .custom-employee-layout .form-sidebar .sidebar-rating,       /* The Star Ratings */
                    .custom-employee-layout .form-sidebar .form-assignments,     /* Assigned To */
                    .custom-employee-layout .form-sidebar .form-attachments,     /* Attachments */
                    .custom-employee-layout .form-sidebar .form-tags,            /* Tags */
                    .custom-employee-layout .form-sidebar .form-shared,          /* Shared With */
                    .custom-employee-layout .form-sidebar .followed-by-section,  /* Followers */
                    .custom-employee-layout .form-sidebar .form-sidebar-stats,   /* Created/Modified Stats */
                    .custom-employee-layout .form-sidebar .text-muted {          /* Small text at bottom */
                        display: none !important;
                    }

                    /* --- 3. SAFETY: ENSURE IMAGE STAYS --- */
                    .custom-employee-layout .form-sidebar .sidebar-image-section {
                        display: block !important;
                    }
                `)
                .appendTo('head');
        }
    }
});