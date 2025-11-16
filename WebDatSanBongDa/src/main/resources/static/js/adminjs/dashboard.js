

document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
});

function loadDashboardData() {
    // Load venue data from localStorage
    const venues = JSON.parse(localStorage.getItem('venues') || '[]');
    document.getElementById('totalVenues').textContent = venues.length || 150;
}

function toggleAdminMenu() {
    const menu = document.getElementById('adminMenu');
    menu.classList.toggle('hidden');
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('adminMenu');
    if (!event.target.closest('button') && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
    }
});
