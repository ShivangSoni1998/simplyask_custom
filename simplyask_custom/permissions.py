import frappe
from frappe import _

# 1. VISIBILITY CONTROLLER (Who can SEE the document?)
def employee_has_permission(doc, user=None, permission_type=None):
    user = user or frappe.session.user
    if user == "Administrator":
        return True

    # Allow "Read", "Select", "Print" for EVERYONE (so the list works)
    # We do NOT check "Write" here because we handle it in 'validate' below.
    if permission_type in ["read", "select", "print", "email", "report", "export"]:
        return True 
        
    # Default to standard Frappe role permissions for everything else
    return None

# 2. EDIT CONTROLLER (Who can SAVE the document?)
def prevent_unauthorized_edits(doc, method):
    user = frappe.session.user
    if user == "Administrator":
        return

    # If the user is trying to save a record that is NOT linked to them -> BLOCK IT
    if doc.user_id != user:
        frappe.throw(_("You are not authorized to edit other employees' profiles."))

def hide_sensitive_fields(doc, method):
    # --- DEBUG PRINT ---
    print(f"\n[DEBUG] Hiding Fields? User={frappe.session.user} | Doc Owner={doc.user_id}")

    if frappe.session.user == "Administrator" or doc.user_id == frappe.session.user:
        print("[DEBUG] Showing everything (Admin or Self).")
        return

    print("[DEBUG] Hiding sensitive data...")
    
    # Fields to hide
    sensitive_fields = [
        "bank_name", "bank_ac_no", "iban", 
        "salary_mode", "payroll_cost_center",
        "date_of_birth", "passport_number",
        "ctc", "salary_currency"
    ]

    for field in sensitive_fields:
        if hasattr(doc, field):
            setattr(doc, field, None)