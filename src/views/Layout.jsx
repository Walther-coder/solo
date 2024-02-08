const React = require('react');

module.exports = function Layout({ children, login }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />

        <link rel="stylesheet" href="/css/style.css" />
        <title>Solo prodgect</title>
      </head>
      <body>
        <nav className="navbar">
          <div className="navbarContainer">
            <div className="navbarMenu" id="navbarMenu">
              <a className="home" href="/">
              На исходную
              </a>
            </div>
          </div>

          {login ? (
            <div className="userMenu">
              <a className="home" href="/quotesApi">
                ВКонтактовские цитаты
              </a>
              <a className="home" href="/quote/favorites">
                Избранное
              </a>
              <a className='home' href='/entry'>
                Записи
              </a>
              <div>
                <a className='exit' href="/account">
                  Привет, {login}   
                </a>
              </div>
              <div>
                <a className='exit' href="/logout">Выйти</a>
              </div>
            </div>
          ) : (
            <>
              <div className="nav-item">
                <a className="nav-link" href="/login">
                  За логиниться
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link nav-link-register" href="/register">
                   Регнутца
                </a>
              </div>
            </>
          )}

        </nav>
        {children}
      </body>
    </html>
  );
};
