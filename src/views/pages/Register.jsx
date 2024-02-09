const React = require('react');

const Layout = require('../Layout');

module.exports = function Login() {
  return (
    <Layout>
       <script defer src="/js/registrationFetch.js" />
       <link rel="stylesheet" href="/css/login.css" />
      <div className="registerPage">
        <form action="/register" method="POST" id="regForm" className="formContainer">
          <input
            name="login"
            type="text"
            className="loginInput"
            id="loginInput"
            placeholder="Login"
          />
          <input
            name="email"
            type="text"
            className="emailInput"
            id="emailInput"
            placeholder="Email"
          />
          <input
            name="password"
            type="password"
            className="passwordInput"
            id="passwordInput"
            placeholder="Password"
          />
          <button type="submit">
            Зарегистрироваться
          </button>
        </form>
        <div id="message"></div>
      </div>
    </Layout>
  );
};
