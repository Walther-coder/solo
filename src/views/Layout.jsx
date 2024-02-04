const React = require('react');

module.exports = function Layout({ children, login }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <link
          type="image/x-icon"
          href="/assets/favicon.ico"
          rel="shortcut icon"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        /> */}
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
              <a className="home" href="/quote/favorites">
                Избранное
              </a>
              <a className="home" href="/shop">
                ВКонтактовские цитаты
              </a>
              <div>
                <a href="/account">
                  Hi,
                  {login}
                </a>
              </div>
              <div>
                <a href="/logout">Выйти</a>
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
                <a className="nav-link" href="/register">
                  За регатца
                </a>
              </div>
            </>
          )}

        </nav>
        {children}
        {/* <script defer src="/js/index.js" /> */}
      </body>
    </html>
  );
};
