
export async function fetchAllArticles(){
    try {
        const res = await fetch('/query-index.json');
        if(res.ok){
            const articleData = await res.json();
            return articleData.data ;
        } else {
            throw Error(`Error occurred : ${res.message}`)
        }
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

export default async function decorate(block) {
    const allArticles = await fetchAllArticles();
    console.log(allArticles); 

    [...block.querySelectorAll(':scope > div')].forEach(row=>{
        [...row.querySelectorAll(':scope > div')].forEach(col =>{
            const colDiv = col.closest('div');
            if(!colDiv.hasChildNodes() && colDiv.textContent.trim() === ''){
                colDiv.remove();
            }
        });

        row.classList.add('articles-content-container');
    });

    const all_articles_container = block.querySelector('.articles-content-container');
    const articleList = document.createElement('ul')
    allArticles.forEach(article=>{
        const articleItem = document.createElement('li');

        // Testing for the tags from the json file.
        const url = Array.from(JSON.parse(article.tags));
        console.log(typeof url,url);
    
        articleItem.innerHTML = `
            <a href=${article.path}>
                <img src=${article.image}/>
                <h3>${article.title}</h3>
            </a>
            <p>${article.description}</p>
        `

        articleList.append(articleItem);
    });

    all_articles_container.append(articleList);

}