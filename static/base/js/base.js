let lastScrollY = window.scrollY;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (lastScrollY < window.scrollY) {
            // 下にスクロールしている時
            header.classList.add('header-hidden');
        } else {
            // 上にスクロールしている時
            header.classList.remove('header-hidden');
        }
        lastScrollY = window.scrollY;
    });