import {fetchAllArticles} from '../all-articles/all-articles.js'

export default async function decorate(block) {
    // Use this block to populate the article section.
    const section_list = document.querySelectorAll('.section.article');
    console.log(section_list);

    const main_container = section_list[0].closest('main');
    const article_main = document.createElement('div');
    article_main.classList.add('section');
    article_main.classList.add('main-article-content-container');

    [...section_list].forEach(section=>{
        if(section.classList.contains('article-picture')){
            return;
        } else {
            article_main.append(section);
        }
        
    })

    const article_picture = main_container.querySelector('.article-picture');
    article_picture?.parentNode.insertBefore(article_main,article_picture.nextElementSibling);

    // Now we will try to work with the block.
    const allArticles = await fetchAllArticles();
    console.log(allArticles);

    [...block.querySelectorAll(':scope > div')].forEach(row=>{
        [...row.querySelectorAll(':scope > div')].forEach(col =>{
            const colDiv = col.closest('div');
            if(!colDiv.hasChildNodes() && colDiv.textContent.trim() === ''){
                colDiv.remove();
            }
        });

        row.classList.add('articles-timeline-container');
    });

    const all_articles_container = block.querySelector('.articles-timeline-container');
    const articleList = document.createElement('ul')
    allArticles.forEach(article=>{
        const articleItem = document.createElement('li');

        // Testing for the tags from the json file.
        const url = Array.from(JSON.parse(article.tags));
        console.log(typeof url,url);

        const time = new Date(article.lastModified * 1000)
    
        articleItem.innerHTML = `
        <div class='timeline-card'>
            <a href=${article.path}>
                <h3>${article.title}</h3>
                <p>${time.toDateString()}</p>
            </a>
        </div>    
        `

        articleList.append(articleItem);
    });

    all_articles_container.append(articleList);


}