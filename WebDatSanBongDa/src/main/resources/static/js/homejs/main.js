// Navigation Functions
// function openLogin() {
//     alert('Tính năng đăng nhập sẽ được triển khai sớm. Hiện tại, bạn có thể duyệt và đặt sân!');
// }

function goToVenue(venueId) {
    sessionStorage.setItem('selectedVenue', venueId);
    window.location.href = 'venue-detail.html';
}

function goToBooking(venueId) {
    sessionStorage.setItem('selectedVenue', venueId);
    window.location.href = 'booking.html';
}

// Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            alert('Menu di động sẽ được thêm vào trong phiên bản tiếp theo');
        });
    }

    // Set minimum date to today
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        const today = new Date().toISOString().split('T')[0];
        input.min = today;
    });
});

// Search functionality
function handleSearch(event) {
    event.preventDefault();
    const location = document.getElementById('searchLocation').value;
    const date = document.getElementById('searchDate').value;
    
    if (!location || !date) {
        alert('Vui lòng nhập địa điểm và ngày chơi');
        return;
    }
    
    sessionStorage.setItem('searchParams', JSON.stringify({
        location: location,
        date: date
    }));
    
    window.location.href = 'venues.html';
}

// Format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(value);
}

// Smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.venue-card, .stat-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone
function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Store booking data
function saveBookingData(data) {
    sessionStorage.setItem('bookingData', JSON.stringify(data));
}

// Get booking data
function getBookingData() {
    return JSON.parse(sessionStorage.getItem('bookingData') || '{}');
}

// Initialize tooltips
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(el => {
        el.addEventListener('mouseenter', function() {
            const tooltip = this.getAttribute('data-tooltip');
            console.log(tooltip);
        });
    });
}

// Rate venue
function rateVenue(venueId, rating) {
    alert('Cảm ơn bạn đã đánh giá! Rating của bạn: ' + rating + ' sao');
}

// Add to favorites
function addToFavorites(venueId) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(venueId)) {
        favorites.push(venueId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Đã thêm vào yêu thích!');
    } else {
        favorites = favorites.filter(id => id !== venueId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Đã xóa khỏi yêu thích!');
    }
}

// Share venue
function shareVenue(venueName) {
    if (navigator.share) {
        navigator.share({
            title: venueName,
            text: 'Hãy xem sân bóng tuyệt vời này!',
            url: window.location.href
        });
    } else {
        alert('Copy link: ' + window.location.href);
    }
}

// Initialize all on page load
document.addEventListener('DOMContentLoaded', function() {
    initTooltips();
    
    // Add event listeners to all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Validate before submit
            const inputs = this.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Vui lòng điền đầy đủ thông tin bắt buộc');
            }
        });
    });
});

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white ${
        type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' :
        'bg-blue-500'
    }`;
    notification.textContent = message;
    notification.style.zIndex = '9999';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Check auth status
function checkAuthStatus() {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Get current user
function getCurrentUser() {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Logout
function logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('bookingData');
    window.location.href = 'index.html';
}

// Export functions for use in other files
window.openLogin = openLogin;
window.goToVenue = goToVenue;
window.goToBooking = goToBooking;
window.handleSearch = handleSearch;
window.addToFavorites = addToFavorites;
window.shareVenue = shareVenue;
window.showNotification = showNotification;
window.logout = logout;
window.applyPromo = function() {
    // This will be overridden in checkout.html
};
window.completePayment = function() {
    // This will be overridden in checkout.html
};
