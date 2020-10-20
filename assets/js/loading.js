window.addEventListener('load', function () {
    // 检查web3是否已经注入到(Mist/MetaMask)  
    // 现在你可以启动你的应用并自由访问 Web3.js:  
    // startApp()
    console.log(0, web3)
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        var coinbase = web3.eth.coinbase;
        var accounts = web3.eth.accounts;
        if (ethereum.selectedAddress == true) {
            console.log(ethereum.selectedAddress)
        }
        $('.push').click(function () {
            if (window.ethereum) {
                // 请求用户授权
                console.log(window.ethereum)
                window.ethereum.enable().then(function (res) {
                    setInterval(function () {
                        if (ethereum.selectedAddress !== "") {
                            location.reload()
                        }
                    }, 1500)
                })
            } else if (typeof web3 !== 'undefined') {
                web3 = new Web3(web3.currentProvider);
                web3.eth.defaultAccount = web3.eth.accounts[0];
                console.log(accounts[0])
            } else {
                // set the provider you want from Web3.providers
                web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
                console.log('error')
            }
        })
    } else {
    }
})