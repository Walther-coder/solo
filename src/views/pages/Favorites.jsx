const React = require('react');
const Layout = require('../Layout');

module.exports = function Favorites({login, quote}) {
    return (
        <Layout login={login}>
        <script defer src="/js/favoritesFetch.js" />
        <div className="containerQuotes">
          <form id="formCreate" className="createQuote">
            <h1 className="create">Написать свою цитату</h1>
            <label htmlFor="quote">
              <input type="text" id="quoteCreateInput" name="quote" placeholder="Введите цитату..." />
            </label>
            <button type="submit" className="addCeremony">Сохранить</button>
          </form>
  
          <form className="formEdit" style={{ display: 'none' }}>
            <h1>Отредактировать</h1>
            <label htmlFor="quoteEdit">
            Цитата:
              <input type="text" id="quoteEdit" name="quoteEdit" />
            </label>
            <div className="button">
              <button type="submit" className="editQuote">Сохранить</button>
              <button type="submit" className="cancel">Назад</button>
            </div>
          </form>
  
          <div className="containerFavorites">
            {quote.map((card) => (
              <div key={card.id} id={`quote${card.id}`} className="quoteCard">
                <h3 className="cardValue">{card.body}</h3>
                <button className="buttonDelete" id={card.id} type="submit">Удалить</button>
                <button className="editButton" id={card.id} type="submit">Изменить</button>
              </div>
            ))}
          </div>
        </div>
      </Layout>

    )
}