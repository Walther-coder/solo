const formCreate = document.querySelector("#formCreate");
const formEdit = document.querySelector(".formEdit");
const containerFavorites = document.querySelector(".containerFavorites");

if (containerFavorites !== null) {
  containerFavorites.addEventListener("click", async (event) => {
    if (event.target.classList.contains("editButton")) {
      formEdit.style.display = "block";
      formCreate.style.display = "none";
      const targetQuote = event.target.closest(".quoteCard");
      const bodyQuote = targetQuote.querySelector(".cardValue");
      console.log("targetQuote", targetQuote);
      formEdit.quoteEdit.value = bodyQuote.textContent;
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

if (formEdit !== null) {
  formEdit.addEventListener("click", async (event) => {
    event.preventDefault();
    if (event.target.classList.contains("editQuote")) {
      const data = new FormData(formEdit);
      const input = Object.fromEntries(data);
      console.log("input:", input);

      try {
        const response = await fetch(`/quote/favorites/${formEdit.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quote: input.quoteEdit }),
        });

        if (response.ok) {
          formEdit.reset();
          formEdit.style.display = "none";
          formCreate.style.display = "block";
          const result = await response.json();
          const updateQuoteId = result.id;

          const displayDiv = document.querySelector(`#quote${updateQuoteId}`);

          displayDiv.innerHTML = `
                    <h3 class="cardValue">${result.body}</h3>
                    <button class="buttonDelete" id=${updateQuoteId} type="submit">Delete</button>
                    <button class="editButton" id=${updateQuoteId} type="submit">Edit</button>
                    `;
        } else {
          console.log("ПЕРЕРИСОВКА НЕ ПРОШЛА. ФЕЧ ИЗМЕНЕНИЯ ЦИТАТЫ.");
        }
      } catch (error) {
        console.log(error, "ОШИБКА В ФИЧЕ ИЗМЕНЕНИЯ ЦИТАТЫ");
      }
    }
  });
}

if (formCreate !== null) {
  formCreate.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();

      const data = new FormData(formCreate);
      const input = Object.fromEntries(data);

      const response = await fetch("/quote/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (response.ok) {
        formCreate.reset();
        const result = await response.json();
        const newQuoteID = result.id;

        const displayDiv = document.createElement("div");
        displayDiv.classList.add("quoteCard");
        displayDiv.id = `quote${newQuoteID.toString()}`;

        displayDiv.innerHTML = `
                <h3 class="cardValue">${result.body}</h3>
                <button class="buttonDelete" id=${newQuoteID} type="submit">Delete</button>
                <button class="editButton" id=${newQuoteID} type="submit">Edit</button>
                `;
        containerFavorites.appendChild(displayDiv);
      } else {
        console.error("Перерисовка не прошла");
      }
    } catch (error) {
      console.log(error, "ОШИБКА В ФИЧЕ CREATE");
    }
  });
}

if (containerFavorites !== null) {
  containerFavorites.addEventListener("click", async (event) => {
    if (event.target.classList.contains("buttonDelete")) {
      event.preventDefault();
      try {
        const response = await fetch(`/quote/favorites/${event.target.id}`, {
          method: "DELETE",
        });

        if (response.status === 200) {
          const targetQuote = event.target.closest(`#quote${event.target.id}`);
          const responseJson = await response.json();

          containerFavorites.innerHTML = "";

          responseJson.forEach((quote) => {
            const quoteDiv = document.createElement("div");
            quoteDiv.classList.add("quoteCard");
            quoteDiv.id = `quote${quote.id}`;
            quoteDiv.innerHTML = `
                            <h3 class="cardValue">${quote.body}</h3>
                            <button class="buttonDelete" id=${quote.id} type="submit">Delete</button>
                            <button class="editButton" id=${quote.id} type="submit">Edit</button>
                            `;
            containerFavorites.appendChild(quoteDiv);
          });
        } else {
          console.log("С БЭКА ПРИШЛО НЕ ТО");
        }
      } catch (error) {
        console.log(error, "ОШИБКА В ФИЧЕ УДАЛЕНИЯ");
      }
    }
  });
}
