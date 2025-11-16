// Venue data
const venues = [
    { id: 1, name: "Sân bóng Trung Tâm", location: "Quận 1, TP.HCM", price: 300000, rating: 4.8, reviews: 128, types: ["5v5", "7v7", "11v11"], image: "from-blue-600 to-purple-600" },
    { id: 2, name: "Sân bóng Khu Đô Thị", location: "Quận 2, TP.HCM", price: 350000, rating: 4.9, reviews: 256, types: ["5v5", "7v7", "11v11"], image: "from-pink-500 to-red-500" },
    { id: 3, name: "Sân bóng Công Viên", location: "Quận 7, TP.HCM", price: 280000, rating: 4.7, reviews: 89, types: ["5v5", "7v7"], image: "from-cyan-400 to-blue-500" },
    { id: 4, name: "Sân bóng Thể Thao", location: "Quận 12, TP.HCM", price: 320000, rating: 4.6, reviews: 156, types: ["5v5", "7v7", "11v11"], image: "from-green-400 to-teal-500" },
    { id: 5, name: "Sân bóng Ngôi Sao", location: "Quận 3, TP.HCM", price: 290000, rating: 4.5, reviews: 103, types: ["5v5", "7v7"], image: "from-purple-500 to-pink-500" },
    { id: 6, name: "Sân bóng Vàng", location: "Quận 5, TP.HCM", price: 330000, rating: 4.7, reviews: 178, types: ["5v5", "7v7", "11v11"], image: "from-yellow-400 to-orange-500" },
];

function displayVenues(venuesToDisplay) {
    const venuesList = document.getElementById('venuesList');
    venuesList.innerHTML = '';

    venuesToDisplay.forEach(venue => {
        const venueCard = document.createElement('div');
        venueCard.className = 'group cursor-pointer h-full';
        venueCard.onclick = () => goToVenue(venue.id);
        venueCard.innerHTML = `
                    <div class="mb-4 overflow-hidden rounded-xl">
                        <div class="h-48 bg-gradient-to-br ${venue.image} group-hover:scale-105 transition duration-300"></div>
                    </div>
                    <h3 class="font-bold text-lg text-gray-900 mb-1">${venue.name}</h3>
                    <div class="flex items-center gap-1 text-gray-600 text-sm mb-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.242-4.243a8 8 0 1111.314 0z"></path>
                        </svg>
                        ${venue.location}
                    </div>
                    <div class="flex items-center gap-1 mb-3">
                        <span class="text-yellow-400">${'★'.repeat(Math.floor(venue.rating))}${'☆'.repeat(5 - Math.floor(venue.rating))}</span>
                        <span class="text-sm text-gray-600">(${venue.reviews})</span>
                    </div>
                    <div class="flex items-center gap-2 mb-3 flex-wrap">
                        ${venue.types.map(type => `<span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">${type}</span>`).join('')}
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <span class="text-2xl font-bold text-gray-900">${(venue.price / 1000).toFixed(0)}k</span>
                            <span class="text-gray-600 text-sm">/90 phút</span>
                        </div>
                        <button class="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg transition">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                            </svg>
                        </button>
                    </div>
                `;
        venuesList.appendChild(venueCard);
    });
}

// Initial display
displayVenues(venues);

// Filter form submission
document.getElementById('filterForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const location = document.getElementById('filterLocation').value.toLowerCase();
    const type = document.getElementById('filterType').value;
    const price = document.getElementById('filterPrice').value;
    const rating = document.getElementById('filterRating').value;

    let filtered = venues.filter(v => {
        if (location && !v.location.toLowerCase().includes(location)) return false;
        if (type && !v.types.includes(type)) return false;
        if (price && v.price > (price * 1000)) return false;
        if (rating && v.rating < parseFloat(rating)) return false;
        return true;
    });

    displayVenues(filtered);
});