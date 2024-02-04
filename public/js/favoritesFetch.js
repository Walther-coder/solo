const formCreate = document.querySelector('#formCreate');
const formEdit = document.querySelector('#formEdit');
const containerFavorites = document.querySelector('.ContainerFavorites');

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
                <button className="buttonDelete" id=${userId} type="submit">Delete</button>
                <button className="editButton" id=${userId} type="submit">Edit</button>
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
