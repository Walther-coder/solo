const formEditePassword = document.querySelector('.formEditePassword');
const message = document.querySelector('.message');
const divAccount = document.querySelector('.account');
const dataformEdite = document.querySelector('.dataformEdit');
const editButton = document.querySelector('.edit');

if(divAccount !== null) {
    divAccount.addEventListener('click', async (event) => {
        
        if(event.target.classList.contains('editLogin')) {
            dataformEdite.style.display = 'block';
            const targetLogin = event.target.closest('.loginDiv');
            const bodyLogin = targetLogin.querySelector('.login');
            dataformEdite.querySelector('#editData').value = bodyLogin.textContent;
            editButton.value = '/account/login'; 
        }
        if(event.target.classList.contains('editEmail')){
            dataformEdite.style.display = 'block';
            const targetEmail = event.target.closest('.emailDiv');
            const bodyEmail = targetEmail.querySelector('.email');
            dataformEdite.querySelector('#editData').value = bodyEmail.textContent;
            editButton.value = '/account/email';
        }

        dataformEdite.addEventListener('click', async (event) => {
           console.log(editButton.value)
            if(event.target.classList.contains('edit')) {
                 event.preventDefault();
                const data = new FormData(dataformEdite);
                const input = Object.fromEntries(data);
                console.log('input', input);
                try {
                    const response = await fetch(editButton.value, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(input),
                    });
                    
                    const result = await response.json();
                   

                    if(result.action === "loginChanged") {
                        message.innerText = result.msg;
                        message.style.color = 'green';
                        // console.log("resultLogin",result)
                        setTimeout(() => {
                            window.location.href = '/logout';   
                        }, 3000);
                    } 
                    
                    else if(result.action === "emailChanged"){
                        message.innerText = result.msg;
                        message.style.color = 'green';
                        dataformEdite.reset();
                        dataformEdite.style.display = 'none';
                        const displaH3 = document.querySelector('.email');
                        displaH3.innerText = result.user.email;  
                    }
                    else  {
                        message.innerText = result.err;
                        message.style.color = 'red';
                        // console.log('oshibka')
                    }
        
                    
                } catch (error) {
                    console.log(error, 'ОШИБКА В ФИЧЕ ИЗМЕНЕНИЯ ЛОГИНА и ПОЧТЫ')
                }   
            }
        })
    })
}


dataformEdite.addEventListener('click', (event) => {
    if(event.target.classList.contains('cancel')){
        dataformEdite.style.display = 'none';
    }
}) 



if(formEditePassword !== null) {
    formEditePassword.addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = new FormData(formEditePassword);
        const inputs = Object.fromEntries(data);
        console.log("inputsPassword",inputs)
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
