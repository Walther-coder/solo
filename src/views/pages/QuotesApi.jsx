const React = require('react');
const Layout = require('../Layout');

module.exports = function QuotesApi({login}) {
    return (
        <Layout login={login}>
            <div className='quotesApi'>
                <h3>Здесь будет отрисовка цитат из апи</h3>
            </div>

        </Layout>

    )
}