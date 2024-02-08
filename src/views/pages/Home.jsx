const React = require('react');
const Layout = require('../Layout');

module.exports = function Home({ login }) {
  return (
    <Layout login={login}>
      <link rel="stylesheet" href="/css/style.css" />
      <a href="/quotesApi">
        <button type="submit">Начнем</button>
      </a>
    </Layout>
  );
};
