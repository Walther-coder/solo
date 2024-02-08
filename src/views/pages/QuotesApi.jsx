const React = require('react');
const Layout = require('../Layout');

module.exports = function QuotesApi({login}) {
    return (
        <Layout login={login}>
            <script defer src='./js/quoteAPIFetch.js'/>
            <div className='quotesApi'>
                <h3>Здесь будет отрисовка цитат из апи</h3>
                <button id='quotyButton' type='button'>Получить цитату</button>
                <div id='quoty'>
                    
                </div>
                
            </div>

        </Layout>

    )
}