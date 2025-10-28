document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.sponsors-inner');
    const items = document.querySelectorAll('.sponsor-item');
    const prev = document.querySelector('.custom-prev');
    const next = document.querySelector('.custom-next');
    const total = items.length;
    const visible = 8;
    let index = 0;

    function updateCarousel() {
        if (!items.length) return;
        const itemWidth = items[0].offsetWidth;
        const gap = 15;
        const moveAmount = index * (itemWidth + gap);
        track.style.transform = `translateX(-${moveAmount}px)`;
    }

    if (prev && next) {
        next.addEventListener('click', () => {
            index = (index + 1 <= total - visible) ? index + 1 : 0;
            updateCarousel();
        });

        prev.addEventListener('click', () => {
            index = (index - 1 >= 0) ? index - 1 : total - visible;
            updateCarousel();
        });
    }

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
});
