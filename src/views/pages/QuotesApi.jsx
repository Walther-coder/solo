const React = require('react');
const Layout = require('../Layout');

module.exports = function QuotesApi({login}) {
    return (
        <Layout login={login}>
            <script defer src='./js/quoteAPIFetch.js'/>
            <link rel="stylesheet" href="/css/quotesApi.css" />
            <div className='quotesApi'>
                <button id='quotyButton' type='button'>Получить цитату</button>
                <div id='quoty'>
                    
                </div>
                
            </div>

        </Layout>

    )
}