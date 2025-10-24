document.addEventListener('DOMContentLoaded', function() {
    createFloating90sObjects();
});

function createFloating90sObjects() {
    const objectCount = 30;
    
    // Blood drop objects with their corresponding CSS classes
    const objects90s = [
        { symbol: '🩸', class: 'blood-drop' },
        { symbol: '🩸', class: 'blood-drop' },
        { symbol: '🩸', class: 'blood-drop' }
    ];
    
    for (let i = 0; i < objectCount; i++) {
        const object = document.createElement('div');
        const randomObject = objects90s[Math.floor(Math.random() * objects90s.length)];
        
        object.className = `particle-blood ${randomObject.class}`;
        object.textContent = randomObject.symbol;
        object.style.left = `${Math.random() * 100}vw`;
        object.style.top = `${Math.random() * 100}vh`;
        object.style.animationDuration = `${6 + Math.random() * 12}s`;
        object.style.opacity = `${0.4 + Math.random() * 0.5}`;
        object.style.fontSize = `${18 + Math.random() * 10}px`;
        object.style.animationDelay = `${Math.random() * 5}s`;
        
        document.body.appendChild(object);
    }
}
