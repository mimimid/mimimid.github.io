document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll(
        '.content .language-scss .highlight, .content .language-css .highlight'
    );

    codeBlocks.forEach((block) => {
        const spans = Array.from(block.querySelectorAll('span'));

        for (let i = 0; i < spans.length - 1; i++) {
            const current = spans[i];
            const next = spans[i + 1];

            const isBang =
                current.textContent.trim() === '!';

            const isImportant =
                next.textContent.trim() === 'important';

            if (isBang && isImportant) {
                current.classList.add('token-important');
                next.classList.add('token-important');
            }
        }
    });
});
