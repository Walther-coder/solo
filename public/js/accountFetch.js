const formEdit = document.querySelector('.formEdit');
const message = document.querySelector('.message');

if(formEdit !== null) {
    formEdit.addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = new FormData(formEdit);
        const inputs = Object.fromEntries(data);
        console.log(inputs)
        try {
            const response = await fetch('/account', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ oldP: inputs.old, newP: inputs.new }),
            });
            const result = await response.json();

            if(result.msg) {
                message.innerText = result.msg;
                message.style.color = 'green';
                setTimeout(() => {
                    window.location.href = '/logout';   
                }, 1000);
            }
            if(result.err) {
                message.innerText = result.err;
                message.style.color = 'red';
            }
        } catch (error) {
            console.log(error, 'ОШИБКА В ФИЧЕ ИЗМЕНЕНИЯ ПАРОЛЯ')
        }
    })
}
