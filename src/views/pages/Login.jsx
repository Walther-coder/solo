const React = require('react');

const Layout = require('../Layout');

module.exports = function Login() {
  return (
    <Layout>
      <link rel="stylesheet" href="/css/login.css" />
      <script defer src="/js/loginFetch.js" />
      <div className="loginPage">
        <form action="/login" method="POST" id="loginForm" className="formContainer">
          <input
            name="login"
            type="text"
            className="loginInput"
            id="loginInput"
            placeholder="Login"
          />
          <input
            name="password"
            type="password"
            className="passwordInput"
            id="passwordInput"
            placeholder="Password"
          />
          <button type="submit">
            Войти
          </button>
        </form>
        <div id="message"></div>
      </div>
    </Layout>
  );
};
