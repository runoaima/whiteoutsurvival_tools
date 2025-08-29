let lastScrollY = window.scrollY;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
        // ページの一番上にいるときは必ず表示
        header.classList.remove('header-hidden');
    } else if (lastScrollY < window.scrollY) {
        // 下にスクロールしている時は非表示
        header.classList.add('header-hidden');
    } else {
        // 上にスクロールしている時は表示
        header.classList.remove('header-hidden');
    }
    lastScrollY = window.scrollY;
});
