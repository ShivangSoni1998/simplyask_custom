/* simplyask_custom/public/js/user_list.js */

frappe.listview_settings['User'] = {
    add_fields: ['user_image', 'full_name'],

    onload: function(listview) {
        // Clear standard formatter to avoid conflicts
        if (listview.settings.formatters) {
            delete listview.settings.formatters['full_name'];
        }
    },

    refresh: function(listview) {
        console.log("SimplyAsk: User List Refreshed");
        renderUserAvatars(listview);
    }
};

function renderUserAvatars(listview) {
    // 1. Loop through every row currently visible in the DOM
    listview.$result.find('.list-row').each(function() {
        var $row = $(this);
        
        // 2. Find the link using the classes from your HTML code
        // Structure: .list-subject -> span.bold -> a
        var $link = $row.find('.list-subject .level-item.bold a');

        // Safety check: Did we find the link?
        if ($link.length === 0) return;

        // 3. Get the ID from the link itself (most reliable method)
        var docName = $link.attr('data-name');
        
        // 4. Find the data object for this row
        var doc = listview.data.find(d => d.name === docName);
        if (!doc) return;

        // 5. Check if we already injected the avatar (prevent duplicates)
        if ($link.find('.custom-avatar').length > 0) return;

        // 6. THE FIX: Force the link to be a Flex container
        // This overrides the 'ellipsis' class that was hiding your image
        $link.css({
            'display': 'inline-flex',
            'align-items': 'center',
            'overflow': 'visible',
            'max-width': '100%',
            'vertical-align': 'middle'
        });

        // 7. Generate the HTML
        var avatarHtml = "";
        if (doc.user_image) {
            // Real Image
            avatarHtml = `
                <img src="${doc.user_image}" class="custom-avatar" style="
                    width: 24px; 
                    height: 24px; 
                    border-radius: 50%; 
                    margin-right: 8px; 
                    object-fit: cover; 
                    flex-shrink: 0;
                    border: 1px solid #e2e2e2;
                ">`;
        } else {
            // Initials Fallback
            var initials = frappe.get_abbr(doc.full_name || doc.name) || "U";
            avatarHtml = `
                <span class="custom-avatar" style="
                    width: 24px; 
                    height: 24px; 
                    border-radius: 50%; 
                    background: #ff9205; 
                    color: white; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-size: 10px; 
                    font-weight: 600; 
                    margin-right: 8px; 
                    flex-shrink: 0;
                ">
                    ${initials}
                </span>`;
        }

        // 8. Inject it INSIDE the link, before the text "John"
        $link.prepend(avatarHtml);
    });
}