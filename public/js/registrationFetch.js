const regForm = document.querySelector('#regForm');
const messageDiv = document.querySelector('#message');

regForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const data = new FormData(regForm);
    const inputs = Object.fromEntries(data);
    console.log(inputs)
    if(!inputs.login || !inputs.password) {
        messageDiv.innerText = 'Заполните все поля';
        messageDiv.style.color = 'red';
    } else {
        try {
            const response = await fetch('/register', {
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
                    // eslint-disable-next-line no-undef
                    window.location.href = '/';
                }, 3000);
            }
            if (result.err) {
                messageDiv.innerText = result.err;
                messageDiv.style.color = 'red';
              }
        } catch (error) {
            console.log(error, 'ОШИБКА В ФИЧЕ РЕГИСТРАЦИИ')
        }
    }
})
