const React = require('react');
const Layout = require('../Layout');

module.exports = function Account({login, user}) {
    return (
        <Layout login={login}>
           <script defer src="/js/accountFetch.js" />

            <div className='account'>
              <h2>Личный кабинет</h2>
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
              <h3 className='name'>Имя: </h3>
                <h3 className='login'>{login}</h3>
                <button className='editLogin' type="submit">Изменить</button>
            </div>
            <div className='emailDiv'>
              <h3 className='pochta'>Почта: </h3>
                <h3 className='email'>{user.email}</h3>
                <button className='editEmail' type="submit">Изменить</button>
            </div>
            <form className="formEditePassword">
            <h3>Изменить пароль</h3>
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
          <div className='message'></div>

            </div>

        </Layout>
    )
}