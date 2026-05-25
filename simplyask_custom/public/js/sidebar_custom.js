/* simplyask_custom/public/js/sidebar_custom.js */

frappe.router.on('change', () => {
    // Wait a brief moment for the sidebar to render after route change
    setTimeout(() => {
        inject_leave_calendar_link();
        auto_expand_hr();
    }, 200);
});

$(document).ready(() => {
    // Also run on initial full page load
    setTimeout(() => {
        inject_leave_calendar_link();
        auto_expand_hr();
    }, 500);
});

function auto_expand_hr() {
    // The HR parent row is now hidden via CSS and the nested-container
    // is forced visible (block + height auto). This function remains as
    // a defensive fallback in case Frappe re-collapses on route change.
    let $hr = $('.sidebar-item-container[item-name="HR"]').first();
    if ($hr.length === 0) return;

    let $nested = $hr.children('.sidebar-child-item.nested-container').first();
    if ($nested.length === 0) return;

    $nested.removeClass('hidden is-hidden').show();
}

function inject_leave_calendar_link() {
    // 1. Identify the "Leaves" sidebar item using the specific attribute from your HTML
    let $leaves_item = $('.sidebar-item-container[item-name="Leaves"]');

    // 2. Check conditions:
    //    - "Leaves" item exists (we are in HR workspace)
    //    - Our link does NOT exist yet (prevent duplicates)
    if ($leaves_item.length > 0 && $('#sidebar-leave-calendar').length === 0) {
        
        // 3. Define the HTML (Mimicking standard Frappe Sidebar Item)
        let calendar_link_html = `
            <div class="sidebar-item-container" id="sidebar-leave-calendar">
                <div class="desk-sidebar-item standard-sidebar-item">
                    <a href="/app/leave-application/view/calendar/default" class="item-anchor" title="Leave Calendar">
                        <span class="sidebar-item-icon">
                            <svg class="icon icon-md" aria-hidden="true">
                                <use href="#icon-calendar"></use>
                            </svg>
                        </span>
                        <span class="sidebar-item-label">Leave Calendar</span>
                    </a>
                </div>
            </div>
        `;

        // 4. Inject it explicitly AFTER the "Leaves" item
        $leaves_item.after(calendar_link_html);
    }
}