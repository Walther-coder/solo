const React = require('react');
const Layout = require('../Layout');

module.exports = function Home({ login }) {
  return (
    <Layout login={login}>
      <a href="/shop">
        <button type="submit">Начнем</button>
      </a>
    </Layout>
  );
};
