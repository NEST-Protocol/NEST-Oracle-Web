// 报价
function offer() {
    var offerContract = new web3.eth.Contract(offerAbi, USDT_offer)
    offerContract.methods.offer(ethAmount, erc20Amount, erc20Address)
        .send({ value: value })
        .on('transactionHash', function (hash) {
            // 发起交易
        })
        .on('receipt', function (receipt) {
            // 
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            // 
        })
        .on('error', function () {
            // 拒绝交易
        });
}
// 取回报价单资产
function turnOut(contractAddress) {
    var turnOutContract = new web3.eth.Contract(abi3, CofixRouter)
    turnOutContract.methods.turnOut(contractAddress)
        .send({ from: accounts, value: value })
        .on('transactionHash', function (hash) {
            // 发起交易
        })
        .on('receipt', function (receipt) {
            // 
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            // 
        })
        .on('error', function () {
            // 拒绝交易
        });
}
// 调用单个价格
function updateAndCheckPriceNow(tokenAddress) {
    var updateAndCheckPriceNowContract = new web3.eth.Contract(abi3, CofixRouter)
    updateAndCheckPriceNowContract.methods.addLiquidity(ethAmount, erc20Amount, erc20Address)
        .call({ from: accounts, value: value })
        .then(function (result) {
            console.log(result)
        })
}
// 吃单列表
function list(offset, count, order) {
    var listContract = new web3.eth.Contract(abi3, CofixRouter)
    listContract.methods.addLiquidity(ethAmount, erc20Amount, erc20Address)
        .call({ from: accounts, value: value })
        .then(function (result) {
            console.log(result)
        })
}
// 吃单 ETH-ERC20
function sendEthBuyErc(ethAmount, tokenAmount, contractAddress, tranEthAmount, tranTokenAmount, tranTokenAddress) {
    var sendEthBuyErcContract = new web3.eth.Contract(abi3, CofixRouter)
    sendEthBuyErcContract.methods.addLiquidity(ethAmount, erc20Amount, erc20Address)
        .send({ from: accounts, value: value })
        .on('transactionHash', function (hash) {
            // 发起交易
        })
        .on('receipt', function (receipt) {
            // 
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            // 
        })
        .on('error', function () {
            // 拒绝交易
        });
}
// 吃单 ERC20-ETH
function sendErcBuyEth(ethAmount, tokenAmount, contractAddress, tranEthAmount, tranTokenAmount, tranTokenAddress) {
    var sendErcBuyEthContract = new web3.eth.Contract(abi3, CofixRouter)
    sendErcBuyEthContract.methods.addLiquidity(ethAmount, erc20Amount, erc20Address)
        .send({ from: accounts, value: value })
        .on('transactionHash', function (hash) {
            // 发起交易
        })
        .on('receipt', function (receipt) {
            // 
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            // 
        })
        .on('error', function () {
            // 拒绝交易
        });
}
// 个人报价单列表
function find(start, count, maxFindCount, owner) {
    var findContract = new web3.eth.Contract(abi3, CofixRouter)
    findContract.methods.addLiquidity(ethAmount, erc20Amount, erc20Address)
        .call({ from: accounts, value: value })
        .then(function (result) {
            console.log(result)
        })
}
// 存入锁仓Token
function depositIn(amount, token) {
    var depositInContract = new web3.eth.Contract(abi3, CofixRouter)
    depositInContract.methods.addLiquidity(ethAmount, erc20Amount, erc20Address)
        .send({ from: accounts, value: value })
        .on('transactionHash', function (hash) {
            // 发起交易
        })
        .on('receipt', function (receipt) {
            // 
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            // 
        })
        .on('error', function () {
            // 拒绝交易
        });
}
// 取出锁仓Token
function takeOut(amount, token) {
    var takeOutContract = new web3.eth.Contract(abi3, CofixRouter)
    takeOutContract.methods.addLiquidity(ethAmount, erc20Amount, erc20Address)
        .send({ from: accounts, value: value })
        .on('transactionHash', function (hash) {
            // 发起交易
        })
        .on('receipt', function (receipt) {
            // 
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            // 
        })
        .on('error', function () {
            // 拒绝交易
        });
}
// 领取对应锁仓Token收益
function getAbonus(token) {
    var getAbonusContract = new web3.eth.Contract(abi3, CofixRouter)
    getAbonusContract.methods.addLiquidity(ethAmount, erc20Amount, erc20Address)
        .send({ from: accounts, value: value })
        .on('transactionHash', function (hash) {
            // 发起交易
        })
        .on('receipt', function (receipt) {
            // 
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            // 
        })
        .on('error', function () {
            // 拒绝交易
        });
}
// 查询分红信息
function getInfo(token) {
    var getInfoContract = new web3.eth.Contract(abi3, CofixRouter)
    getInfoContract.methods.addLiquidity(ethAmount, erc20Amount, erc20Address)
        .call({ from: accounts, value: value })
        .then(function (result) {
            console.log(result)
        })
}