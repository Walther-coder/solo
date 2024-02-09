const React = require('react');
const Layout = require('../Layout');

module.exports = function Home({ login }) {
  return (
    <Layout login={login}>
      <link rel="stylesheet" href="/css/home.css" />
      <div className="homePage">
      </div>
    </Layout>
  );
};
