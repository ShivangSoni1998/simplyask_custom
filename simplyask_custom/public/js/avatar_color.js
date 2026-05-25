/* simplyask_custom/public/js/avatar_color.js
   Shared utility: deterministic name -> color mapping for avatar
   placeholders. Same name always produces the same color so avatars
   feel stable across page loads (HiBob-style).

   Exposed on window as window.simplyask_avatar_color(name) and as
   window.simplyask_avatar_gradient(name) for cover banners. */

(function () {
    // 10-color HiBob-ish palette: saturated but not harsh, good contrast with white text
    const PALETTE = [
        { bg: '#F472B6', gradient: 'linear-gradient(135deg, #F472B6 0%, #EC4899 100%)' }, // pink
        { bg: '#A78BFA', gradient: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)' }, // purple
        { bg: '#60A5FA', gradient: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)' }, // blue
        { bg: '#34D399', gradient: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)' }, // green
        { bg: '#FBBF24', gradient: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)' }, // amber
        { bg: '#FB923C', gradient: 'linear-gradient(135deg, #FB923C 0%, #F97316 100%)' }, // orange
        { bg: '#F87171', gradient: 'linear-gradient(135deg, #F87171 0%, #EF4444 100%)' }, // red
        { bg: '#22D3EE', gradient: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)' }, // cyan
        { bg: '#C084FC', gradient: 'linear-gradient(135deg, #C084FC 0%, #A855F7 100%)' }, // violet
        { bg: '#FF9205', gradient: 'linear-gradient(135deg, #FF9205 0%, #FFB347 100%)' }, // brand orange
    ];

    function hashName(name) {
        // Simple deterministic hash. Doesn't need to be cryptographic — just
        // stable across page loads for the same input string.
        const s = String(name || '').trim().toLowerCase();
        let h = 0;
        for (let i = 0; i < s.length; i++) {
            h = ((h << 5) - h) + s.charCodeAt(i);
            h |= 0;
        }
        return Math.abs(h);
    }

    window.simplyask_avatar_color = function (name) {
        return PALETTE[hashName(name) % PALETTE.length].bg;
    };

    window.simplyask_avatar_gradient = function (name) {
        return PALETTE[hashName(name) % PALETTE.length].gradient;
    };

    // Initials utility: "Shivang Soni" -> "SS", "Antika" -> "A"
    window.simplyask_initials = function (name) {
        const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
        if (parts.length === 0) return '?';
        if (parts.length === 1) return parts[0][0].toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };
})();
