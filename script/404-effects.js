// Add some spooky effects for the 404 page
document.addEventListener('DOMContentLoaded', function() {
    // Add a subtle animation to the error door
    const errorDoor = document.querySelector('.error-door');
    if (errorDoor) {
        setInterval(() => {
            errorDoor.style.transform = 'scale(1.02)';
            setTimeout(() => {
                errorDoor.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }
});
