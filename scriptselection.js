document.addEventListener('DOMContentLoaded', function() {
    const familyMembers = document.getElementById('familyMembers');
    const continueBtn = document.getElementById('continueBtn');
    const selectedRoleSpan = document.getElementById('selectedRole');
    let selectedRole = null;
    
    // Handle member selection
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            memberCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            // Get the role
            selectedRole = this.getAttribute('data-role');
            selectedRoleSpan.textContent = selectedRole;
            
            // Show continue button
            continueBtn.classList.add('active');
        });
    });
    
    // Handle continue button click
    continueBtn.addEventListener('click', function() {
        if (selectedRole) {
            // Store the selected role in localStorage (or sessionStorage)
            localStorage.setItem('familyRole', selectedRole);
            
            // Redirect to the home page
            window.location.href = 'youritinerary_home.html';
        }
    });
    
    // Add touch/swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    familyMembers.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    familyMembers.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Swiped left - scroll right
            familyMembers.scrollBy({left: 200, behavior: 'smooth'});
        }
        if (touchEndX > touchStartX) {
            // Swiped right - scroll left
            familyMembers.scrollBy({left: -200, behavior: 'smooth'});
        }
    }
});

continueBtn.addEventListener('click', function() {
    if (selectedRole) {
        // Store the selected role and timestamp
        localStorage.setItem('familyRole', selectedRole);
        localStorage.setItem('roleSelectedAt', Date.now());
        
        // Redirect to the home page
        window.location.href = 'youritinerary_home.html';
    }
});

// Optional: Add role expiration (e.g., after 24 hours)
//function checkRoleExpiration() {
//    const selectedAt = localStorage.getItem('roleSelectedAt');
//    if (selectedAt && Date.now() - selectedAt > 86400000) { // 24 hours
//        localStorage.removeItem('familyRole');
//        localStorage.removeItem('roleSelectedAt');
//    }
//}
//checkRoleExpiration();