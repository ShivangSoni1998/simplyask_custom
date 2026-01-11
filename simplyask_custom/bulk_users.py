import frappe
from frappe.utils.password import update_password

def create_real_users():
    print("🚀 Starting Creation of 5 Real Users...")
    
    users_to_create = [
        {"name": "Amit Patel", "email": "amit.patel@example.com"},
        {"name": "Sarah Jenkins", "email": "sarah.jenkins@example.com"},
        {"name": "Rahul Sharma", "email": "rahul.sharma@example.com"},
        {"name": "Emily Wong", "email": "emily.wong@example.com"},
        {"name": "David Miller", "email": "david.miller@example.com"}
    ]

    password = "1234"
    role_to_assign = "System Manager"

    for person in users_to_create:
        email = person["email"]
        first_name = person["name"]

        if frappe.db.exists("User", email):
            print(f"⚠️  Skipping: {first_name} ({email}) - Already exists")
            continue

        try:
            # 1. Create and Insert User
            user = frappe.new_doc("User")
            user.email = email
            user.first_name = first_name
            user.enabled = 1
            user.send_welcome_email = 0
            user.insert(ignore_permissions=True)

            # 2. Set Password (The FIX)
            # We use the utility function instead of the object method
            update_password(user.name, password)

            # 3. Add Roles
            user.add_roles(role_to_assign)

            print(f"✅ Created: {first_name} ({email})")

        except Exception as e:
            print(f"❌ Failed to create {email}: {str(e)}")

    frappe.db.commit()
    print("🎉 Done! All users created with password: " + password)

    # bench --site local.localhost execute simplyask_custom.bulk_users.create_real_users (to execute this command)