const quoty = document.getElementById('quoty');
const quotyButton = document.getElementById('quotyButton');


quotyButton.addEventListener('click', async (event) => {

    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const {value} = await response.json();
        console.log(value);
        
        if(response.ok){
            quoty.textContent = value;
        }
    } catch (error) {
        console.log(error, 'ОШИБКА В ФЕЧЕ С АПИ')
    }
})