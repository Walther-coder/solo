
const formCreate = document.querySelector("#formCreate");
const formEdit = document.querySelector(".formEdit");
const entryContainer = document.querySelector('.entryContainer');
const enryUl = document.querySelector('.enryUl');
const entry = document.querySelector('.entry');
const divMsg = document.querySelector('.msg');


if(entryContainer !== null) {
    entryContainer.addEventListener('click', async (event) => {
        if(event.target.classList.contains('update-btn')) {
            formEdit.style.display = "block";
            formCreate.style.display = "none";
            const targetEntry = event.target.closest('.done, .not-done');
            const bodyEntry = targetEntry.querySelector('.entryElvalue');
            formEdit.textEdit.value = bodyEntry.textContent;
            formEdit.id = event.target.id;
        }
    });
}

formEdit.addEventListener("click", (event) => {
    if (event.target.classList.contains("cancel")) {
      formCreate.style.display = "block";
      formEdit.style.display = "none";
    }
  });

  if(formEdit !== null) {
    formEdit.addEventListener('submit', async (event) => {
        event.preventDefault();

        const data = new FormData(formEdit);
        const inputs = Object.fromEntries(data);
        console.log(inputs, '====>')
        try {
            const response = await fetch(`/entry/${formEdit.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({text:inputs.text, date:inputs.date}),
            });

            if(response.ok) {
                formEdit.reset();
                formEdit.style.display = "none";
                formCreate.style.display = "block";
                const responseData = await response.json();
                console.log('responseData:',responseData);
                const idValue = responseData.id;
                console.log('idValue:',idValue);

                const entryListItem = document.getElementById(`entry${responseData.id}`);

                const entryElvalue = entryListItem.querySelector('.entryElvalue');
                const entryElStatus = entryListItem.querySelector('.entryElStatus');
                const entryElDate = entryListItem.querySelector('.entryElDate');

                const rawDate = new Date(responseData.date);
                const formattedDate = `${(rawDate.getMonth() +1).toString().padStart(2,'0')}/${rawDate.getDate().toString().padStart(2, '0')}/${rawDate.getFullYear()} ${rawDate.getHours().toString().padStart(2,'0')}:${rawDate.getMinutes().toString().padStart(2, '0')} ${rawDate.getHours() >= 12 ? 'PM' : 'AM'}`;
                console.log('formattedDate:',formattedDate);

                entryElvalue.innerText = responseData.text;
                entryElStatus.innerText = responseData.status;
                entryElDate.innerText = formattedDate;

            } else {
                console.error('Не удалось отредактировать запись');
              }

        } catch (error) {
            console.log(error, 'ОШИБКА В ФЕЧЕ РЕДАКТИРОВАНИЯ ЗАПИСИ');
        }
    })
  }

  entry.addEventListener('click', async (event) => {
    if(event.target.classList.contains('change')){
        event.preventDefault();   
        try {
            const response = await fetch(`/entry/${event.target.id}`, {
                method: 'PATCH',
            });
            const updateStatus = await response.json();
            console.log(updateStatus)
            
            const entryElement = event.target.parentNode;
            const entryElvalue = entryElement.querySelector('.entryElvalue');
            const entryElStatus = entryElement.querySelector('.entryElStatus');
            const entryElDate = entryElement.querySelector('.entryElDate');


            entryElvalue.textContent = `${updateStatus.text}`;
            entryElStatus.textContent = `${updateStatus.status}`;
            entryElDate.textContent = `${updateStatus.date}`;

            if(updateStatus.status === false) {
                entryElement.classList.remove('done');
                entryElement.classList.add('not-done')   
            } else{
                entryElement.classList.remove('not-done');
                entryElement.classList.add('done') 
            }
           
        } catch (error) {
            console.error(error, 'Ошибка в фиче ИЗМЕНЕНИЯ СТАТУСА')
        }
    }
  })


if(formCreate !== null) {
    formCreate.addEventListener('submit', async (event) => {
       try {
           event.preventDefault();
        const data = new FormData(formCreate);
        const inputs = Object.fromEntries(data);
        console.log(inputs);

        const response = await fetch('/entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text: inputs.text, date: inputs.date}),
        });

        if(response.ok) {
            formCreate.reset();
            const result = await response.json();
            const entryId = result.id;

            const displayDiv = document.createElement('li');
            displayDiv.classList.add('not-done');
            displayDiv.id = `entry${result.id}`;

            const rawDate = new Date(result.date);
            const formattedDate = `${(rawDate.getMonth() +1).toString().padStart(2,'0')}/${rawDate.getDate().toString().padStart(2, '0')}/${rawDate.getFullYear()} ${rawDate.getHours().toString().padStart(2,'0')}:${rawDate.getMinutes().toString().padStart(2, '0')} ${rawDate.getHours() >= 12 ? 'PM' : 'AM'}`;
            console.log('formattedDate:',formattedDate);

            displayDiv.innerHTML = `
            <p class='entryElvalue'>${result.text}</p>
            <p class='entryElStatus'>${result.status}</p>
            <p class='entryElDate'>${formattedDate}</p>
            <button id=${entryId} class='change' text="Change Status" type="submit">Изменить статус</button>
            <button id=${entryId} class='update-btn' type="submit" >Отредактировать</button>
            <button id=${entryId} class='delete-btn' type="submit" >Удалить </button>  
            `;
            enryUl.appendChild(displayDiv);
        } else {
            console.log('Перерисовка не прошла')
        }
       } catch (error) {
        console.log(error, 'ОШИБКА В ФИЧЕ СОЗДАНИИ ЗАПИСИ');
       }

    })
}

if(enryUl !== null) {
    enryUl.addEventListener('click', async (event) => {
        if(event.target.classList.contains('delete-btn')){
            event.preventDefault();
            try {
                const response = await fetch(`/entry/${event.target.id}`, {
                    method: 'DELETE',
                });
                
                const result = await response.json();
                console.log(result)

                if(result.msg){
                    divMsg.innerText = result.msg;
                        divMsg.style.color = 'green';  
                    setTimeout(() => {
                        divMsg.innerText = '';
                    }, 1500);
                    // const targetEntry = event.target.closest(`#entry${event.target.id}`);

                    enryUl.innerHTML = '';

                    result.newList.forEach((el) => {
                        const displayDiv = document.createElement('li');
                        displayDiv.classList.add(result.status ? 'done' : 'not-done');
                        displayDiv.id = `entry${result.id}`;
                        displayDiv.innerHTML = `
                        <p class='entryElvalue'>${el.text}</p>
                        <p class='entryElStatus'>${el.status}</p>
                        <p class='entryElDate'>${new Date(el.date).toLocaleString('en-US', {
                        year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true,
                        })}</p>
                        <button id=${el.id} class='change' text="Change Status" type="submit">Изменить статус</button>
                        <button id=${el.id} class='update-btn' type="submit" >Отредактировать</button>
                        <button id=${el.id} class='delete-btn' type="submit" >Удалить </button>  
                        `;
                        enryUl.appendChild(displayDiv);  
                    
                    });
                }
                    if(result.err) {
                        divMsg.innerText = result.err;
                        divMsg.style.color = 'red'; 
                        setTimeout(() => {
                            divMsg.innerText = '';   
                        }, 1500);
                    }
            } 
            catch (error) {
                console.log(error, 'ОШИБКА В ФЕЧЕ УДАЛЕНИЯ')
            }
        }
    
    })
}