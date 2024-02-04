const React = require('react');
const Layout = require('../Layout');

module.exports = function Favorites({login, quote}) {
    return (
        <Layout login={login}>
        <script defer src="/js/favoritesFetch.js" />
        <div className="containerCreate">
          <form id="form1" className="createQuote">
            <h1 className="create">Написать свою цитату</h1>
            <label htmlFor="quote">
              Body:
              <input type="text" id="quoteCreateInput" name="quote" />
            </label>
            <button type="submit" className="addCeremony">Сохранить</button>
          </form>
  
          <form className="formEdit" style={{ display: 'none' }}>
            <h1>Отредактировать</h1>
            <label htmlFor="quoteEdit">
            Цитата
              <input type="text" id="quoteEdit" name="quoteEdit" />
            </label>
            <div className="button">
              <button type="submit" className="editCeremony">Edit</button>
              <button type="submit" className="cancel">Cancel</button>
            </div>
          </form>
  
          <div className="ContainerFavorites">
            {quote.map((card) => (
              <div key={card.id} id={`quote${card.id}`} className="quoteCard">
                <h3 className="cardValue">{card.body}</h3>
                <button className="buttonDelete" id={card.id} type="submit">Delete</button>
                <button className="editButton" id={card.id} type="submit">Edit</button>
              </div>
            ))}
          </div>
        </div>
      </Layout>

    )
}