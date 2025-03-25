import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });

    // Now if the li element has an anchor tag.
    // then we wrap the content of li in it.
    if(li.querySelector(':scope a')) {
      const anchorEl = document.createElement('a');
      anchorEl.setAttribute('href',`${li.querySelector('.cards-card-body a').href}`)
      li.querySelector('.cards-card-body >p >a').remove();
      anchorEl.appendChild(li.querySelector('.cards-card-image'));
      anchorEl.appendChild(li.querySelector('.cards-card-body'));
      
      li.append(anchorEl);
    }
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
