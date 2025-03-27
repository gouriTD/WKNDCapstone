function decorateAccordion(el) {
    const titles = el.querySelectorAll(':scope > div:nth-child(odd)');
    titles.forEach((title, index) => {
      // Add a class to the title container
      title.classList.add('item-title');
      // Add Titile text
      const question = document.createElement('h6');
      question.classList.add('question');
      question.innerText = `${title.innerText}`;
      title.append(question);
      // Remove the empty div
      title.querySelector(':scope > div:last-of-type').remove();
      // Add a class to the content
      title.nextElementSibling.classList.add('item-content');
      // Add a click handler to open the content
      title.addEventListener('click', () => {
        title.classList.toggle('open');
      });
    });

    //Now remove all divs which are empty.
    const contentEl = document.querySelectorAll('.item-content');
        contentEl.forEach(content=>{
            [...content.querySelectorAll(':scope > div')].forEach(div=>{
                if(!div.hasChildNodes()) div.remove();
            })
        })
        
  }
  
  const els = document.querySelectorAll('.accordion');
  els.forEach((el) => {
    decorateAccordion(el);
  });