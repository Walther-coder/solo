const React = require('react');
const Layout = require('../Layout');

module.exports = function Account({login, user}) {
    return (
        <Layout login={login}>
           <script defer src="/js/accountFetch.js" />
           <link rel="stylesheet" href="/css/account.css" />
            <div className='account'>
              <h1>Личный кабинет</h1>
              <div className='message'></div>
           <form className="dataformEdit" style={{ display: 'none' }}>
            <h1>Изменить</h1>
            <label htmlFor="editData">
              <input type="text" id="editData" name="universal" />
            </label>
            <div className="button">
              <button type="submit" className="edit" value={'/account/login'}>Сохранить</button>
              <button type="submit" className="cancel">Назад</button>
            </div>
          </form>
            <div className='loginDiv'>
              <h2 className='name'>Имя: </h2>
                <h2 className='login'>{login}</h2>
                <button className='editLogin' type="submit">Изменить</button>
            </div>
            <div className='emailDiv'>
              <h2 className='pochta'>Почта: </h2>
                <h2 className='email'>{user.email}</h2>
                <button className='editEmail' type="submit">Изменить</button>
            </div>
            <form className="formEditePassword">
            <h2>Изменить пароль</h2>
            <label htmlFor="oldPassword">
              <input type="text" id="oldPassword" name="old" placeholder="Текущий пароль" />
            </label>
            <label htmlFor="newPassword">
              <input type="text" id="newPassword" name="new" placeholder="Новый пароль"/>
            </label>
            <div className="button">
              <button type="submit" className="editPassword">Изменить</button>
            </div>
          </form>

            </div>

        </Layout>
    )
}