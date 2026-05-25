/* simplyask_custom/public/js/employee_list.js */

frappe.listview_settings['Employee'] = {
    add_fields: ['image', 'employee_name'],

    onload: function(listview) {
        if (listview.settings.formatters) {
            delete listview.settings.formatters['employee_name'];
        }
    },

    refresh: function(listview) {
        renderEmployeeAvatars(listview);
    }
};

function renderEmployeeAvatars(listview) {
    listview.$result.find('.list-row').each(function() {
        var $row = $(this);
        
        // Target the link inside the subject column
        var $link = $row.find('.list-subject .level-item.bold a');
        if ($link.length === 0) return;

        var docName = $link.attr('data-name');
        var doc = listview.data.find(d => d.name === docName);
        if (!doc) return;

        if ($link.find('.custom-avatar').length > 0) return;

        // Force Flexbox Layout
        $link.css({
            'display': 'inline-flex',
            'align-items': 'center',
            'overflow': 'visible',
            'max-width': '100%',
            'vertical-align': 'middle'
        });

        // Generate Avatar (Image or Initials with hash-based color)
        var avatarHtml = "";
        if (doc.image) {
            avatarHtml = `
                <img src="${doc.image}" class="custom-avatar" style="
                    width: 24px; height: 24px; border-radius: 50%; margin-right: 8px;
                    object-fit: cover; flex-shrink: 0; border: 1px solid #e2e2e2;
                ">`;
        } else {
            var displayName = doc.employee_name || doc.name;
            var initials = (window.simplyask_initials && window.simplyask_initials(displayName))
                || frappe.get_abbr(displayName) || "E";
            // Hash-based color: each person gets a stable unique color so the
            // list feels lively (HiBob-style) instead of a wall of orange.
            var bg = (window.simplyask_avatar_color && window.simplyask_avatar_color(displayName))
                || '#ff9205';
            avatarHtml = `
                <span class="custom-avatar" style="
                    width: 24px; height: 24px; border-radius: 50%; background: ${bg};
                    color: white; display: flex; align-items: center; justify-content: center;
                    font-size: 10px; font-weight: 600; margin-right: 8px; flex-shrink: 0;
                ">
                    ${initials}
                </span>`;
        }

        $link.prepend(avatarHtml);
    });
}