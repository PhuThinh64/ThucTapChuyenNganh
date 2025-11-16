function goToCheckout(e) {
    e.preventDefault();
    // Store booking data in session storage
    const bookingData = {
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        playerCount: document.getElementById('playerCount').value,
        notes: document.getElementById('notes').value
    };
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    window.location.href = 'checkout.html';
}