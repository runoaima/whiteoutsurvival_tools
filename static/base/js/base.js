document.addEventListener('DOMContentLoaded', function() {
    const headerTop = document.querySelector('.header-top');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 50) {
            // 下にスクロール → header-top だけ隠す
            headerTop.classList.add('hidden');
        } else {
            headerTop.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    });
});
