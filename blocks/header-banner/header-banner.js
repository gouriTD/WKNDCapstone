const countryData = [
    {
        lang: "EN-US",
        background_url: "https://wknd.site/etc.clientlibs/wknd/clientlibs/clientlib-site/resources/images/country-flags/US.svg",
        country_name: "UNITED STATES"
    },
    {
        lang: "EN-CA",
        background_url: "https://wknd.site/etc.clientlibs/wknd/clientlibs/clientlib-site/resources/images/country-flags/CA.svg",
        country_name: "CANADA"
    },
    {
        lang: "FR-FR",
        background_url: "https://wknd.site/etc.clientlibs/wknd/clientlibs/clientlib-site/resources/images/country-flags/FR.svg",
        country_name: "FRANCE"
    },
];

let countryIndex = 0;

function updateCountryData(element){
    element.innerHTML = "";
    element.innerHTML = `
                <span> <img src=${countryData[countryIndex].background_url}/> ${countryData[countryIndex].lang.toUpperCase()} </span>`
}

export default function decorate(block) {
    const signinbanner = block.querySelector(':scope > div')
    console.log(signinbanner);
    signinbanner.className =  `signin-banner`;

    const signinContainer = signinbanner.querySelector(':scope > div');
    signinContainer.className = `signin-banner-container`;

    [...signinContainer.children].forEach((child,index)=>{
        const childEl = document.createElement('div') ;
        if(index%2 === 0){
            // This is the first child.
            childEl.classList.add(`signin-component`);
            const childAnchorEl = child.querySelector('a');
            childAnchorEl.removeAttribute('class');
            childEl.innerHTML = child.innerHTML; 
        }else{
            // Add class name for second child.
            childEl.classList.add(`country-selector-component`);
            childEl.innerHTML = `
                <span> <img src=${countryData[countryIndex].background_url}/> ${countryData[countryIndex].lang.toUpperCase()} </span>
            `;
        }
        child.replaceWith(childEl);
    })

    // Add country selection list and keep it hidden.
    const countryList = document.createElement('div');
    countryList.classList.add('country-list', 'hidden');
    
    const country_ul = document.createElement('ul');
    countryData.forEach((item,index)=>{
        const listItem = document.createElement('li');
        listItem.style.backgroundImage = `url(${item.background_url})`;
        listItem.innerHTML = `
            <span> ${item.country_name} </span>
            <p> ${item.lang} </p>
        `

        listItem.addEventListener('click' , ()=>{
            countryIndex = index;
            const country_selectorEl = document.querySelector('.country-selector-component');
            const country_listEl = document.querySelector('.country-list');

            country_selectorEl?.classList.remove('open');
            country_listEl?.classList.add('hidden');
            country_listEl?.setAttribute('aria-expanded',false);
            
            updateCountryData(country_selectorEl);
        })
        country_ul.append(listItem)
    })
   
    countryList.append(country_ul);
    countryList.setAttribute('aria-expanded',false);
    const countrySelector = signinContainer.querySelector('.country-selector-component');
    countrySelector?.addEventListener('click',(e)=>{
        const expanded = countryList.getAttribute('aria-expanded') === 'true';
        if(!expanded){
            countryList.classList.remove('hidden');
            countrySelector.classList.add('open')
        }else{
            countryList.classList.add('hidden');
            countrySelector.classList.remove('open')
        }
        countryList.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    })

    signinContainer.append(countryList);
}