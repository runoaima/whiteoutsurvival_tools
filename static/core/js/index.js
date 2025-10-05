document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      // クリックされた要素の親（accordion-item）に 'open' クラスをトグルする
      item.classList.toggle('open');
    });
  });
});