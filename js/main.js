var a = 100
var b = (100 * 1e18).toString()
var c = 100 + '000000000000000000'
console.log(b)
console.log(c)

USDT_addr = "0xf17D721369F540f7485E1033194eBf92e3f88079",
    // 测试网价格合约地址
    price_addr = "0x2600D6ef3B02bBbc14783926bB76b14EBd38f6A6",
    // USDT报价合约地址
    USDT_offer = "0xFf6ad075D75FA51cdB231da54E6dF007E60C7122",
    // 其他报价合约地址
    _offer = "0x49665947b3Ac4a75DaD7B8E59701752bEc28Ff66",
    // 分红合约地址
    Dividend_addr = "0xDE83944619005d5EE4AAB951199748D599fCff44",
    //分红NEST地址
    NEST_addr = "0xf565422eBd4A8976e1e447a849b8B483C68EFD0C",
    // 信息整合合约地址
    Integration_addr = "0x2D5990d95Ca8a53F329b7F5B1E89C53D916C7D82",
    // NEST锁仓合约地址,
    NEST_lock = "0xdC912578B5e8f24b13E79ab072a1E9C86e659694",
    web3.eth.getAccounts((error, accounts) => {
        var listContract = new web3.eth.Contract(offerAbi, USDT_offer)
        listContract.methods.list('0', '50', '0')
            .call({from: accounts[0]})
            .then(function (result) {
                var strs = new Array(); //定义一数组
                var arr = [];
                strs = result.split(","); //字符分割
                for (i = 0; i < strs.length; i += 9) {
                    arr.push(strs.slice(i, i + 9))
                }
                // this.list = arr
                console.log(arr)
                console.log(arr.length)
                // var arr = [];
                // var arr = eval(data);
                var dh = '';
                for (i = 0; i < arr.length; i++) {
                    // console.log(i)

                    // var arr = arr[i]
                    // console.log(arr[i][j])
                    // console.log("ww:" + arr[2])

                    // if (arr[i].is_show == 1) {
                    // 	var show = '显示';
                    // } else {
                    // 	var show = '隐藏';
                    // }

                    dh += '	   <div class="dd-handle">' + arr[i][7] + '</div> ';


                }
                $('#daohang').html(dh)
                // document.getElementById('daohang').innerHTML = dh;
                // for (var i = 0; i < arr.length; i++) {
                // 	$('.recommend-h')[i].innerHTML = arr[i][0]
                // 	$('.getTime')[i].innerHTML = arr[i][1]
                // 	// $('.recommend-img')[i].src = date.info.hotNews[i].imgsrc0
                // }
                // var loveStr = "";
                // for (let i = 0; i < arr.length; i++) {
                //     loveStr += '<div>' + arr[i][0] + '</div>';
                // };
                // document.getElementById("LoveID").innerHTML = arr;
                // var decimalContract = new web3.eth.Contract(NestPriceAbi, this.USDT_addr)
                // decimalContract.methods.decimals().call().then(function (result) {
                // 	var demical = "1e" + result
                // })
            })
    })
web3.eth.getAccounts((error, accounts) => {
    var pricingInfo = new web3.eth.Contract(IntegrationAbi, Integration_addr)
    pricingInfo.methods.pricingInfo(USDT_addr)
        .call({from: accounts[0]})
        .then(function (result) {
            console.log("信息整合报价页面:", result)
        })
    // var listContract = new web3.eth.Contract(offerAbi, USDT_offer)
    // listContract.methods.list('0', '50', '0')
    //     .call({ from: accounts[0] })
    //     .then(function (result) {
    //         var strs = new Array(); //定义一数组
    //         var arr = [];
    //         strs = result.split(","); //字符分割
    //         for (i = 0; i < strs.length; i += 9) {
    //             arr.push(strs.slice(i, i + 9))
    //         }
    //         console.log(arr)
    //         console.log(arr.length)
    //         // for (var i = 0; i < arr.length; i++) {
    //         // 	$('.recommend-h')[i].innerHTML = arr[i][0]
    //         // 	$('.getTime')[i].innerHTML = arr[i][1]
    //         // 	// $('.recommend-img')[i].src = date.info.hotNews[i].imgsrc0
    //         // }
    //         // var loveStr = "";
    //         // for (let i = 0; i < arr.length; i++) {
    //         //     loveStr += '<div>' + arr[i][0] + '</div>';
    //         // };
    //         // document.getElementById("LoveID").innerHTML = arr;
    //         // var decimalContract = new web3.eth.Contract(NestPriceAbi, this.USDT_addr)
    //         // decimalContract.methods.decimals().call().then(function (result) {
    //         // 	var demical = "1e" + result
    //         // })
    //     })
    // $('.tab2').click(function () {
    //     var bonusInfo = new web3.eth.Contract(IntegrationAbi, Integration_addr)
    //     bonusInfo.methods.bonusInfo(USDT_addr)
    //         .call({ from: accounts[0] })
    //         .then(function (result) {
    //             console.log("信息整合分红页面:", result)
    //             var bonusInfo = result
    //             var decimalContract = new web3.eth.Contract(NestPriceAbi, token_addr)
    //             decimalContract.methods.decimals().call().then(function (result) {
    //                 var demical = "1e" + result
    //                 var leveingBalance = bonusInfo.leveingBalance / demical
    //                 console.log(leveingBalance)
    //             })
    //         })

    // })
})
