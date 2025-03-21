export default function decorate(block) {
    const socialBlock = block.querySelector(':scope > div');
    [block.querySelectorAll(':scope > div')].forEach(row => {
        [...socialBlock.querySelectorAll(':scope > div')].forEach((element, index) => {
            const contentWrapper = element.closest('div');
            if (index % 2 === 0) {
                contentWrapper.classList.add('social-title');
            } else {
                contentWrapper.classList.add('social-logo');
            }
        });
    });
}