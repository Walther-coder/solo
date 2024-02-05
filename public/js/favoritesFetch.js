const formCreate = document.querySelector('#formCreate');
const formEdit = document.querySelector('#formEdit');
const containerFavorites = document.querySelector('.containerFavorites');

if(formCreate !== null) {
    formCreate.addEventListener('submit', async (event) => {
        try {
            event.preventDefault();
    
            const data = new FormData(formCreate);
            const input = Object.fromEntries(data);
            
            const response = await fetch('/quote/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input),
            });
    
            if(response.ok) {
                formCreate.reset();
                const result = await response.json();
                const userId = result.id;
    
                const displayDiv = document.createElement('div');
                displayDiv.classList.add('quoteCard')
                displayDiv.id = `quote${userId.toString()}`;

                displayDiv.innerHTML = `
                <h3 className="cardValue">${result.body}</h3>
                <button class="buttonDelete" id=${userId} type="submit">Delete</button>
                <button class="editButton" id=${userId} type="submit">Edit</button>
                `
                containerFavorites.appendChild(displayDiv);
            } else {
                console.error('Перерисовка не прошла')
            }
        } catch (error) {
            console.log(error, 'ОШИБКА В ФИЧЕ CREATE')
        }
    });
} 

if(containerFavorites !== null) {
    containerFavorites.addEventListener('click', async (event) => {
            if (event.target.classList.contains('buttonDelete')) {
                event.preventDefault();
                try {
                    const response = await fetch(`/quote/favorites/${event.target.id}`, {
                        method: 'DELETE',
                    });
        
                    if(response.status === 200) {
                        const targetQuote = event.target.closest(`#quote${event.target.id}`);
                        const responseJson = await response.json();

                        containerFavorites.innerHTML = '';

                        responseJson.forEach((quote) => {
                            const quoteDiv = document.createElement('div');
                            quoteDiv.classList.add('quoteCard');
                            quoteDiv.id = `quote${quote.id}`;
                            quoteDiv.innerHTML = `
                            <h3 class="cardValue">${quote.body}</h3>
                            <button class="buttonDelete" id=${quote.id} type="submit">Delete</button>
                            <button class="editButton" id=${quote.id} type="submit">Edit</button>
                            `;
                            containerFavorites.appendChild(quoteDiv);
                        });
                    } else{
                        console.log('С БЭКА ПРИШЛО НЕ ТО');
                    }
                } catch (error) {
                    console.log(error, 'ОШИБКА В ФИЧЕ УДАЛЕНИЯ')
                }
            }
    })
}


