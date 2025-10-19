// Door Logic
document.addEventListener('DOMContentLoaded', function() {
    const doors = document.querySelectorAll('.door');
    
    // Set Halloween date (October 31st of current year)
    const currentYear = new Date().getFullYear();
    const halloweenDate = new Date(currentYear, 9, 31); // Month is 0-indexed, so 9 = October
    
    // If Halloween has passed this year, set it to next year
    // But if it's November 1st, we add 1 day to the countdown
    const now = new Date();
    const isDayAfterHalloween = now.getMonth() === 10 && now.getDate() === 1; // November 1st
    
    if (halloweenDate < now && !isDayAfterHalloween) {
        halloweenDate.setFullYear(currentYear + 1);
    }
    
    
    // Calculate which doors should be open based on days until Halloween
    function updateDoors() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const isDayAfterHalloween = now.getMonth() === 10 && now.getDate() === 1; // November 1st
        
        let daysUntilHalloween;
        
        if (isDayAfterHalloween) {
            // If it's November 1st, we're 1 day after Halloween
            daysUntilHalloween = -1;
        } else {
            const timeDiff = halloweenDate.getTime() - now.getTime();
            daysUntilHalloween = Math.floor(timeDiff / (1000 * 3600 * 24));
        }
        
        // Process each door by its data-day attribute
        for (let doorNumber = 1; doorNumber <= 13; doorNumber++) {
            const door = document.querySelector(`[data-day="${doorNumber}"]`);
            if (!door) continue;
            
            // Door 1 opens 13 days before Halloween, Door 2 opens 12 days before, etc.
            // Door 13 opens on Halloween day
            const daysFromHalloween = 13 - doorNumber;
            const doorOpenDate = new Date(halloweenDate);
            doorOpenDate.setDate(doorOpenDate.getDate() - daysFromHalloween);
            
            // Remove all classes first
            door.classList.remove('opened', 'locked', 'available');
            
            // Remove existing event listeners by cloning the door
            const newDoor = door.cloneNode(true);
            door.parentNode.replaceChild(newDoor, door);
            
            // Get the fresh door element
            const freshDoor = document.querySelector(`[data-day="${doorNumber}"]`);
            
            if (now >= doorOpenDate) {
                // Door should be available to open
                freshDoor.classList.add('available');
                freshDoor.addEventListener('click', function() {
                    openDoor(this);
                });
            } else {
                // Door should be locked
                freshDoor.classList.add('locked');
                freshDoor.addEventListener('click', function() {
                    showLockedMessage(this);
                });
            }
        }
        
        // Re-add hover effects and sound listeners to fresh door elements
        addHoverEffects();
        // Re-add sound listeners
        addSoundListeners();
    }
    
    // Open door (navigate to door page)
    function openDoor(door) {
        if (!door.classList.contains('opened')) {
            const doorNumber = door.getAttribute('data-day');
            // Navigate to the corresponding door page
            window.location.href = `doors/${doorNumber}.html`;
        }
    }
    
    // Show message for locked doors
    function showLockedMessage(door) {
        const doorNumber = door.getAttribute('data-day');
        const now = new Date();
        const currentYear = now.getFullYear();
        const isDayAfterHalloween = now.getMonth() === 10 && now.getDate() === 1; // November 1st
        
        let daysUntilHalloween;
        
        if (isDayAfterHalloween) {
            // If it's November 1st, we're 1 day after Halloween
            daysUntilHalloween = -1;
        } else {
            const timeDiff = halloweenDate.getTime() - now.getTime();
            daysUntilHalloween = Math.floor(timeDiff / (1000 * 3600 * 24));
        }
        
        const daysFromHalloween = 13 - parseInt(doorNumber);
        const daysUntilOpen = daysFromHalloween - daysUntilHalloween;
        
        if (daysUntilOpen > 0) {
            alert(`Door ${doorNumber} will open in ${daysUntilOpen} day${daysUntilOpen === 1 ? '' : 's'}!`);
        } else {
            alert(`Door ${doorNumber} will open soon!`);
        }
    }
    
    // Add some spooky effects
    function addSpookyEffects() {
        // Add floating particles effect
        createFloatingParticles();
        
        // Add random spooky sounds (optional - requires user interaction first)
        addSpookySounds();
    }
    
    // Create floating particles
    function createFloatingParticles() {
        const particleCount = 20;
        const container = document.querySelector('.container');
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #ff8c00;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                animation: float ${5 + Math.random() * 10}s linear infinite;
                opacity: ${0.3 + Math.random() * 0.4};
            `;
            document.body.appendChild(particle);
        }
        
        // Add CSS for particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Global variables for sound system
    let audioContext;
    let hasInteracted = false;
    
    // Add spooky sound effects (requires user interaction)
    function addSpookySounds() {
        function initAudio() {
            if (!hasInteracted) return;
            
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.log('Web Audio API not supported');
            }
        }
        
        // Play door creak sound
        function playDoorSound() {
            if (!audioContext) return;
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        }
        
        function handleDoorSound() {
            if (!hasInteracted) {
                hasInteracted = true;
                initAudio();
            }
            if (audioContext && !this.classList.contains('locked') && !this.classList.contains('opened')) {
                playDoorSound();
            }
        }
        
        // Make handleDoorSound globally accessible
        window.handleDoorSound = handleDoorSound;
        
        // Initial setup
        addSoundListeners();
        
        // Initialize audio on first user interaction
        document.addEventListener('click', function() {
            if (!hasInteracted) {
                hasInteracted = true;
                initAudio();
            }
        }, { once: true });
    }
    
    // Add click listeners to doors for sound
    function addSoundListeners() {
        const freshDoors = document.querySelectorAll('.door');
        freshDoors.forEach(door => {
            // Remove existing sound listeners to prevent duplicates
            door.removeEventListener('click', window.handleDoorSound);
            // Add new sound listener
            door.addEventListener('click', window.handleDoorSound);
        });
    }
    
    // Initialize everything
    updateDoors();
    addSpookyEffects();
    addHoverEffects();
    
    // Update doors every hour (in case date changes)
    setInterval(updateDoors, 3600000);
    
    // Add some interactive hover effects
    function addHoverEffects() {
        // Get fresh door elements after potential cloning
        const freshDoors = document.querySelectorAll('.door');
        
        freshDoors.forEach(door => {
            // Remove existing hover listeners to prevent duplicates
            door.removeEventListener('mouseenter', handleMouseEnter);
            door.removeEventListener('mouseleave', handleMouseLeave);
            
            // Add new hover listeners
            door.addEventListener('mouseenter', handleMouseEnter);
            door.addEventListener('mouseleave', handleMouseLeave);
        });
    }
    
    // Separate functions for hover effects to enable proper cleanup
    function handleMouseEnter() {
        if (!this.classList.contains('locked') && !this.classList.contains('opened')) {
            this.style.transform = 'scale(1.05)';
        }
    }
    
    function handleMouseLeave() {
        if (!this.classList.contains('opened')) {
            this.style.transform = 'scale(1)';
        }
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key >= '1' && e.key <= '9') {
            const doorNumber = parseInt(e.key);
            const door = document.querySelector(`[data-day="${doorNumber}"]`);
            if (door) {
                door.click();
            }
        } else if (e.key === '0') {
            // Handle door 10
            const door = document.querySelector('[data-day="10"]');
            if (door) {
                door.click();
            }
        }
    });
    
    // Add some Halloween-themed console messages
    console.log('%c🎃 Welcome to the Halloween Countdown! 🎃', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
    console.log('%c👻 Open the doors daily to discover ancient wisdom! 👻', 'color: #ffd700; font-size: 14px;');
    console.log('%c💀 Happy Halloween! 💀', 'color: #ff6b35; font-size: 16px;');
});
