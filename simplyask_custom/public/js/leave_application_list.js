/* simplyask_custom/public/js/leave_application_list.js */

frappe.listview_settings['Leave Application'] = {
    add_fields: ['employee_name', 'employee'],

    onload: function(listview) {
        // Clear default formatter if any
        if (listview.settings.formatters) {
            delete listview.settings.formatters['employee_name'];
        }
    },

    refresh: function(listview) {
        renderLeaveAvatars(listview);
    }
};

function renderLeaveAvatars(listview) {
    listview.$result.find('.list-row').each(function() {
        var $row = $(this);
        
        // Target the link (usually the Employee Name in Leave App list)
        var $link = $row.find('.list-subject .level-item.bold a');
        if ($link.length === 0) return;

        var docName = $link.attr('data-name');
        var doc = listview.data.find(d => d.name === docName);
        if (!doc) return;

        if ($link.find('.custom-avatar').length > 0) return;

        // Force Flexbox
        $link.css({
            'display': 'inline-flex',
            'align-items': 'center',
            'overflow': 'visible',
            'max-width': '100%',
            'vertical-align': 'middle'
        });

        // Use Initials for Leave App (Stable & Fast)
        // We prioritize employee_name, fallback to employee ID
        var nameToUse = doc.employee_name || doc.employee || "L";
        var initials = frappe.get_abbr(nameToUse);
        
        var avatarHtml = `
            <span class="custom-avatar" style="
                width: 24px; height: 24px; border-radius: 50%; background: #ff9205; 
                color: white; display: flex; align-items: center; justify-content: center; 
                font-size: 10px; font-weight: 600; margin-right: 8px; flex-shrink: 0;
            ">
                ${initials}
            </span>`;

        $link.prepend(avatarHtml);
    });
}