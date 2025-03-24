import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'author-avatar';
      else if(div.querySelector('h4')) {
        div.className = 'author-info';
        div.querySelector('h4')?.classList.add('author-name');
        const el = div.querySelector('h4');
        el.id = '';
        div.querySelector('p')?.classList.add('author-role');
      }
      else div.className = 'author-social-links'

    });

    const author_content = document.createElement('div');
    author_content.classList.add('author-content');
    author_content.appendChild(li.querySelector('.author-avatar'));
    author_content.appendChild(li.querySelector('.author-info'));

    li.querySelector(':scope > .author-avatar')?.remove();
    li.querySelector(':scope > .author-info')?.remove();

    li.insertBefore(author_content,li.firstElementChild);

    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}