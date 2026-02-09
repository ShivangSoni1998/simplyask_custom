frappe.provide('simplyask.calendar');

simplyask.calendar.recolor_events = function() {
    // 1. Loop through every event title in the calendar
    $('.fc-title').each(function() {
        var $title = $(this);
        var text = $title.text().toLowerCase();
        
        // Get the parent event box (the <a> tag)
        var $event = $title.closest('.fc-event');

        // --- A. STAT HOLIDAYS & WEEKENDS (Gray) ---
        if (text.includes('holiday') || text.includes('sunday') || text.includes('saturday')) {
            $event.css({
                'background-color': '#9CA3AF', // Gray
                'border-color':     '#9CA3AF',
                'color':            '#ffffff'
            });
        }
        
        // --- B. SICK LEAVES (Blue) ---
        else if (text.includes('sick')) {
            $event.css({
                'background-color': '#3B82F6', // Blue
                'border-color':     '#3B82F6',
                'color':            '#ffffff'
            });
        }
        
        // --- C. VACATION / PRIVILEGE LEAVES (Red) ---
        else if (text.includes('vacation') || text.includes('privilege')) {
            $event.css({
                'background-color': '#F59E0B', // Red
                'border-color':     '#F59E0B',
                'color':            '#ffffff'
            });
        }
        
        // --- D. LEAVE WITHOUT PAY (Orange/Yellow - Optional) ---
        else if (text.includes('leave without pay') || text.includes('lwp')) {
            $event.css({
                'background-color': '#EF4444', // Orange
                'border-color':     '#EF4444',
                'color':            '#ffffff'
            });
        }
    });
};

// 2. Run this function whenever the DOM changes (e.g. clicking "Next Month")
$(document).ready(function() {
    // Create an observer to watch for calendar updates
    var observer = new MutationObserver(function(mutations) {
        simplyask.calendar.recolor_events();
    });

    // Start observing the body (or specifically .fc-view-container if it exists)
    var target = document.body;
    observer.observe(target, { childList: true, subtree: true });
    
    // Run once on initial load just in case
    setTimeout(simplyask.calendar.recolor_events, 1000);
});