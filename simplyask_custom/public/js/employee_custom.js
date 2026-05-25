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

                    /* --- 4. HIBOB-STYLE COVER BANNER --- */
                    .simplyask-emp-cover {
                        position: relative;
                        margin: -15px -15px 80px -15px;
                        height: 180px;
                        border-radius: 0 0 16px 16px;
                        overflow: visible;
                    }
                    .simplyask-emp-cover .cover-gradient {
                        position: absolute;
                        inset: 0;
                        border-radius: 0 0 16px 16px;
                    }
                    .simplyask-emp-cover .cover-avatar {
                        position: absolute;
                        left: 32px;
                        bottom: -50px;
                        width: 110px;
                        height: 110px;
                        border-radius: 50%;
                        border: 5px solid #ffffff;
                        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
                        overflow: hidden;
                        background: #fff;
                        z-index: 2;
                    }
                    .simplyask-emp-cover .cover-avatar img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        display: block;
                    }
                    .simplyask-emp-cover .cover-avatar .initials {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #ffffff;
                        font-weight: 700;
                        font-size: 42px;
                        letter-spacing: -1px;
                    }
                    .simplyask-emp-cover .cover-info {
                        position: absolute;
                        left: 160px;
                        bottom: -52px;
                        right: 32px;
                    }
                    .simplyask-emp-cover .cover-name {
                        font-size: 22px;
                        font-weight: 700;
                        color: #1A202C;
                        margin: 0;
                        line-height: 1.2;
                    }
                    .simplyask-emp-cover .cover-title {
                        font-size: 13px;
                        color: #4B5563;
                        margin: 4px 0 0;
                        font-weight: 500;
                    }
                `)
                .appendTo('head');
        }

        // 3. Inject the HiBob-style cover banner (or refresh it on doc reload)
        inject_simplyask_cover(frm);
    }
});

function inject_simplyask_cover(frm) {
    if (!frm || !frm.doc) return;

    let $wrapper = $(frm.layout.wrapper);
    $wrapper.find('.simplyask-emp-cover').remove();

    let name = frm.doc.employee_name || frm.doc.first_name || 'Employee';
    let designation = frm.doc.designation || '';
    let department = frm.doc.department || '';
    let image = frm.doc.image || '';

    let subtitle_parts = [designation, department].filter(Boolean);
    let subtitle = subtitle_parts.join(' · ');

    let gradient = (window.simplyask_avatar_gradient && window.simplyask_avatar_gradient(name))
        || 'linear-gradient(135deg, #FF9205 0%, #FFB347 100%)';
    let solid = (window.simplyask_avatar_color && window.simplyask_avatar_color(name)) || '#FF9205';
    let initials = (window.simplyask_initials && window.simplyask_initials(name)) || 'E';

    let avatar_inner = image
        ? `<img src="${frappe.utils.escape_html(image)}" alt="${frappe.utils.escape_html(name)}" />`
        : `<div class="initials" style="background:${solid};">${initials}</div>`;

    const banner_html = `
        <div class="simplyask-emp-cover">
            <div class="cover-gradient" style="background:${gradient};"></div>
            <div class="cover-avatar">${avatar_inner}</div>
            <div class="cover-info">
                <h2 class="cover-name">${frappe.utils.escape_html(name)}</h2>
                ${subtitle ? `<p class="cover-title">${frappe.utils.escape_html(subtitle)}</p>` : ''}
            </div>
        </div>
    `;

    // Insert at top of the form layout, above the first tab/section
    let $form = $wrapper.find('.form-layout, .form-page').first();
    if ($form.length === 0) return;
    $form.prepend(banner_html);
}