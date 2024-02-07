
const formCreate = document.querySelector("#formCreate");
const formEdit = document.querySelector(".formEdit");
const entryContainer = document.querySelector('.entryContainer');
const entry = document.querySelector('.entry');

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
        // console.log(inputs, '====>',formEdit.id)
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

                const entryElvalue = document.querySelector('.entryElvalue');
                const entryElStatus = document.querySelector('.entryElStatus');
                const entryElDate = document.querySelector('.entryElDate');


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
            
            const affairElement = event.target.parentNode;
            const p = affairElement.querySelector('p');
            p.textContent =`${updateStatus.name}-----${updateStatus.status}`;
            

            if(updateStatus.status === false) {
                affairElement.classList.remove('done');
                affairElement.classList.add('not-done')   
            } else{
                affairElement.classList.remove('not-done');
                affairElement.classList.add('done') 
            }
           
        } catch (error) {
            console.error(error, 'Ошибка в фиче ИЗМЕНЕНИЯ СТАТУСА')
        }
    }
  })
