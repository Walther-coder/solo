const React = require('react');
const Layout = require('../Layout');

module.exports = function Entry({login, entries}){
    return (
        <Layout login={login}>
            <script defer src="/js/entryFetch.js" />
            <div className='entry'>
            <form id="formCreate" className="createEntry">
            <h1 className="create">Новая запись</h1>
            <label htmlFor="entryText">
              <input type="text" id="entreTextInput" name="text" placeholder="Напишите..." />
            </label>
            <label htmlFor="entryDate">
              <input type="datetime-local" id="entreDateInput" name="date"  />
            </label>
            <button type="submit" className="addEntry">Сохранить</button>
          </form>

          <form className="formEdit" style={{ display: 'none' }}>
            <h1>Отредактировать</h1>
            <label htmlFor="editText">
            Запись:
              <input type="text" id="textEdit" name="text" />
            </label>
            <label htmlFor="editDate">
              <input type="datetime-local" id="dataEdit" name="date" />
            </label>
            <div className="button">
              <button type="submit" className="editEntry">Сохранить</button>
              <button type="submit" className="cancel">Назад</button>
            </div>
          </form>
          <div className='entryContainer'>
                <h3>Записи</h3>
                <ul>
                    {entries && entries.map((el) => (
                        <li id={`entry${el.id}`} key={el.id} className={el.status ? 'done' : 'not-done'}>
                          <p className='entryElvalue'>{el.text}</p>
                          <p className='entryElStatus'>{`${el.status}`}</p>
                            <p className='entryElDate'>{new Date(el.date).toLocaleString('en-US', {
                                 year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true,
                                    })}</p>
                          <button id={el.id} className='change' text="Change Status" type="submit">Изменить статус</button>
                          <button id={el.id} className='update-btn'>Отредактировать</button>
                          <button id={el.id} className='delete-btn'>Удалить </button>  
                        </li>
                    ) )}
                </ul>              
          </div>
            </div>
        </Layout>
    )
}