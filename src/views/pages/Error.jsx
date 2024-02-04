const React = require("react");
const Layout = require("../Layout");

module.exports = function Error({login}) {
    return(
        <Layout login={login}>
            <h5 className="text-dark rounded" style={{
                textAlign: "center",
                transform: "translateY(20px)translateX(260px)",
                fontSize: "50px",
                height: "150px",
                width: "800px",
                }
                }>Извини, {login}! 
                <p>Похоже, тебе сюда нельзя</p>
                </h5>
                <img className="logo rounded mx-auto d-block" src="/img/1.png" alt="logo.png"></img>
        </Layout>
    )
}