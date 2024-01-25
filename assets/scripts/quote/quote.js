document.addEventListener("DOMContentLoaded", async function () {
    const quote = await getQuote()
    if (quote !== undefined) {
        setQuote(quote)
    }
})

async function getQuote() {
    try {
        const response = await fetch('http://localhost:3000/quotes/getQuote', {
            method: 'POST',
            body: JSON.stringify({
                format: 'json'
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        console.log(response)
        const quote = await response.json()

        const paragraph = document.createElement('p')
        paragraph.textContent = quote.quoteText + `©`
        paragraph.classList.add('container_block-3__quote')
        return paragraph;
    } catch (err) {
        console.log('Ошибка получения цитаты:', err);
    }
}

function setQuote(element) {
    const div = document.querySelector('#quote');
    div.appendChild(element)
}
