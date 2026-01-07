// 1. Ensure compatibility (Link Underscore to Dash)
frappe.pages['simplyask-home'] = frappe.pages['simplyask_home'];

frappe.pages['simplyask_home'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Home',
        single_column: true
    });

    // 2. Load the HTML Template
    // Note: If this comes up blank, see "Troubleshooting" below
    $(frappe.render_template("simplyask_home", {})).appendTo(page.main);

    // 3. Load the CSS
    frappe.require('/assets/simplyask_custom/css/simplyask_home.css');

    // 4. Dynamic Logic (With Safety Checks)
    // We get the email of the current user
    let current_user = frappe.session.user;

    if (current_user === 'Guest') {
         page.main.find("#user-first-name").text("Guest");
    } else {
        // Fetch the 'first_name' field from the 'User' table for the current email
        frappe.db.get_value('User', current_user, 'first_name')
        .then(r => {
            let first_name = r.message.first_name;
            
            // If they have a name, show it. Otherwise keep "Team Member"
            if (first_name) {
                page.main.find("#user-first-name").text(first_name);
            }
        });
    }
}