// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add a simple fade-in animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

document.addEventListener('DOMContentLoaded', () => {
    const rotatingText = document.getElementById('rotating-text');
    const texts = [
        'Open-Source',
        'Mobile-First',
        'AI-Powered'
    ];
    let currentIndex = 0;

    function updateText() {
        rotatingText.classList.remove('animate-in');
        rotatingText.classList.add('animate-out');

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % texts.length;
            rotatingText.textContent = texts[currentIndex];
            rotatingText.classList.remove('animate-out');
            rotatingText.classList.add('animate-in');

            setTimeout(() => {
                updateText()
            }, 2000);
        }, 50);
    }

    setTimeout(() => {
        updateText()
    }, 2000)
}); 