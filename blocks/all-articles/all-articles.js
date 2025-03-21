
async function fetchAllArticles(){
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


}