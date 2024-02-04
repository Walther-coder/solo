const loginForm = document.querySelector('#loginForm');
const messageDiv = document.querySelector('#message');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = new FormData(loginForm);
    const inputs = Object.fromEntries(data);

    if(!inputs.login || !inputs.password) {
        messageDiv.innerText = 'Введите все данные';
        messageDiv.style.color = 'red';
    } else {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(inputs),
            });

            const result = await response.json();

            messageDiv.style.color = 'black';

            if(result.msg) {
                messageDiv.innerText = result.msg;
                messageDiv.style.color = 'green';
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            }
            if(result.err) {
                messageDiv.innerText = result.err;
                messageDiv.style.color = 'red';
            }
        } catch (error) {
            console.log(error, 'ОШИБКА В ФИЧЕ ЛОГИНА')
        }
    }
})
