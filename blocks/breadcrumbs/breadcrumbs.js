import { getMetadata } from '../../scripts/aem.js'

export default function decorate(block){
    console.log(block);
    if (getMetadata('breadcrumbs').toLowerCase() !== 'true') {
        return;
    }

    [...block.querySelectorAll(':scope > div')].forEach(row=>
        [...row.querySelectorAll(':scope > div')].forEach(col => {
            col.classList.add('breadcrumbs-main-container') ;
        })
    )

    let currentPath = document.location.pathname;

    // Replace the first "/" with empty string.
    currentPath = currentPath.replace('/','');
    const pathArray = currentPath.split('/');

    const ulEl = document.createElement('ul');
    pathArray.map((path,index)=>{
        const liEl = document.createElement('li');
        if(index === 0){
           liEl.innerHTML = `<a href="/${path}">${path.toUpperCase()}</a>`
        }else{
            liEl.innerHTML = `<p>${path.toUpperCase()}</p>`
        }
        ulEl.append(liEl);
    })


    block.querySelector('.breadcrumbs-main-container').append(ulEl);

    document.querySelector('.article-picture')?.parentNode.insertBefore(document.querySelector('.section.breadcrumbs-container'),document.querySelector('.article-picture').nextElementSibling);
    
}