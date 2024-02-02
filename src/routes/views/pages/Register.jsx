const React = require('react');

const Layout = require('../Layout');

module.exports = function Login() {
  return (
    <Layout>
      <script defer src="/js/reg.js" />
      <div className="regPage">
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
            placeholder="Email Address"
          />
          <input
            name="password"
            type="password"
            className="passwordInput"
            id="passwordInput"
            placeholder="Enter your password"
          />
          <button type="submit">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </Layout>
  );
};
