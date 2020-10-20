var USDT_addr = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
var HBTC_addr = "0x0316EB71485b0Ab14103307bf65a021042c6d380"
var WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
var CofiXController = "0xC16E5eECc0948604eb326296c71311aC8D9BC786"
var CofixFactory = "0xD5a19E1ADb5592921dcC42E48623d75c4C91e405"
var CofixRouter = "0x2878469c466638E8c0878bB86898073CA6C91b45"
var OracleMock = "0x7722891Ee45aD38AE05bDA8349bA4CF23cFd270F"
cofixTable = "0x944AF601d6aCf56EE4C81282ac7cE19987D25E3B"
$().ready(function () {
    window.addEventListener('load', function () {
        // 检查web3是否已经注入到(Mist/MetaMask)  
        // 现在你可以启动你的应用并自由访问 Web3.js:  
        // startApp()
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
            var coinbase = web3.eth.coinbase;
            var accounts = web3.eth.accounts;
            if (ethereum.selectedAddress == true) {
                $('.push').css('display', 'none')
                $('.dh_btn').show()
                $('.rg_usdt').show()
                $('.sh_eth_btn').show()
                $('.addressContent').text(accounts)
                $('.changePrice').css('display', 'inline-block')
            }
            $('.push').click(function () {
                if (window.ethereum) {
                    // 请求用户授权
                    window.ethereum.enable().then(function (res) {
                        $('.push').hide()
                        $(".dh_btn").show()
                        $('.sq_usdt').show()
                        // $('.rg_max').hide()
                        $('.sq_Stoken').show()
                        $('.sh_sq').hide()
                        $('.eth_btn').show()
                        $(".usdt_btn").show(0)
                        $('.changePrice').css('display', 'inline-block')
                        setInterval(function () {
                            if (ethereum.selectedAddress !== "") {
                                location.reload()
                            }
                        }, 1500)
                    })
                } else if (typeof web3 !== 'undefined') {
                    web3 = new Web3(web3.currentProvider);
                    web3.eth.defaultAccount = web3.eth.accounts[0];
                } else {
                    // set the provider you want from Web3.providers
                    web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/648e6b8ae3dc453c8acf664519577c6b"));
                }
            })
        } else {
            $('.push').hide()
            $('.sq_usdt').hide()
            // $('.rg_max').show()
            $('.rg_usdt').hide()
            $('.sq_Stoken').hide()
            $('.sh_sq').show()
            $('.sh_eth_btn').hide()
            $('.sh_usdt_btn').hide()
            $('.push').click(function () {
                $('.wallet_ts_container').show()
            })
            $('.wallet_ts_container').click(function () {
                $('.wallet_ts_container').hide()
            })
        }
    })
    // 获取k值
    window.web3.eth
        .contract(abi)
        .at(CofiXController)
        .getKInfo(USDT_addr, (err, res) => {
            // btn loading
            var opts = {
                lines: 9, // loading小块的数量
                length: 4, // 小块的长度
                width: 3, // 小块的宽度
                radius: 5, // 整个圆形的半径
                corners: 1, // 小块的圆角，越大则越圆
                rotate: 0, // loading动画的旋转度数，貌似没什么实际作用
                color: '#fff', // 颜色
                speed: 1, // 变换速度
                trail: 80, // 余晖的百分比
                shadow: false, // 是否渲染出阴影
                hwaccel: false, // 是否启用硬件加速
                className: 'spinner', // 给loading添加的css样式名
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: 'auto', // Top position relative to parent in px
                left: 240 // Left position relative to parent in px      
            };
            var k_original = res[0].toString()
            var 𝛉_original = res[2].toString()
            var 𝛉 = (res[2]) / 1e8
            var k = k_original / 1e8
            // 钱包当前账户
            web3.eth.getAccounts((error, accounts) => {
                web3.eth.defaultAccount = accounts[0];
                $('.wallet_addr').text(accounts[0])
                // 查询token授权额度
                var myContract = new web3.eth.Contract(abi, USDT_addr);
                myContract.methods.allowance(accounts[0], CofixRouter).call().then(function (result) {
                    var sqnum_usdt = web3.utils.toWei(result, 'wei');
                    if (sqnum_usdt > 0) {
                        // this.ylj3 = true;
                        $('.dh_sq_usdt').hide()
                        $(".jh_max_token").show()
                        $('.rg_max').show()
                        $('.rg_sq_token').hide()
                        $('.dh_token_max').show()
                        $(".circle3").addClass("cr").removeClass("cl");
                    } else {
                        // this.ylj3 = false;
                        $('.dh_sq_usdt').show()
                        $(".jh_max_token").hide()
                        $(".circle3").addClass("cl").removeClass("cr");
                    }
                })
                $(".dropdown .dropdownbox02 li").click(function () {
                    $('.form-control').val("")
                    $('.expectedShare').text("--")
                    $('.sh_text1').text('--')
                    $('.sh_text2').text('--')
                    var token = $(this).children("span").children(".erc_text").children("span").attr("id")
                    var imgsrc = $(this).children('span').children('.token_img').attr('src')
                    // 查询token授权额度
                    // var token = $('.usdt_rgvalue').text()
                    $('.price_token').text(token)
                    var token_addr = eval(token + "_addr")
                    var myContract3 = new web3.eth.Contract(abi2, OracleMock);
                    myContract3.methods.checkPriceNow(token_addr).call().then(function (result) {
                        var ethAmount_old = result[0]
                        var ethAmount = web3.utils.fromWei(result[0], 'ether')
                        var erc20Amount = result[1];
                        var decimalContract = new web3.eth.Contract(abi, token_addr)
                        decimalContract.methods.decimals().call().then(function (result) {
                            var demical = "1e" + result
                            var dhprice = (erc20Amount / ethAmount / demical).toFixed(8).slice(0, 14);
                            $('.price_now').text(cutZero(dhprice).toString())
                        })
                    })
                    var myContract = new web3.eth.Contract(abi, token_addr);
                    myContract.methods.allowance(accounts[0],
                        CofixRouter).call().then(function (result) {
                            var sqnum_usdt = web3.utils.toWei(result, 'wei');
                            if (sqnum_usdt > 0) {
                                $('.jh_max_token').show()
                                $('.rg_usdt').show()
                            } else {
                                $('.jh_max_token').hide()
                            }
                        })
                    // 选择交易池显示相应净值
                    var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
                    pairaddrContract.methods.getPair(token_addr).call().then(function (result) {
                        var pairaddr = result.toString()
                        if (pairaddr == "0x0000000000000000000000000000000000000000") {

                        } else {

                            $('.in_put').text(token)
                            $('.usdt_rgvalue').text(token)
                            $('.usdt_rgvalue2').text(token)
                            $('.token_icon2').attr('src', imgsrc)
                            $('.token_icon').attr('src', imgsrc)
                            var myContract3 = new web3.eth.Contract(abi2, OracleMock);
                            myContract3.methods.checkPriceNow(token_addr).call().then(function (result) {
                                var ethAmount_old = result[0]
                                var ethAmount = web3.utils.fromWei(result[0], 'ether')
                                var erc20Amount = result[1];
                                var decimalContract = new web3.eth.Contract(abi, token_addr)
                                decimalContract.methods.decimals().call().then(function (result) {
                                    var demical = "1e" + result
                                    this.dhprice = (erc20Amount / ethAmount / demical).toFixed(8).slice(0, 14);
                                    // 查净值
                                    let oraclePrice = [ethAmount_old, erc20Amount, "0", "0", "0"];
                                    var myContract4 = new web3.eth.Contract(abi2, pairaddr);
                                    myContract4.methods.getNAVPerShareForBurn(oraclePrice).call().then(function (result) {
                                        var jz_value = (result / 1e18).toFixed(8).slice(0, 14)
                                        $('.jz_ts_show').text(cutZero(jz_value))
                                        // My share value
                                        var myContract5 = new web3.eth.Contract(abi, pairaddr);
                                        myContract5.methods.balanceOf(accounts[0]).call().then(function (result) {
                                            var myShare_original = result
                                            var myShare = result / 1e18
                                            var totalsupplyContract = new web3.eth.Contract(abi, pairaddr)
                                            totalsupplyContract.methods.totalSupply().call().then(function (result) {
                                                var totalSupply = result
                                                var myShare_per = ((myShare_original / totalSupply) * 100).toFixed(4);
                                                if (myShare_per == "NaN") {
                                                    myShare_per = 0
                                                }
                                                $('.myShare_per').text(myShare_per);
                                                $('.myShare_value').text(cutZero((myShare * 1).toFixed(8).slice(0, 14)));
                                                var mytotalWorth = myShare * jz_value / 1e6
                                                $('.totalValue').text(cutZero(mytotalWorth.toFixed(8).slice(0, 14)))
                                                setInterval(function () { transaction() }, 15000)
                                            })
                                        })
                                    })
                                })
                            })
                        }
                    })
                })
                // 授权usdt
                var BN = web3.utils.BN
                $('.sq_usdt').click(function () {
                    $('.contact').css('pointer-events', 'none')
                    var target = document.getElementById('sq_usdt');
                    var spinner = new Spinner(opts).spin(target);
                    var token = $('.usdt_rgvalue').text()
                    var token_addr = eval(token + "_addr")
                    var sq_usdtContract = new web3.eth.Contract(abi, token_addr)
                    sq_usdtContract.methods.approve(CofixRouter,
                        new BN("999999999999999999999999999999999999")).send({ from: accounts[0] }).on('transactionHash', function (hash) {
                            spinner.spin(target);
                        })
                        .on('receipt', function (receipt) {
                            $(".circle2").addClass("cr").removeClass("cl");
                            $('.sq_usdt').hide()
                            $('.jh_max_token').show()
                            $('.rg_max').show()
                            $('.sh_usdt_btn').show()
                            $('.sh_eth_btn').show()
                            spinner.stop()
                            $('.contact').css('pointer-events', 'auto')
                            setTimeout(function () {
                                transaction()
                            }, 500)
                        })
                        .on('confirmation', function (confirmationNumber, receipt) {
                            spinner.stop()
                            $('.contact').css('pointer-events', 'auto')
                        })
                        .on('error', function () {
                            spinner.stop()
                            $('.contact').css('pointer-events', 'auto')
                        });
                })
                $('.dropdownbox02>ul>li').click(function () {
                    var token = $(this).children().children(".erc_text").children("span").attr('id')
                    var token_addr = eval(token + "_addr")
                    $('.addressContent').text(token_addr)
                    var myContract = new web3.eth.Contract(abi, token_addr);
                    myContract.methods.allowance(accounts[0],
                        CofixRouter).call().then(function (result) {
                            var sqnum_usdt = web3.utils.toWei(result, 'wei');
                            if (sqnum_usdt > 0) {
                                $('.jh_sq_token').hide()
                                $('.jh_max_token').show()
                                $('.rg_usdt').show()
                            } else {
                                $('.jh_sq_token').show()
                                $('.jh_max_token').hide()
                            }
                        })
                    var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
                    pairaddrContract.methods.getPair(token_addr).call().then(function (result) {
                        var pairaddr = result.toString()
                        var myContract2 = new web3.eth.Contract(abi, pairaddr);
                        myContract2.methods.allowance(accounts[0],
                            CofixRouter).call().then(function (result) {
                                var sqnum = web3.utils.toWei(result, 'wei');
                                if (sqnum > 0) {
                                    // (this.sq_text2 = false), (this.ylj = true);
                                    $('.sq_Stoken').hide()
                                    $('.sh_sq').show()
                                    $('.sh_eth_btn').css('pointer-events', "auto")
                                    $('.sh_usdt_btn').show()
                                    $(".circle2").addClass("cr").removeClass("cl");
                                } else {
                                    // (this.sq_text2 = true), (this.ylj = false);
                                    $('.sh_sq').hide()
                                    $('.sq_Stoken').show()
                                    $('.sh_eth_btn').css('pointer-events', "none")
                                    $('.sh_usdt_btn').hide()
                                    $(".circle2").addClass("cl").removeClass("cr");
                                }
                            })
                        if (pairaddr == "0x0000000000000000000000000000000000000000") {
                            $(".activate_container").show()
                        } else {
                            $(".activate_container").hide()
                        }
                    })

                    $('.property_imgbox2>p').text(token)
                    var imgsrc = "./assets/images/icon/" + token + ".png"
                    $('.property_imgbox2>img').attr("src", imgsrc)
                    $(".token_balance").text(token)
                    var myContract = new web3.eth.Contract(abi, token_addr);
                    myContract.methods.balanceOf(accounts[0]).call().then(function (result) {
                        this.usdtvalue = (result * 1).toFixed(8).slice(0, 14);
                        var decimalContract = new web3.eth.Contract(abi, token_addr)
                        decimalContract.methods.decimals().call().then(function (result) {
                            var demical = "1e" + result
                            var balance = this.usdtvalue / demical
                            $('.token_ye').text(balance)
                        })

                    })
                })
                var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
                pairaddrContract.methods.getPair(USDT_addr).call().then(function (result) {
                    var pairaddr = result.toString()
                    if (pairaddr == "0x0000000000000000000000000000000000000000") {
                        $(".USDTact_usdt").show()
                    } else {
                        $(".USDTact_usdt").hide()
                        // 授权sToken
                    }
                })
                var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
                pairaddrContract.methods.getPair(HBTC_addr).call().then(function (result) {
                    var pairaddr_HBTC = result.toString()
                    if (pairaddr_HBTC == "0x0000000000000000000000000000000000000000") {
                        $(".HBTCact_usdt").show()
                    } else {
                        $(".HBTCact_usdt").hide()
                        // 授权sToken
                    }
                })
                //pairaddress
                var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
                pairaddrContract.methods.getPair(USDT_addr).call().then(function (result) {
                    var pairaddr = result.toString()
                    // eth_usdt PriceNow
                    var myContract3 = new web3.eth.Contract(abi2, OracleMock);
                    myContract3.methods.checkPriceNow(USDT_addr).call().then(function (result) {
                        var ethAmount_old = result[0]
                        var ethAmount = web3.utils.fromWei(result[0], 'ether')
                        var erc20Amount = result[1];
                        this.dhprice = (erc20Amount / ethAmount / 1000000).toFixed(8).slice(0, 14);
                        var dhprice_new = cutZero(this.dhprice)
                        // $('.changePrice').text(((dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14))
                        // 查净值
                        let oraclePrice = [ethAmount_old, erc20Amount, "0", "0", "0"];
                        var myContract4 = new web3.eth.Contract(abi2, pairaddr);
                        myContract4.methods.getNAVPerShareForBurn(oraclePrice).call().then(function (result) {
                            var jz_value = (result / 1e18).toFixed(8).slice(0, 14)
                            $('.jz_ts_show').text(cutZero(jz_value))
                            // My share value
                            var myContract5 = new web3.eth.Contract(abi, pairaddr);
                            myContract5.methods.balanceOf(accounts[0]).call().then(function (result) {
                                var myShare = result / 1e18
                                var myShare_original = result
                                var totalsupplyContract = new web3.eth.Contract(abi, pairaddr)
                                totalsupplyContract.methods.totalSupply().call().then(function (result) {
                                    var totalSupply = result
                                    var myShare_per = ((myShare_original / totalSupply) * 100).toFixed(4);
                                    if (myShare_per == "NaN") {
                                        myShare_per = 0
                                    }
                                    $('.myShare_per').text(myShare_per);
                                    $('.myShare_value').text(cutZero((myShare * 1).toFixed(8).slice(0, 14)));
                                    var mytotalWorth = myShare * jz_value / 1e6
                                    $('.totalValue').text(cutZero(mytotalWorth.toFixed(8).slice(0, 14)))
                                    setInterval(function () { transaction() }, 15000)
                                })
                            })
                        })
                    })
                    var myContract2 = new web3.eth.Contract(abi, pairaddr);
                    myContract2.methods.allowance(accounts[0],
                        CofixRouter).call().then(function (result) {
                            var sqnum = web3.utils.toWei(result, 'wei');
                            if (sqnum > 0) {
                                $('.sq_Stoken').hide()
                                $('.sh_sq').show()
                                $('.sh_eth_btn').css('pointer-events', "auto")
                                $('.sh_usdt_btn').show()
                            } else {
                                $('.sh_sq').hide()
                                $('.sq_Stoken').show()
                                $('.sh_eth_btn').css('pointer-events', "none")
                                $('.sh_usdt_btn').hide()
                            }
                        })
                })
                if (accounts.length == 0) {
                    $('.push').css('display', 'block')
                    $('.sq_usdt').css('display', 'none')
                    $('.rg_max').hide()
                    $('.rg_usdt').css('display', 'none')
                } else {
                    $('.push').css('display', 'none')
                    $('.changePrice').css('display', 'inline-block')
                    $(".dh_btn").show()
                    $('.usdt_btn').show()
                    $('.sh_eth_btn').show()
                    $('.rg_token_max').hide()
                    $('.rg_sq_token').show()
                    $('.sq_Stoken').show()
                    $(".eth_btn").show()
                    // $('.rg_usdt').css('display', 'none')
                    // 赎回eth

                    $('.sh_eth_btn').click(function () {
                        var share = $(".myShare_value").text()
                        if (($('.choose_token1').css("display") == "block") == true) {
                            if (($.trim($('.inp_sheth').val()) !== "")) {
                                var oraclefee = 0.05
                                var value = web3.utils.toWei(oraclefee.toString(), "ether");
                                var sh_eth_num = ($(".inp_sheth").val() * 1e18).toString();
                                console.log()
                                if ($(".inp_sheth").val() * 1 > share) {
                                    $(".sh_inp").addClass("borderStyle")
                                    $('.sh_warn').show()
                                } else {
                                    $(".sh_inp").removeClass("borderStyle")
                                    $('.sh_warn').hide()

                                    var timevalue = Date.parse(new Date()) / 1000 + 600
                                    var token = $('.usdt_rgvalue2').text()
                                    token2_addr = eval(token + "_addr")
                                    var decimalContract = new web3.eth.Contract(abi, token2_addr)
                                    decimalContract.methods.decimals().call().then(function (result) {
                                        var demical = "1e" + result
                                        var num = $('.sh_text1').text()
                                        var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
                                        pairaddrContract.methods.getPair(token2_addr).call().then(function (result) {
                                            var pairaddr = result.toString()
                                            var usdt_ye_Contract = new web3.eth.Contract(abi, WETH9)
                                            usdt_ye_Contract.methods.balanceOf(pairaddr).call().then(function (result) {
                                                var token_num = result / 1e18
                                                if (sh_eth_num > result) {
                                                    $('.sh_zj').show()
                                                    $(".sh_inp").addClass("borderStyle")
                                                } else {
                                                    var target = document.getElementById('sh_eth_btn');
                                                    var spinner = new Spinner(opts).spin(target);
                                                    $('.contact').css('pointer-events', 'none')
                                                    price_cha = parseInt(num * 1e18 * .99).toString()
                                                    var sh_ethContract = new web3.eth.Contract(abi3, CofixRouter)
                                                    sh_ethContract.methods.removeLiquidityGetETH(token2_addr,
                                                        sh_eth_num,
                                                        price_cha,
                                                        accounts[0],
                                                        timevalue.toString()).send({ from: accounts[0], value: value }).on('transactionHash', function (hash) {
                                                            spinner.spin(target);
                                                        })
                                                        .on('receipt', function (receipt) {
                                                            spinner.stop()
                                                            $('.contact').css('pointer-events', 'auto')
                                                            setTimeout(function () {
                                                                transaction()
                                                            }, 500)
                                                        })
                                                        .on('confirmation', function (confirmationNumber, receipt) {
                                                            spinner.stop()
                                                            $('.contact').css('pointer-events', 'auto')
                                                        })
                                                        .on('error', function () {
                                                            spinner.stop()
                                                            $('.contact').css('pointer-events', 'auto')
                                                        });
                                                }
                                            })
                                        })

                                    })

                                }

                            }
                        } else if (($('.choose_token2').css("display") == "block") == true) {
                            var token = $('.usdt_rgvalue2').text()
                            token_addr = eval(token + "_addr")
                            if (($.trim($('.inp_sheth').val()) !== "")) {
                                var sh_usdt_num = $(".inp_sheth").val();
                                var value = web3.utils.toWei((0.05).toString(), "ether");
                                if (sh_usdt_num * 1 > share) {
                                    $(".sh_inp").addClass("borderStyle")
                                    $('.sh_warn').show()
                                } else {
                                    $(".sh_inp").removeClass("borderStyle")
                                    $('.sh_warn').hide()
                                    var decimalContract = new web3.eth.Contract(abi, token_addr)
                                    decimalContract.methods.decimals().call().then(function (result) {
                                        var demical = "1e" + result
                                        var num = $('.sh_text2').text()
                                        sh_usdt_num = ($('.inp_sheth').val() * 1e18).toString()
                                        price_cha = parseInt(num * demical * .99).toString()
                                        var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
                                        pairaddrContract.methods.getPair(token_addr).call().then(function (result) {
                                            var pairaddr = result.toString()
                                            var usdt_ye_Contract = new web3.eth.Contract(abi, token_addr)
                                            usdt_ye_Contract.methods.balanceOf(pairaddr).call().then(function (result) {
                                                var token_num = result / 1e18
                                                if (sh_eth_num > token_num) {
                                                    $('.sh_zj').show()
                                                    $(".sh_inp").addClass("borderStyle")
                                                } else {
                                                    $('.contact').css('pointer-events', 'none')
                                                    var target = document.getElementById('sh_eth_btn');
                                                    var spinner = new Spinner(opts).spin(target);
                                                    var sh_usdtContract = new web3.eth.Contract(abi3, CofixRouter)
                                                    var timevalue = Date.parse(new Date()) / 1000 + 600
                                                    sh_usdtContract.methods.removeLiquidityGetToken(token_addr,
                                                        sh_usdt_num,
                                                        price_cha,
                                                        accounts[0],
                                                        timevalue.toString()).send({ from: accounts[0], value: value }).on('transactionHash', function (hash) {
                                                            spinner.spin(target);
                                                        })
                                                        .on('receipt', function (receipt) {
                                                            spinner.stop()
                                                            $('.contact').css('pointer-events', 'auto')
                                                            setTimeout(function () {
                                                                transaction()
                                                            }, 500)
                                                        })
                                                        .on('confirmation', function (confirmationNumber, receipt) {
                                                            spinner.stop()
                                                            $('.contact').css('pointer-events', 'auto')
                                                        })
                                                        .on('error', function () {
                                                            spinner.stop()
                                                            $('.contact').css('pointer-events', 'auto')
                                                        });
                                                }
                                            })
                                        })

                                    })
                                }
                            }
                        }

                    })
                    $(".jh2").click(function () {
                        var eth_num = $('.property_eth2').val()
                        var token_num = $('.property_token2').val()
                        if (($.trim($('.property_eth2').val()) !== "")) {
                            if (($.trim($('.property_token2').val()) == "")) {
                                token_num = 0
                            }
                        }
                        if (($.trim($('.property_token2').val()) !== "")) {
                            if (($.trim($('.property_eth2').val()) == "")) {
                                eth_num = 0
                            }
                        }
                        var token = $(".property_imgbox2>p").text()
                        var amounteth = web3.utils.toWei((eth_num * 1).toString(), "ether");
                        // var amountUSDT = web3.utils.toWei((token_num * 1).toString(), "mwei");
                        var value = web3.utils.toWei((eth_num * 1 + 0.05).toString(), "ether")
                        var token_addr = eval(token + "_addr")
                        web3.eth.getBalance(accounts[0], (err, balance) => {
                            var balance_eth = (web3.utils.fromWei(balance, 'ether') * 1).toFixed(8)
                            var myContract = new web3.eth.Contract(abi, token_addr);
                            myContract.methods.balanceOf(accounts[0]).call().then(function (result) {
                                this.usdtvalue = result;
                                var decimalContract = new web3.eth.Contract(abi, token_addr)
                                decimalContract.methods.decimals().call().then(function (result) {
                                    var demical = "1e" + result
                                    if (demical == "1e18") {
                                        amountTOKEN = web3.utils.toWei((token_num * 1).toString(), "ether");
                                        this.usdtvalue = this.usdtvalue / 1e18
                                    } else if (demical == "1e6") {
                                        amountTOKEN = web3.utils.toWei((token_num * 1).toString(), "mwei")
                                        this.usdtvalue = this.usdtvalue / 1e6
                                    }
                                    if (token_num > this.usdtvalue) {
                                        $(".inp_usdt").addClass('borderStyle')
                                        $('.rg_warn').show()
                                    } else {
                                        $(".inp_usdt").removeClass('borderStyle')
                                        $('.rg_warn').hide()
                                    }
                                    if (eth_num > balance_eth * 1) {
                                        $(".inp_eth").addClass('borderStyle')
                                        $('.rg_warn').show()
                                    } else {
                                        $(".inp_eth").removeClass('borderStyle')
                                        $('.rg_warn').hide()
                                    }
                                    if ((($.trim($('.property_eth2').val()) !== "") || ($.trim($('.property_token2').val()) !== "")) && ((eth_num < balance_eth * 1) || (this.usdtvalue > token_num))) {
                                        var target = document.getElementById('jh2');
                                        var spinner = new Spinner(opts).spin(target);
                                        var myContract = new web3.eth.Contract(abi, token_addr);
                                        myContract.methods.allowance(accounts[0], CofixRouter).call().then(function (result) {
                                            var sqnum_usdt = web3.utils.toWei(result, 'wei');

                                            if (sqnum_usdt > 0) {
                                                var timevalue = Date.parse(new Date()) / 1000 + 600
                                                var rg_usdtContract = new web3.eth.Contract(abi3, CofixRouter)
                                                rg_usdtContract.methods.addLiquidity(token_addr,
                                                    amounteth,
                                                    amountTOKEN,
                                                    0,
                                                    accounts[0],
                                                    timevalue.toString()).send({ from: accounts[0], value: value }).on('transactionHash', function (hash) {
                                                        spinner.spin(target);
                                                    })
                                                    .on('receipt', function (receipt) {
                                                        spinner.stop()
                                                        $('.contact').css('pointer-events', 'auto')
                                                        setTimeout(function () {
                                                            transaction()
                                                        }, 500)
                                                    })
                                                    .on('confirmation', function (confirmationNumber, receipt) {
                                                        spinner.stop()
                                                        $('.contact').css('pointer-events', 'auto')
                                                    })
                                                    .on('error', function () {
                                                        spinner.stop()
                                                        $('.contact').css('pointer-events', 'auto')
                                                    });
                                            } else {

                                            }
                                        })
                                    }
                                })
                            })
                        })
                    })
                    $(".jh1").click(function () {
                        var eth_num = $('.property_eth').val()
                        var token_num = $('.property_token').val()
                        if (($.trim($('.property_eth').val()) !== "")) {
                            if (($.trim($('.property_token').val()) == "")) {
                                token_num = 0
                            }
                        }
                        if (($.trim($('.property_token').val()) !== "")) {
                            if (($.trim($('.property_eth').val()) == "")) {
                                eth_num = 0
                            }
                        }
                        var token = $(".usdt_rgvalue").text()
                        var amounteth = web3.utils.toWei((eth_num * 1).toString(), "ether");
                        var value = (eth_num * 1e18 + 0.05 * 1e18).toString()
                        var token_addr = eval(token + "_addr")
                        web3.eth.getBalance(accounts[0], (err, balance) => {
                            var balance_eth = (web3.utils.fromWei(balance, 'ether') * 1).toFixed(8)
                            var myContract = new web3.eth.Contract(abi, token_addr);
                            myContract.methods.balanceOf(accounts[0]).call().then(function (result) {
                                this.usdtvalue = result;
                                var decimalContract = new web3.eth.Contract(abi, token_addr)
                                decimalContract.methods.decimals().call().then(function (result) {
                                    var demical = "1e" + result
                                    if (demical == "1e18") {
                                        amountTOKEN = web3.utils.toWei((token_num * 1).toString(), "ether");
                                        this.usdtvalue = this.usdtvalue / 1e18
                                    } else if (demical == "1e6") {
                                        amountTOKEN = web3.utils.toWei((token_num * 1).toString(), "mwei")
                                        this.usdtvalue = this.usdtvalue / 1e6
                                    }
                                    console.log(eth_num, balance_eth, token_num, this.usdtvalue)
                                    if (token_num > this.usdtvalue * 1) {
                                        $(".inp_usdt").addClass('borderStyle')
                                        $('.rg_warn').show()
                                    } else {
                                        $(".inp_usdt").removeClass('borderStyle')
                                        $('.rg_warn').hide()
                                    }
                                    if (eth_num > balance_eth * 1) {
                                        $(".inp_eth").addClass('borderStyle')
                                        $('.rg_warn').show()
                                    } else {
                                        $(".inp_eth").removeClass('borderStyle')
                                        $('.rg_warn').hide()
                                    }
                                    console.log(balance_eth, this.usdtvalue, eth_num)
                                    if ((($.trim($('.property_eth').val()) !== "") || ($.trim($('.property_token').val()) !== "")) && ((eth_num * 1 <= balance_eth * 1) && (this.usdtvalue * 1 >= token_num * 1))) {
                                        var target = document.getElementById('jh1');
                                        var spinner = new Spinner(opts).spin(target);
                                        var myContract = new web3.eth.Contract(abi, token_addr);
                                        myContract.methods.allowance(accounts[0], CofixRouter).call().then(function (result) {
                                            var sqnum_usdt = web3.utils.toWei(result, 'wei');
                                            if (sqnum_usdt > 0) {
                                                var token = $('.usdt_rgvalue').text()
                                                token_addr = eval(token + "_addr")
                                                var decimalContract = new web3.eth.Contract(abi, token_addr)
                                                decimalContract.methods.decimals().call().then(function (result) {
                                                    var demical = "1e" + result
                                                    var num = $('.expectedShare').text()
                                                    // var price = $('.inp_usdt').val()
                                                    price_cha = parseInt(num * 1e18 * .99).toString()
                                                    var timevalue = Date.parse(new Date()) / 1000 + 600
                                                    var rg_usdtContract = new web3.eth.Contract(abi3, CofixRouter)
                                                    rg_usdtContract.methods.addLiquidity(token_addr,
                                                        amounteth,
                                                        amountTOKEN,
                                                        price_cha,
                                                        accounts[0],
                                                        timevalue.toString()).send({ from: accounts[0], value: value }).on('transactionHash', function (hash) {
                                                            spinner.spin(target);
                                                        })
                                                        .on('receipt', function (receipt) {
                                                            spinner.stop()
                                                            $('.contact').css('pointer-events', 'auto')
                                                            setTimeout(function () {
                                                                transaction()
                                                            }, 500)
                                                        })
                                                        .on('confirmation', function (confirmationNumber, receipt) {
                                                            spinner.stop()
                                                            $('.contact').css('pointer-events', 'auto')
                                                        })
                                                        .on('error', function () {
                                                            spinner.stop()
                                                            $('.contact').css('pointer-events', 'auto')
                                                        });
                                                })

                                            } else {

                                            }
                                        })

                                    }

                                })

                            })

                        })
                    })
                    web3.eth.getBalance(accounts[0], (err, balance) => {
                        var balance_eth = (web3.utils.fromWei(balance, 'ether') * 1).toFixed(8)
                        $('.balance_eth').text(balance_eth)
                    })
                    var myContract = new web3.eth.Contract(abi, USDT_addr);
                    myContract.methods.balanceOf(accounts[0]).call().then(function (result) {
                        this.usdtvalue = (result * 1).toFixed(8).slice(0, 14);
                        $('.balance_usdt').text(this.usdtvalue)
                    })
                }
            }
            )
        });
})
$('.op1').click(function () {
    $('.sh_text2').text("--")
    var token = $(".usdt_rgvalue2").text()
    token_addr = eval(token + "_addr")
    var getKInfoContract = new web3.eth.Contract(abi, CofiXController)
    getKInfoContract.methods.getKInfo(token_addr).call().then(function (result) {
        var k_original = result[0]
        var k = k_original / 1e8
        var 𝛉 = result[2] / 1e8
        // eth_usdt PriceNow
        var myContract3 = new web3.eth.Contract(abi2, OracleMock);
        myContract3.methods.checkPriceNow(token_addr).call().then(function (result) {
            var ethAmount_old = result[0]
            var erc20Amount = result[1];
            var BN = web3.utils.BN;
            // 查净值
            let oraclePrice = [ethAmount_old, erc20Amount, "0", k_original.toString(), "0"];
            var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
            pairaddrContract.methods.getPair(token_addr).call().then(function (result) {
                var pairaddr = result.toString()
                var myContract4 = new web3.eth.Contract(abi2, pairaddr);
                myContract4.methods.getNAVPerShareForBurn(oraclePrice).call().then(function (result) {
                    var jz_value = (result / 1e18).toFixed(8).slice(0, 14)
                    var myContract3 = new web3.eth.Contract(abi2, OracleMock);
                    myContract3.methods.checkPriceNow(token_addr).call().then(function (result) {
                        var ethAmount_old = result[0]
                        var ethAmount = web3.utils.fromWei(result[0], 'ether')
                        var erc20Amount = result[1];
                        var decimalContract = new web3.eth.Contract(abi, token_addr)
                        decimalContract.methods.decimals().call().then(function (result) {
                            var demical = "1e" + result
                            var price = (erc20Amount / ethAmount / (demical) * 1)
                            var valx = $(".inp_sheth").val();
                            var sh_num = valx * jz_value * (1 - 𝛉)
                            $(".sh_text1").text(cutZero(sh_num.toFixed(8).slice(0, 14).toString()))
                            $(".sh_text2").text("--")

                        })
                    })
                })
            })
        })
    })
})
$('.op2').click(function () {
    $('.sh_text1').text("--")
    var token = $(".usdt_rgvalue2").text()
    token_addr = eval(token + "_addr")
    var getKInfoContract = new web3.eth.Contract(abi, CofiXController)
    getKInfoContract.methods.getKInfo(token_addr).call().then(function (result) {
        var k_original = result[0]
        var k = k_original / 1e8
        var 𝛉 = result[2] / 1e8
        // eth_usdt PriceNow
        var myContract3 = new web3.eth.Contract(abi2, OracleMock);
        myContract3.methods.checkPriceNow(token_addr).call().then(function (result) {
            var ethAmount_old = result[0]
            var erc20Amount = result[1];
            var BN = web3.utils.BN;
            // 查净值
            let oraclePrice = [ethAmount_old, erc20Amount, "0", k_original.toString(), "0"];
            var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
            pairaddrContract.methods.getPair(token_addr).call().then(function (result) {
                var pairaddr = result.toString()
                var myContract4 = new web3.eth.Contract(abi2, pairaddr);
                myContract4.methods.getNAVPerShareForBurn(oraclePrice).call().then(function (result) {
                    var jz_value = (result / 1e18).toFixed(8).slice(0, 14)
                    var myContract3 = new web3.eth.Contract(abi2, OracleMock);
                    myContract3.methods.checkPriceNow(token_addr).call().then(function (result) {
                        var ethAmount_old = result[0]
                        var ethAmount = web3.utils.fromWei(result[0], 'ether')
                        var erc20Amount = result[1];
                        var decimalContract = new web3.eth.Contract(abi, token_addr)
                        decimalContract.methods.decimals().call().then(function (result) {
                            var demical = "1e" + result
                            var price = (erc20Amount / ethAmount / (demical) * 1)
                            var valx = $(".inp_sheth").val();

                            var sh_num = valx * jz_value * (price * (1 - k)) * (1 - 𝛉)
                            $(".sh_text2").text(cutZero(sh_num.toFixed(8).slice(0, 14).toString()))
                            $(".sh_text1").text("--")

                        })
                    })
                })
            })
        })
    })
    // $('.inp_sheth').val("")
})
$('.dh_sq_usdt').click(function () {
    web3.eth.getAccounts((error, accounts) => {
        var BN = web3.utils.BN
        $('.contact').css('pointer-events', 'none')
        var target = document.getElementById('sq_usdt');
        var spinner = new Spinner(opts).spin(target);
        var token = $('.btn_select>span').text()
        var token_addr = eval(token + "_addr")
        var sq_usdtContract = new web3.eth.Contract(abi, token_addr)
        sq_usdtContract.methods.approve(CofixRouter,
            new BN("999999999999999999999999999999999999")).send({ from: accounts[0] }).on('transactionHash', function (hash) {
                spinner.spin(target);
            })
            .on('receipt', function (receipt) {
                $(".circle2").addClass("cr").removeClass("cl");
                $('.sq_usdt').hide()
                $('.jh_max_token').show()
                $('.rg_max').show()
                $('.sh_usdt_btn').show()
                $('.sh_eth_btn').show()
                $('.dh_sq_usdt').hide()
                $('.dh_token_max').show()
                spinner.stop()
                $('.contact').css('pointer-events', 'auto')
                setTimeout(function () {
                    transaction()
                }, 500)
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                spinner.stop()
                $('.contact').css('pointer-events', 'auto')
            })
            .on('error', function () {
                spinner.stop()
                $('.contact').css('pointer-events', 'auto')
            });
    })

})
$('.sq_eth').click(function () {
    web3.eth.getAccounts((error, accounts) => {
        var BN = web3.utils.BN
        $('.contact').css('pointer-events', 'none')
        var target = document.getElementById('sq_usdt');
        var spinner = new Spinner(opts).spin(target);
        var token = $('.btn_select2>span').text()
        var token_addr = eval(token + "_addr")
        var sq_usdtContract = new web3.eth.Contract(abi, token_addr)
        sq_usdtContract.methods.approve(CofixRouter,
            new BN("999999999999999999999999999999999999")).send({ from: accounts[0] }).on('transactionHash', function (hash) {
                spinner.spin(target);
            })
            .on('receipt', function (receipt) {
                $(".circle2").addClass("cr").removeClass("cl");
                $('.sq_usdt').hide()
                $('.jh_max_token').show()
                $('.rg_max').show()
                $('.sh_usdt_btn').show()
                $('.sh_eth_btn').show()
                $('.sq_eth').hide()
                $('.dh_eth_max').show()
                spinner.stop()
                $('.contact').css('pointer-events', 'auto')
                setTimeout(function () {
                    transaction()
                }, 500)
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                spinner.stop()
                $('.contact').css('pointer-events', 'auto')
            })
            .on('error', function () {
                spinner.stop()
                $('.contact').css('pointer-events', 'auto')
            });
    })

})
$('.changetoken>ul>li').click(function () {
    $('.conversionPrice').hide()
})
$('.changetoken>ul>li').click(function () {
    setTimeout(() => {
        web3.eth.getAccounts((error, accounts) => {
            var token1 = $('.btn_select2>span').text()
            var token2 = $('.btn_select>span').text()
            web3.eth.defaultAccount = accounts[0];
            if (token1 == "ETH") {
                // var token_addr1 = eval(token1 + "_addr")
                // $('.sq_eth').hide()
                $('.sq_eth').hide()
                $('.dh_eth_max').show()
                var token_addr2 = eval(token2 + "_addr")
                var myContract2 = new web3.eth.Contract(abi, token_addr2);
                myContract2.methods.allowance(accounts[0],
                    CofixRouter).call().then(function (result) {
                        var sqnum_usdt = web3.utils.toWei(result, 'wei');
                        if (sqnum_usdt > 0) {
                            $('.dh_sq_usdt').hide()
                            $('.dh_token_max').show()

                        } else {
                            $('.dh_sq_usdt').show()
                            $('.dh_token_max').hide()
                        }
                    })
            }
            if (token1 !== "ETH" && token2 !== "ETH") {
                var token_addr1 = eval(token1 + "_addr")
                var token_addr2 = eval(token2 + "_addr")
                var myContract1 = new web3.eth.Contract(abi, token_addr1);
                myContract1.methods.allowance(accounts[0],
                    CofixRouter).call().then(function (result) {
                        var sqnum_usdt = web3.utils.toWei(result, 'wei');
                        if (sqnum_usdt > 0) {
                            $('.sq_eth').hide()
                            $('.dh_eth_max').show()

                        } else {
                            $('.sq_eth').show()
                            $('.dh_eth_max').hide()
                        }
                    })

                var myContract2 = new web3.eth.Contract(abi, token_addr2);
                myContract2.methods.allowance(accounts[0],
                    CofixRouter).call().then(function (result) {
                        var sqnum_usdt = web3.utils.toWei(result, 'wei');
                        if (sqnum_usdt > 0) {
                            $('.dh_sq_usdt').hide()
                            $('.dh_token_max').show()

                        } else {
                            $('.dh_sq_usdt').show()
                            $('.dh_token_max').hide()
                        }
                    })
            }
            if (token2 == "ETH") {
                $(".dh_sq_usdt").hide()
                $('.dh_token_max').show()
                var token_addr1 = eval(token1 + "_addr")
                var myContract2 = new web3.eth.Contract(abi, token_addr1);
                myContract2.methods.allowance(accounts[0],
                    CofixRouter).call().then(function (result) {
                        var sqnum_usdt = web3.utils.toWei(result, 'wei');
                        if (sqnum_usdt > 0) {
                            $('.sq_eth').hide()
                            $('.dh_eth_max').show()
                        } else {
                            $('.sq_eth').show()
                            $('.dh_eth_max').hide()
                        }
                    })
            }
        })
    }, 1000);
})
$('.change').click(function () {
    var token1 = $('.btn_select2>span').text()
    var token2 = $('.btn_select>span').text()
    web3.eth.getAccounts((error, accounts) => {
        web3.eth.defaultAccount = accounts[0];
        if (token1 == "ETH") {
            // var token_addr1 = eval(token1 + "_addr")
            $('.dh_sq_usdt').hide()
            $('.dh_token_max').show()
            var token_addr2 = eval(token2 + "_addr")
            var myContract2 = new web3.eth.Contract(abi, token_addr2);
            myContract2.methods.allowance(accounts[0],
                CofixRouter).call().then(function (result) {
                    var sqnum_usdt = web3.utils.toWei(result, 'wei');
                    if (sqnum_usdt > 0) {
                        $('.sq_eth').hide()
                        $('.dh_eth_max').show()
                    } else {
                        $('.sq_eth').show()
                        $('.dh_eth_max').hide()
                    }
                })
        }
        if (token1 !== "ETH" && token2 !== "ETH") {
            var token_addr1 = eval(token1 + "_addr")
            var token_addr2 = eval(token2 + "_addr")
            var myContract1 = new web3.eth.Contract(abi, token_addr1);
            myContract1.methods.allowance(accounts[0],
                CofixRouter).call().then(function (result) {
                    var sqnum_usdt = web3.utils.toWei(result, 'wei');
                    if (sqnum_usdt > 0) {
                        $('.dh_sq_usdt').hide()
                        $('.dh_token_max').show()
                    } else {
                        $('.dh_sq_usdt').show()
                        $('.dh_token_max').hide()
                    }
                })

            var myContract2 = new web3.eth.Contract(abi, token_addr2);
            myContract2.methods.allowance(accounts[0],
                CofixRouter).call().then(function (result) {
                    var sqnum_usdt = web3.utils.toWei(result, 'wei');
                    if (sqnum_usdt > 0) {
                        $('.sq_eth').hide()
                        $('.dh_eth_max').show()
                    } else {
                        $('.sq_eth').show()
                        $('.dh_eth_max').hide()
                    }
                })
        }
        if (token2 == "ETH") {
            $(".sq_eth").hide()
            $('.dh_eth_max').show()
            var token_addr1 = eval(token1 + "_addr")
            var myContract2 = new web3.eth.Contract(abi, token_addr1);
            myContract2.methods.allowance(accounts[0],
                CofixRouter).call().then(function (result) {
                    var sqnum_usdt = web3.utils.toWei(result, 'wei');
                    if (sqnum_usdt > 0) {
                        $('.dh_sq_usdt').hide()
                        $('.dh_token_max').show()

                    } else {
                        $('.dh_sq_usdt').show()
                        $('.dh_token_max').hide()
                    }
                })
        }
    })
})
// var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
var opts = {
    lines: 9, // loading小块的数量
    length: 4, // 小块的长度
    width: 3, // 小块的宽度
    radius: 5, // 整个圆形的半径
    corners: 1, // 小块的圆角，越大则越圆
    rotate: 0, // loading动画的旋转度数，貌似没什么实际作用
    color: '#fff', // 颜色
    speed: 1, // 变换速度
    trail: 80, // 余晖的百分比
    shadow: false, // 是否渲染出阴影
    hwaccel: false, // 是否启用硬件加速
    className: 'spinner', // 给loading添加的css样式名
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 220 // Left position relative to parent in px      
};
var opts2 = {
    lines: 9, // loading小块的数量
    length: 4, // 小块的长度
    width: 3, // 小块的宽度
    radius: 5, // 整个圆形的半径
    corners: 1, // 小块的圆角，越大则越圆
    rotate: 0, // loading动画的旋转度数，貌似没什么实际作用
    color: '#fff', // 颜色
    speed: 1, // 变换速度
    trail: 80, // 余晖的百分比
    shadow: false, // 是否渲染出阴影
    hwaccel: false, // 是否启用硬件加速
    className: 'spinner', // 给loading添加的css样式名
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 10, // Top position relative to parent in px
    left: 80 // Left position relative to parent in px      
};
$('.sq_Stoken').click(function () {
    var token = $('.usdt_rgvalue2').text()
    token_addr = eval(token + '_addr')
    var target1 = document.getElementById('sToken1');
    var spinner1 = new Spinner(opts2).spin(target1);
    var target2 = document.getElementById('sToken2');
    var spinner2 = new Spinner(opts2).spin(target2);
    var BN = web3.utils.BN
    var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
    pairaddrContract.methods.getPair(token_addr).call().then(function (result) {
        var pairaddr = result.toString()
        web3.eth.getAccounts((error, accounts) => {
            var sq_StokenContract = new web3.eth.Contract(abi, pairaddr)
            sq_StokenContract.methods.approve(CofixRouter,
                new BN('999999999999999999999999999999999999')).send({ from: accounts[0] }).on('transactionHash', function (hash) {
                    spinner1.spin(target1);
                    spinner2.spin(target2);
                })
                .on('receipt', function (receipt) {
                    $(".circle2").addClass("cr").removeClass("cl");
                    $('.sq_Stoken').hide()
                    $('.sh_sq').show()
                    $('.sh_usdt_btn').show()
                    $('.sh_eth_btn').css('pointer-events', 'auto')
                    spinner1.stop()
                    spinner2.stop()
                    setTimeout(function () {
                        transaction()
                    }, 500)
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                    spinner1.stop()
                    spinner2.stop()
                })
                .on('error', function () {
                    spinner1.stop()
                    spinner2.stop()
                });
        })


    })

})
$('.dh_btn').click(function () {
    var fir_name = $('.btn_select2>span').text()
    var sec_name = $('.btn_select>span').text()
    var rgusdt = $(".inp1").val()
    var dhnum = $('.inp2').val()
    var oraclefee = 0.05
    var amountIn_u = web3.utils.toWei((rgusdt * 1).toString(), 'ether')
    var _msgValue_u = ((rgusdt * 1e18) + (oraclefee * 1e18)).toString()

    var BN = web3.utils.BN
    web3.eth.getAccounts((error, accounts) => {
        web3.eth.defaultAccount = accounts[0];
        if (fir_name == "ETH") {
            if (sec_name == "USDT") {
                token_addr = USDT_addr
            } else if (sec_name == "HBTC") {
                token_addr = HBTC_addr
            }
            // eth资金池余额
            web3.eth.getBalance(accounts[0], (err, result) => {
                var zjc_eth = result / 1e18
                // usdt资金池余额
                var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
                pairaddrContract.methods.getPair(token_addr).call().then(function (result) {
                    var pairaddr = result.toString()
                    var usdt_ye_Contract = new web3.eth.Contract(abi, token_addr)
                    usdt_ye_Contract.methods.balanceOf(pairaddr).call().then(function (result) {
                        var token_num = result
                        var decimalContract = new web3.eth.Contract(abi, token_addr)
                        decimalContract.methods.decimals().call().then(function (result) {
                            var demical = "1e" + result
                            var zjc_token = token_num / demical
                            if (rgusdt > zjc_eth * 1) {
                                $('.dh_border').addClass("borderStyle")
                                $(".wallet_warn").show()
                            } else {
                                $('.dh_border').removeClass("borderStyle")
                                $(".wallet_warn").hide()
                            }
                            if (dhnum > zjc_token * 1) {
                                $('.dh_border2').addClass("borderStyle")
                                $(".market_warn").show()
                            } else {
                                $('.dh_border2').removeClass("borderStyle")
                                $(".market_warn").hide()
                            }
                            if (rgusdt > 0 && rgusdt < zjc_eth && dhnum < zjc_token) {
                                var decimalContract = new web3.eth.Contract(abi, token_addr)
                                decimalContract.methods.decimals().call().then(function (result) {
                                    var demical = "1e" + result
                                    var num = $('.inp1').val()
                                    var price = $('.changePrice').text()
                                    price_cha = parseInt(num * price * demical * .99).toString()
                                    var target = document.getElementById('dh_btn');
                                    var spinner = new Spinner(opts).spin(target);
                                    $('.contact').css('pointer-events', 'none')
                                    var timevalue = Date.parse(new Date()) / 1000 + 600
                                    var swapfortokenContract = new web3.eth.Contract(abi3, CofixRouter)
                                    swapfortokenContract.methods.swapExactETHForTokens(token_addr,
                                        amountIn_u,
                                        price_cha,
                                        accounts[0],
                                        timevalue,
                                    ).send({ from: accounts[0], value: _msgValue_u }).on('transactionHash', function (hash) {
                                        spinner.spin(target);
                                    })
                                        .on('receipt', function (receipt) {
                                            spinner.stop()
                                            $('.contact').css('pointer-events', 'auto')
                                            setTimeout(function () {
                                                transaction()
                                            }, 500)
                                        })
                                        .on('confirmation', function (confirmationNumber, receipt) {
                                            spinner.stop()
                                            $('.contact').css('pointer-events', 'auto')
                                            setTimeout(function () {
                                                transaction()
                                            }, 500)
                                        })
                                        .on('error', function () {
                                            spinner.stop()
                                            $('.contact').css('pointer-events', 'auto')
                                        });
                                })

                            }
                        })

                    })
                })


            })

        } else {
            var rgeth = $(".inp1").val();
            var dh_val2 = $(".inp2").val();

            if (sec_name == "ETH") {
                var token_addr1 = eval(fir_name + "_addr")
                // usdt资金池余额

                var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
                pairaddrContract.methods.getPair(token_addr1).call().then(function (result) {
                    var pairaddr = result.toString()

                    var usdt_ye_Contract = new web3.eth.Contract(abi, WETH9)
                    usdt_ye_Contract.methods.balanceOf(pairaddr).call().then(function (result) {
                        var token_num = result / 1e18
                        var decimalContract = new web3.eth.Contract(abi, token_addr1)
                        decimalContract.methods.decimals().call().then(function (result) {
                            var demical = "1e" + result
                            var zjc_token = token_num
                            var myContract = new web3.eth.Contract(abi, token_addr1);
                            myContract.methods.balanceOf(accounts[0]).call().then(function (result) {
                                var zjc_eth = result / demical
                                if (rgeth > zjc_eth * 1) {
                                    $('.dh_border').addClass("borderStyle")
                                    $(".wallet_warn").show()
                                } else {
                                    $('.dh_border').removeClass("borderStyle")
                                    $(".wallet_warn").hide()
                                }
                                if (dh_val2 > zjc_token) {
                                    $('.dh_border2').addClass("borderStyle")
                                    $(".market_warn").show()
                                } else {
                                    $('.dh_border2').removeClass("borderStyle")
                                    $(".market_hide").hide()
                                }
                                if (rgeth > 0 && rgeth < zjc_eth * 1 && dh_val2 < zjc_token * 1) {
                                    $('.contact').css('pointer-events', 'none')
                                    var target = document.getElementById('dh_btn');
                                    var spinner = new Spinner(opts).spin(target);
                                    var _amountIn_e = web3.utils.toWei(rgeth, "mwei");
                                    var _msgValue_e = web3.utils.toWei(oraclefee.toString(), "ether");
                                    var decimalContract = new web3.eth.Contract(abi, token_addr1)
                                    decimalContract.methods.decimals().call().then(function (result) {
                                        var demical = "1e" + result

                                        var num = $('.inp1').val()
                                        var price = $('.changePrice').text()
                                        price_cha = parseInt(num * price * 1e18 * .99).toString()
                                        if (demical == "1e18") {
                                            var _amountIn_e = web3.utils.toWei(rgeth, "ether");
                                        } else if (demical == "1e6") {
                                            var _amountIn_e = web3.utils.toWei(rgeth, "mwei");
                                        }
                                        var timevalue = Date.parse(new Date()) / 1000 + 600
                                        var swapforethContract = new web3.eth.Contract(abi3, CofixRouter)
                                        swapforethContract.methods.swapExactTokensForETH(token_addr1,
                                            _amountIn_e,
                                            price_cha,
                                            accounts[0],
                                            timevalue.toString()).send({ from: accounts[0], value: _msgValue_e }).on('transactionHash', function (hash) {
                                                spinner.spin(target);
                                            })
                                            .on('receipt', function (receipt) {
                                                spinner.stop()
                                                $('.contact').css('pointer-events', 'auto')
                                                setTimeout(function () {
                                                    transaction()
                                                }, 500)
                                            })
                                            .on('confirmation', function (confirmationNumber, receipt) {
                                                spinner.stop()
                                                $('.contact').css('pointer-events', 'auto')
                                                setTimeout(function () {
                                                    transaction()
                                                }, 500)
                                            })
                                            .on('error', function () {
                                                spinner.stop()
                                                $('.contact').css('pointer-events', 'auto')
                                            });
                                    })

                                }
                            })
                        })
                    })
                })

            } else {
                token1_addr = eval(fir_name + "_addr")
                token2_addr = eval(sec_name + "_addr")

                var _msgValue_e = web3.utils.toWei((oraclefee * 2).toString(), "ether");
                var dh_token_val1 = $('.inp1').val()
                var dh_token_val2 = $('.inp2').val()
                var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
                pairaddrContract.methods.getPair(token1_addr).call().then(function (result) {
                    var pairaddr2 = result.toString()
                    var usdt_ye_Contract = new web3.eth.Contract(abi, WETH9)
                    usdt_ye_Contract.methods.balanceOf(pairaddr2).call().then(function (result) {
                        var token_num = result / 1e18

                        var myContract3 = new web3.eth.Contract(abi2, OracleMock);
                        myContract3.methods.checkPriceNow(token1_addr).call().then(function (result) {
                            var ethAmount_old = result[0]
                            var ethAmount = web3.utils.fromWei(result[0], 'ether')
                            var erc20Amount = result[1];
                            var decimalContract = new web3.eth.Contract(abi, token1_addr)
                            decimalContract.methods.decimals().call().then(function (result) {
                                var demical = "1e" + result
                                var per_dhprice = (erc20Amount / ethAmount / (demical) * 1);
                                var getKInfoContract = new web3.eth.Contract(abi, CofiXController)
                                getKInfoContract.methods.getKInfo(token1_addr).call().then(function (result) {
                                    var k_original = result[0]
                                    var k = k_original / 1e8
                                    var 𝛉 = result[2] / 1e8
                                    var weth = dh_token_val1 * 1 / per_dhprice * (1 + k) * (1 - 𝛉)


                                    // usdt资金池余额
                                    var usdt_ye_Contract = new web3.eth.Contract(abi, token1_addr)
                                    usdt_ye_Contract.methods.balanceOf(accounts[0]).call().then(function (result) {
                                        var token_num = result
                                        var decimalContract = new web3.eth.Contract(abi, token1_addr)
                                        decimalContract.methods.decimals().call().then(function (result) {
                                            var demical = "1e" + result
                                            if (demical == "1e18") {
                                                var _amountIn_e = web3.utils.toWei(rgeth, 'ether')
                                            } else if (demical == "1e6") {
                                                var _amountIn_e = web3.utils.toWei(rgeth, 'mwei')
                                            }
                                            var zjc_token = token_num / demical
                                            var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
                                            pairaddrContract.methods.getPair(token2_addr).call().then(function (result) {
                                                var pairaddr1 = result.toString()
                                                var myContract = new web3.eth.Contract(abi, token2_addr);
                                                myContract.methods.balanceOf(pairaddr1).call().then(function (result) {
                                                    var usdtvalue = result;
                                                    var decimalContract = new web3.eth.Contract(abi, token2_addr)
                                                    decimalContract.methods.decimals().call().then(function (result) {
                                                        var demical = "1e" + result
                                                        var zjc_eth = (usdtvalue / (demical))
                                                        console.log(dh_token_val1, zjc_token, dh_token_val2, zjc_eth)
                                                        if (token_num < weth) {
                                                            $('.dh_border').addClass('borderStyle')
                                                            $('.market_warn').show()
                                                        }
                                                        if (dh_token_val1 > zjc_token) {
                                                            $('.dh_border').addClass("borderStyle")
                                                            $(".wallet_warn").show()
                                                        } else {
                                                            $('.dh_border').removeClass("borderStyle")
                                                            $(".wallet_warn").hide()
                                                        }
                                                        if (dh_token_val2 > zjc_eth) {
                                                            $('.dh_border2').addClass("borderStyle")
                                                            $(".market_warn").show()
                                                        } else {
                                                            $('.dh_border2').removeClass("borderStyle")
                                                            $(".market_warn").hide()
                                                        }
                                                        if (dh_token_val1 > 0 && dh_token_val1 < zjc_token && dh_token_val2 < zjc_eth) {
                                                            $('.contact').css('pointer-events', 'none')
                                                            var target = document.getElementById('dh_btn');
                                                            var spinner = new Spinner(opts).spin(target);
                                                            var timevalue = Date.parse(new Date()) / 1000 + 600
                                                            var decimalContract = new web3.eth.Contract(abi, token2_addr)
                                                            decimalContract.methods.decimals().call().then(function (result) {
                                                                var demical = "1e" + result
                                                                var num = $('.inp1').val()
                                                                var price = $('.changePrice').text()
                                                                price_cha = parseInt(num * price * demical * .99 * .99).toString()

                                                                var swapforethContract = new web3.eth.Contract(abi3, CofixRouter)
                                                                swapforethContract.methods.swapExactTokensForTokens(token1_addr, token2_addr,
                                                                    _amountIn_e,
                                                                    price_cha,
                                                                    accounts[0],
                                                                    timevalue.toString()).send({ from: accounts[0], value: _msgValue_e }).on('transactionHash', function (hash) {
                                                                        spinner.spin(target);
                                                                    })
                                                                    .on('receipt', function (receipt) {
                                                                        spinner.stop()
                                                                        $('.contact').css('pointer-events', 'auto')
                                                                        setTimeout(function () {
                                                                            transaction()
                                                                        }, 500)
                                                                    })
                                                                    .on('confirmation', function (confirmationNumber, receipt) {
                                                                        spinner.stop()
                                                                        $('.contact').css('pointer-events', 'auto')
                                                                        setTimeout(function () {
                                                                            transaction()
                                                                        }, 500)
                                                                    })
                                                                    .on('error', function () {
                                                                        spinner.stop()
                                                                        $('.contact').css('pointer-events', 'auto')
                                                                    });
                                                            })

                                                        }
                                                    })
                                                })
                                            })

                                        })
                                    })

                                })
                            })
                        })
                    })
                })
            }
        }
    })

})
// 兑换页面输入
$(".inp1").bind("input propertychange", function () {
    var token_fir = $('.btn_select>span').text()
    var token_sec = $('.btn_select2>span').text()
    $('.tk1').text(token_sec)
    $('.tk2').text(token_fir)
    var getKInfoContract = new web3.eth.Contract(abi, CofiXController)
    getKInfoContract.methods.getKInfo(USDT_addr).call().then(function (result) {
        var k_original = result[0]
        var k = k_original / 1e8
        var 𝛉 = result[2] / 1e8
        var getKInfoContract = new web3.eth.Contract(abi, CofiXController)
        getKInfoContract.methods.getKInfo(HBTC_addr).call().then(function (result) {
            var k_original1 = result[0]
            var k1 = k_original1 / 1e8
            var 𝛉1 = result[2] / 1e8
            var myContract3 = new web3.eth.Contract(abi2, OracleMock);
            myContract3.methods.checkPriceNow(USDT_addr).call().then(function (result) {
                var ethAmount_old = result[0]
                var ethAmount = web3.utils.fromWei(result[0], 'ether')
                var erc20Amount = result[1];
                this.dhprice = (erc20Amount / ethAmount / 1000000).toFixed(8).slice(0, 14);
                var uisdtP = (erc20Amount / ethAmount / 1000000)
                var dhprice_new = cutZero(this.dhprice)
                var price = this.dhprice
                var myContract3 = new web3.eth.Contract(abi2, OracleMock);
                myContract3.methods.checkPriceNow(HBTC_addr).call().then(function (result) {
                    var ethAmount_old = result[0]
                    var ethAmount = web3.utils.fromWei(result[0], 'ether')
                    var erc20Amount = result[1];
                    var decimalContract = new web3.eth.Contract(abi, HBTC_addr)
                    decimalContract.methods.decimals().call().then(function (result) {
                        var demical = "1e" + result
                        this.dhprice = (erc20Amount / ethAmount / (demical) * 1).toFixed(8).slice(0, 14);
                        var hbtcP = (erc20Amount / ethAmount / (demical) * 1)
                        var dhprice_new2 = cutZero(this.dhprice)
                        var hbtc_usdtPrice = (uisdtP / hbtcP).toFixed(8).slice(0, 14)
                        var fir_name = $('.btn_select2>span').text()
                        var sec_name = $('.btn_select>span').text()
                        var val1 = $(".inp1").val();
                        if (val1 == "") {
                            $('.inp2').attr('placeholder', '--')
                        }
                        web3.eth.getAccounts((error, accounts) => {
                            web3.eth.defaultAccount = accounts[0];
                            if (fir_name == "ETH") {
                                if (sec_name == "USDT") {
                                    $(".inp2").val(cutZero((val1 * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                } else {
                                    $(".inp2").val(cutZero((val1 * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                }

                            } else if (fir_name == "USDT") {
                                if (sec_name == "ETH") {
                                    $(".inp2").val(cutZero((val1 / (dhprice_new * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                } else {
                                    $(".inp2").val(cutZero((val1 / ((dhprice_new * (1 + k)) * (1 - 𝛉)) * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                }
                            } else if (fir_name == "HBTC") {
                                if (sec_name == "ETH") {
                                    $(".inp2").val(cutZero((val1 / (dhprice_new2 * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                } else {
                                    $(".inp2").val(cutZero((val1 / ((dhprice_new2 * (1 + k1)) * (1 - 𝛉1)) * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                }
                            }
                            $('.conversionPrice').css('display', 'flex')
                        })
                    })
                })
            })
        })

    })

});
$('.inp_sheth').focus(function () {
    $('.sh_inp').removeClass('borderStyle')
    $('.sh_warn').hide()
    $('.sh_zj').hide()
})
$('.inp1').focus(function () {
    $('.dh_border').removeClass('borderStyle')
    $('.wallet_warn').hide()
    $('.dh_border2').removeClass('borderStyle')
    $('.market_warn').hide()
    var token_fir = $('.btn_select>span').text()
    var token_sec = $('.btn_select2>span').text()
    $('.tk1').text(token_sec)
    $('.tk2').text(token_fir)
    var getKInfoContract = new web3.eth.Contract(abi, CofiXController)
    getKInfoContract.methods.getKInfo(USDT_addr).call().then(function (result) {
        var k_original = result[0]
        var k = k_original / 1e8
        var 𝛉 = result[2] / 1e8
        var getKInfoContract = new web3.eth.Contract(abi, CofiXController)
        getKInfoContract.methods.getKInfo(HBTC_addr).call().then(function (result) {
            var k_original1 = result[0]
            var k1 = k_original1 / 1e8
            var 𝛉1 = result[2] / 1e8
            var myContract3 = new web3.eth.Contract(abi2, OracleMock);
            myContract3.methods.checkPriceNow(USDT_addr).call().then(function (result) {
                var ethAmount_old = result[0]
                var ethAmount = web3.utils.fromWei(result[0], 'ether')
                var erc20Amount = result[1];
                this.dhprice = (erc20Amount / ethAmount / 1000000).toFixed(8).slice(0, 14);
                var uisdtP = (erc20Amount / ethAmount / 1000000)
                var dhprice_new = cutZero(this.dhprice)
                var price = this.dhprice
                var myContract3 = new web3.eth.Contract(abi2, OracleMock);
                myContract3.methods.checkPriceNow(HBTC_addr).call().then(function (result) {
                    var ethAmount_old = result[0]
                    var ethAmount = web3.utils.fromWei(result[0], 'ether')
                    var erc20Amount = result[1];
                    var decimalContract = new web3.eth.Contract(abi, HBTC_addr)
                    decimalContract.methods.decimals().call().then(function (result) {
                        var demical = "1e" + result
                        this.dhprice = (erc20Amount / ethAmount / (demical) * 1).toFixed(8).slice(0, 14);
                        var hbtcP = (erc20Amount / ethAmount / (demical) * 1)
                        var dhprice_new2 = cutZero(this.dhprice)
                        var hbtc_usdtPrice = (uisdtP / hbtcP).toFixed(8).slice(0, 14)
                        var fir_name = $('.btn_select2>span').text()
                        var sec_name = $('.btn_select>span').text()
                        var val1 = $(".inp1").val();
                        web3.eth.getAccounts((error, accounts) => {
                            web3.eth.defaultAccount = accounts[0];
                            if (fir_name == "ETH") {
                                if (sec_name == "USDT") {
                                    $(".changePrice").text(cutZero((1 * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                } else {
                                    $(".changePrice").text(cutZero((1 * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                }

                            } else if (fir_name == "USDT") {
                                if (sec_name == "ETH") {
                                    $(".changePrice").text(cutZero((1 / (dhprice_new * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                } else {
                                    $(".changePrice").text(cutZero((1 / ((dhprice_new * (1 + k)) * (1 - 𝛉)) * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                }
                            } else if (fir_name == "HBTC") {
                                if (sec_name == "ETH") {
                                    $(".changePrice").text(cutZero((1 / (dhprice_new2 * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                } else {
                                    $(".changePrice").text(cutZero((1 / ((dhprice_new2 * (1 + k1)) * (1 - 𝛉1)) * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                }
                            }
                            $('.conversionPrice').css('display', 'flex')
                        })
                    })
                })
            })
        })

    })
})
$(".inp2").bind("input propertychange", function () {
    var token_fir = $('.btn_select2>span').text()
    var token_sec = $('.btn_select>span').text()
    $('.tk1').text(token_fir)
    $('.tk2').text(token_sec)
    var getKInfoContract = new web3.eth.Contract(abi, CofiXController)
    getKInfoContract.methods.getKInfo(USDT_addr).call().then(function (result) {
        var k_original = result[0]
        var k = k_original / 1e8
        var 𝛉 = result[2] / 1e8
        var myContract3 = new web3.eth.Contract(abi2, OracleMock);
        myContract3.methods.checkPriceNow(USDT_addr).call().then(function (result) {
            var ethAmount_old = result[0]
            var ethAmount = web3.utils.fromWei(result[0], 'ether')
            var erc20Amount = result[1];
            this.dhprice = (erc20Amount / ethAmount / 1000000).toFixed(8).slice(0, 14);
            var uisdtP = (erc20Amount / ethAmount / 1000000)
            var dhprice_new = cutZero(this.dhprice)
            var price = this.dhprice
            var myContract3 = new web3.eth.Contract(abi2, OracleMock);
            myContract3.methods.checkPriceNow(HBTC_addr).call().then(function (result) {
                var ethAmount_old = result[0]
                var ethAmount = web3.utils.fromWei(result[0], 'ether')
                var erc20Amount = result[1];
                var decimalContract = new web3.eth.Contract(abi, HBTC_addr)
                decimalContract.methods.decimals().call().then(function (result) {
                    var demical = "1e" + result
                    this.dhprice = (erc20Amount / ethAmount / (demical) * 1).toFixed(8).slice(0, 14);
                    var hbtcP = (erc20Amount / ethAmount / (demical) * 1)
                    var dhprice_new2 = cutZero(this.dhprice)
                    var hbtc_usdtPrice = (uisdtP / hbtcP).toFixed(8).slice(0, 14)
                    var fir_name = $('.btn_select2>span').text()
                    var sec_name = $('.btn_select>span').text()
                    var val1 = $(".inp2").val();
                    if (val1 == "") {
                        $('.inp1').attr('placeholder', '--')
                    }
                    web3.eth.getAccounts((error, accounts) => {
                        web3.eth.defaultAccount = accounts[0];
                        if (fir_name == "ETH") {
                            if (sec_name == "USDT") {
                                $(".inp1").val(cutZero((val1 / (dhprice_new * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                            } else {
                                $(".inp1").val(cutZero((val1 / (dhprice_new2 * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                            }
                        } else if (fir_name == "USDT") {
                            if (sec_name == "ETH") {
                                $(".inp1").val(cutZero((val1 * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                            } else {
                                $(".inp1").val(cutZero((val1 / ((dhprice_new2 * (1 + k)) * (1 - 𝛉)) * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                            }
                        } else if (fir_name == "HBTC") {
                            if (sec_name == "ETH") {
                                $(".inp1").val(cutZero((val1 * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                            } else {
                                $(".inp1").val(cutZero((val1 / ((dhprice_new * (1 + k)) * (1 - 𝛉)) * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                            }
                        }
                        $('.conversionPrice').css('display', 'flex')
                    })
                })
            })
        })
    })

});
$(".inp2").focus(function () {
    $('.dh_border').removeClass('borderStyle')
    $('.wallet_warn').hide()
    $('.dh_border2').removeClass('borderStyle')
    $('.market_warn').hide()
    var token_fir = $('.btn_select2>span').text()
    var token_sec = $('.btn_select>span').text()
    $('.tk1').text(token_fir)
    $('.tk2').text(token_sec)

    var getKInfoContract = new web3.eth.Contract(abi, CofiXController)
    getKInfoContract.methods.getKInfo(USDT_addr).call().then(function (result) {
        var k_original = result[0]
        var k = k_original / 1e8
        var 𝛉 = result[2] / 1e8
        var myContract3 = new web3.eth.Contract(abi2, OracleMock);
        myContract3.methods.checkPriceNow(USDT_addr).call().then(function (result) {
            var ethAmount_old = result[0]
            var ethAmount = web3.utils.fromWei(result[0], 'ether')
            var erc20Amount = result[1];
            this.dhprice = (erc20Amount / ethAmount / 1000000).toFixed(8).slice(0, 14);
            var uisdtP = (erc20Amount / ethAmount / 1000000)
            var dhprice_new = cutZero(this.dhprice)
            var price = this.dhprice
            var myContract3 = new web3.eth.Contract(abi2, OracleMock);
            myContract3.methods.checkPriceNow(HBTC_addr).call().then(function (result) {
                var ethAmount_old = result[0]
                var ethAmount = web3.utils.fromWei(result[0], 'ether')
                var erc20Amount = result[1];
                var decimalContract = new web3.eth.Contract(abi, HBTC_addr)
                decimalContract.methods.decimals().call().then(function (result) {
                    var demical = "1e" + result
                    this.dhprice = (erc20Amount / ethAmount / (demical) * 1).toFixed(8).slice(0, 14);
                    var hbtcP = (erc20Amount / ethAmount / (demical) * 1)
                    var dhprice_new2 = cutZero(this.dhprice)
                    var hbtc_usdtPrice = (uisdtP / hbtcP).toFixed(8).slice(0, 14)
                    var fir_name = $('.btn_select2>span').text()
                    var sec_name = $('.btn_select>span').text()
                    var val1 = $(".inp2").val();
                    web3.eth.getAccounts((error, accounts) => {
                        web3.eth.defaultAccount = accounts[0];
                        if (fir_name == "ETH") {
                            if (sec_name == "USDT") {
                                $(".changePrice").text(cutZero((1 * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                            } else {
                                $(".changePrice").text(cutZero((1 * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                            }
                        } else if (fir_name == "USDT") {
                            if (sec_name == "ETH") {
                                $(".changePrice").text(cutZero((1 / (dhprice_new * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString))
                            } else {
                                $(".changePrice").text(cutZero((1 / ((dhprice_new * (1 + k)) * (1 - 𝛉)) * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                            }
                        } else if (fir_name == "HBTC") {
                            if (sec_name == "ETH") {
                                $(".changePrice").text(cutZero((1 / (dhprice_new2 * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                            } else {
                                $(".changePrice").text(cutZero((1 / ((dhprice_new2 * (1 + k)) * (1 - 𝛉)) * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                            }
                        }
                        $('.conversionPrice').css('display', 'flex')
                    })
                })
            })
        })
    })

});
$('.inp_eth').bind("input propertychange", function () {
    $('.expectBox').css('display', 'flex')
    $(this).removeClass('borderStyle')
    $('.rg_warn').hide()
    var token = $(".usdt_rgvalue").text()
    token_addr = eval(token + "_addr")
    var getKInfoContract = new web3.eth.Contract(abi, CofiXController)
    getKInfoContract.methods.getKInfo(token_addr).call().then(function (result) {
        var k_original = result[0]
        var k = k_original / 1e8
        // eth_usdt PriceNow
        var myContract3 = new web3.eth.Contract(abi2, OracleMock);
        myContract3.methods.checkPriceNow(token_addr).call().then(function (result) {
            var ethAmount_old = result[0]
            var erc20Amount = result[1];
            // 查净值
            let oraclePrice = [ethAmount_old, erc20Amount, k_original, "0", "0"];
            var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
            pairaddrContract.methods.getPair(token_addr).call().then(function (result) {
                var pairaddr = result.toString()
                var myContract4 = new web3.eth.Contract(abi2, pairaddr);
                myContract4.methods.getNAVPerShareForMint(oraclePrice).call().then(function (result) {
                    var jz_value = (result / 1e18).toFixed(8).slice(0, 14)
                    var myContract3 = new web3.eth.Contract(abi2, OracleMock);
                    myContract3.methods.checkPriceNow(token_addr).call().then(function (result) {
                        var ethAmount = web3.utils.fromWei(result[0], 'ether')
                        var erc20Amount = result[1];
                        var decimalContract = new web3.eth.Contract(abi, token_addr)
                        decimalContract.methods.decimals().call().then(function (result) {
                            var vala = $(".inp_eth").val();
                            var valb = $(".inp_usdt").val();
                            if (vala == "") {
                                vala = 0
                            }
                            if (valb == "") {
                                valb = 0
                            }
                            var demical = "1e" + result
                            this.dhprice = (erc20Amount / ethAmount / (demical) * 1).toFixed(8).slice(0, 14);
                            var price = (erc20Amount / ethAmount / (demical) * 1)
                            var expectedShare = (vala / jz_value) + (valb / (price / (1 + k)) / jz_value)
                            $('.expectedShare').text(expectedShare.toFixed(8).slice(0, 14))
                        })
                    })
                })
            })
        })
    })
})

$('.inp_usdt').bind("input propertychange", function () {
    $('.expectBox').css('display', 'flex')
    $(this).removeClass('borderStyle')
    $('.rg_warn').hide()
    var token = $(".usdt_rgvalue").text()
    token_addr = eval(token + "_addr")
    var getKInfoContract = new web3.eth.Contract(abi, CofiXController)
    getKInfoContract.methods.getKInfo(token_addr).call().then(function (result) {
        var k_original = result[0]
        var k = k_original / 1e8
        // eth_usdt PriceNow
        var myContract3 = new web3.eth.Contract(abi2, OracleMock);
        myContract3.methods.checkPriceNow(token_addr).call().then(function (result) {
            var ethAmount_old = result[0]
            var erc20Amount = result[1];
            var BN = web3.utils.BN;
            // 查净值
            let oraclePrice = [ethAmount_old, erc20Amount, "0", k_original.toString(), "0"];
            var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
            pairaddrContract.methods.getPair(token_addr).call().then(function (result) {
                var pairaddr = result.toString()
                var myContract4 = new web3.eth.Contract(abi2, pairaddr);
                myContract4.methods.getNAVPerShareForMint(oraclePrice).call().then(function (result) {
                    var jz_value = (result / 1e18).toFixed(8).slice(0, 14)
                    var myContract3 = new web3.eth.Contract(abi2, OracleMock);
                    myContract3.methods.checkPriceNow(token_addr).call().then(function (result) {
                        var ethAmount_old = result[0]
                        var ethAmount = web3.utils.fromWei(result[0], 'ether')
                        var erc20Amount = result[1];
                        var decimalContract = new web3.eth.Contract(abi, token_addr)
                        decimalContract.methods.decimals().call().then(function (result) {
                            var vala = $(".inp_eth").val();
                            var valb = $(".inp_usdt").val();
                            if (vala == "") {
                                vala = 0
                            }
                            if (valb == "") {
                                valb = 0
                            }
                            var demical = "1e" + result
                            this.dhprice = (erc20Amount / ethAmount / (demical) * 1).toFixed(8).slice(0, 14);
                            var price = (erc20Amount / ethAmount / (demical) * 1)
                            var expectedShare = (vala / jz_value) + (valb / (price / (1 + k)) / jz_value)
                            $('.expectedShare').text(expectedShare.toFixed(8).slice(0, 14))
                        })
                    })
                })
            })
        })
    })
})
$('.inp_sheth ').bind("input propertychange", function () {
    var token = $(".usdt_rgvalue2").text()
    token_addr = eval(token + "_addr")
    var getKInfoContract = new web3.eth.Contract(abi, CofiXController)
    getKInfoContract.methods.getKInfo(token_addr).call().then(function (result) {
        var k_original = result[0]
        var k = k_original / 1e8
        var 𝛉 = result[2] / 1e8
        // eth_usdt PriceNow
        var myContract3 = new web3.eth.Contract(abi2, OracleMock);
        myContract3.methods.checkPriceNow(token_addr).call().then(function (result) {
            var ethAmount_old = result[0]
            var erc20Amount = result[1];
            var BN = web3.utils.BN;
            // 查净值
            let oraclePrice = [ethAmount_old, erc20Amount, "0", k_original.toString(), "0"];
            var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
            pairaddrContract.methods.getPair(token_addr).call().then(function (result) {
                var pairaddr = result.toString()
                var myContract4 = new web3.eth.Contract(abi2, pairaddr);
                myContract4.methods.getNAVPerShareForBurn(oraclePrice).call().then(function (result) {
                    var jz_value = (result / 1e18).toFixed(8).slice(0, 14)
                    var myContract3 = new web3.eth.Contract(abi2, OracleMock);
                    myContract3.methods.checkPriceNow(token_addr).call().then(function (result) {
                        var ethAmount_old = result[0]
                        var ethAmount = web3.utils.fromWei(result[0], 'ether')
                        var erc20Amount = result[1];
                        var decimalContract = new web3.eth.Contract(abi, token_addr)
                        decimalContract.methods.decimals().call().then(function (result) {
                            var demical = "1e" + result
                            var price = (erc20Amount / ethAmount / (demical) * 1)
                            var valx = $(".inp_sheth").val();
                            if (($('.choose_token1').css("display") == "block") == true) {
                                var sh_num = valx * jz_value * (1 - 𝛉)
                                $(".sh_text1").text(cutZero(sh_num.toFixed(8).slice(0, 14).toString()))
                                $(".sh_text2").text("--")
                            }
                            if (($('.choose_token2').css("display") == "block") == true) {
                                var sh_num = valx * jz_value * (price * (1 - k)) * (1 - 𝛉)
                                $(".sh_text2").text(cutZero(sh_num.toFixed(8).slice(0, 14).toString()))
                                $(".sh_text1").text("--")
                            }
                        })
                    })
                })
            })
        })
    })
})
$('.jh_sq_token').click(function () {
    var BN = web3.utils.BN;
    var token = $('.property_imgbox2>p').text()
    token_addr = eval(token + "_addr")
    web3.eth.getAccounts((error, accounts) => {
        var sq_usdtContract = new web3.eth.Contract(abi, token_addr)
        sq_usdtContract.methods.approve(CofixRouter,
            new BN("999999999999999999999999999999999999")).send({ from: accounts[0] }).on('transactionHash', function (hash) {
                spinner.spin(target);
            })
            .on('receipt', function (receipt) {
                $('.jh_sq_token').hide()
                $('.jh_max_token').show()
                spinner.stop()
                $('.contact').css('pointer-events', 'auto')
                setTimeout(function () {
                    transaction()
                }, 500)
            })
            .on('confirmation', function (confirmationNumber, receipt) {
                spinner.stop()
                $('.jh_sq_token').hide()
                $('.jh_max_token').show()
                $('.contact').css('pointer-events', 'auto')
            })
            .on('error', function () {
                spinner.stop()
                $('.jh_sq_token').hide()
                $('.jh_max_token').show()
                $('.contact').css('pointer-events', 'auto')
            });
    })

})
$('.max').click(function () {
    web3.eth.getAccounts((error, accounts) => {
        web3.eth.defaultAccount = accounts[0];
        var token = $(this).parent().siblings('.input-group-btn').children().children('span').text()
        var ipt = $(this).parent().siblings('.form-control')
        if (token == "ETH") {
            web3.eth.getBalance(accounts[0], (err, balance) => {
                var balance_eth = (web3.utils.fromWei(balance, 'ether') * 1).toFixed(8).slice(0, 14)
                ipt.val(balance_eth)
            })
        } else {
            var token_addr = eval(token + "_addr")
            var myContract = new web3.eth.Contract(abi, token_addr);
            myContract.methods.balanceOf(accounts[0]).call().then(function (result) {
                var usdtvalue = result;
                var decimalContract = new web3.eth.Contract(abi, token_addr)
                decimalContract.methods.decimals().call().then(function (result) {
                    var demical = "1e" + result
                    var token_balance = cutZero(((usdtvalue / (demical)) * 1).toFixed(8).slice(0, 14))
                    ipt.val(cutZero(token_balance))

                })
                // ipt.val(usdtvalue)
            })
        }
    })
})
$('.dh_token_max').click(function () {
    var token_fir = $('.btn_select>span').text()
    var token_sec = $('.btn_select2>span').text()
    $('.tk1').text(token_sec)
    $('.tk2').text(token_fir)
    $('.conversionPrice').css('display', 'flex')
    var getKInfoContract = new web3.eth.Contract(abi, CofiXController)
    getKInfoContract.methods.getKInfo(USDT_addr).call().then(function (result) {
        var k_original = result[0]
        var k = k_original / 1e8
        var 𝛉 = result[2] / 1e8
        var myContract3 = new web3.eth.Contract(abi2, OracleMock);
        myContract3.methods.checkPriceNow(USDT_addr).call().then(function (result) {
            var ethAmount_old = result[0]
            var ethAmount = web3.utils.fromWei(result[0], 'ether')
            var erc20Amount = result[1];
            this.dhprice = (erc20Amount / ethAmount / 1000000).toFixed(8).slice(0, 14);
            var uisdtP = (erc20Amount / ethAmount / 1000000)
            var dhprice_new = cutZero(this.dhprice)
            var price = this.dhprice
            var myContract3 = new web3.eth.Contract(abi2, OracleMock);
            myContract3.methods.checkPriceNow(HBTC_addr).call().then(function (result) {
                var ethAmount_old = result[0]
                var ethAmount = web3.utils.fromWei(result[0], 'ether')
                var erc20Amount = result[1];
                var decimalContract = new web3.eth.Contract(abi, HBTC_addr)
                decimalContract.methods.decimals().call().then(function (result) {
                    var demical = "1e" + result
                    this.dhprice = (erc20Amount / ethAmount / (demical) * 1).toFixed(8).slice(0, 14);
                    var hbtcP = (erc20Amount / ethAmount / (demical) * 1)
                    var dhprice_new2 = cutZero(this.dhprice)
                    var hbtc_usdtPrice = (uisdtP / hbtcP).toFixed(8).slice(0, 14)
                    var fir_name = $('.btn_select2>span').text()
                    var sec_name = $('.btn_select>span').text()
                    web3.eth.getAccounts((error, accounts) => {
                        web3.eth.defaultAccount = accounts[0];
                        if (fir_name == "ETH") {
                            web3.eth.getBalance(accounts[0], (err, balance) => {
                                var val1 = (balance / 1e18)
                                $('.inp1').val(cutZero(val1.toFixed(8).slice(0, 14).toString()))
                                if (sec_name == "USDT") {
                                    $(".inp2").val(cutZero((val1 * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                    $(".changePrice").text(cutZero((1 * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                } else {
                                    $(".inp2").val(cutZero((val1 * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                    $(".changePrice").text(cutZero((1 * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                }
                            })
                        } else if (fir_name == "USDT") {
                            var myContract = new web3.eth.Contract(abi, USDT_addr);
                            myContract.methods.balanceOf(accounts[0]).call().then(function (result) {
                                var val1 = result / 1e6;
                                $('.inp1').val(cutZero(val1.toFixed(8).slice(0, 14).toString()))
                                if (sec_name == "ETH") {
                                    $(".inp2").val(cutZero((val1 / (dhprice_new * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                    $(".changePrice").text(cutZero((1 / (dhprice_new * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                } else {
                                    $(".inp2").val(cutZero((val1 / ((dhprice_new * (1 + k)) * (1 - 𝛉)) * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                    $(".changePrice").text((cutZero(1 / ((dhprice_new * (1 + k)) * (1 - 𝛉)) * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                }
                            })

                        } else if (fir_name == "HBTC") {
                            var myContract = new web3.eth.Contract(abi, HBTC_addr);
                            myContract.methods.balanceOf(accounts[0]).call().then(function (result) {
                                var val1 = result / 1e18;
                                $('.inp1').val(cutZero(val1.toFixed(8).slice(0, 14).toString()))
                                if (sec_name == "ETH") {
                                    $(".inp2").val(cutZero((val1 / (dhprice_new2 * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                    $(".changePrice").text(cutZero((1 / (dhprice_new2 * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                } else {
                                    $(".inp2").val(cutZero((val1 / ((dhprice_new2 * (1 + k)) * (1 - 𝛉)) * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                    $(".changePrice").text(cutZero((1 / ((dhprice_new2 * (1 + k)) * (1 - 𝛉)) * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                }
                            })
                        }
                    })

                })
            })
        })
    })
})
$('.jh_max').click(function () {
    web3.eth.getAccounts((error, accounts) => {
        web3.eth.defaultAccount = accounts[0];
        var token = $(this).siblings('.property_imgbox').children('p').text()
        if (token == "ETH") {
            var ipt = $(this).siblings('.property_eth')
            web3.eth.getBalance(accounts[0], (err, balance) => {
                var balance_eth = (web3.utils.fromWei(balance, 'ether') * 1).toFixed(8).slice(0, 14)
                ipt.val(balance_eth)
            })
        } else {
            var ipt = $(this).siblings('.property_token')
            var token_addr = eval(token + "_addr")
            var myContract = new web3.eth.Contract(abi, token_addr);
            myContract.methods.balanceOf(accounts[0]).call().then(function (result) {
                var usdtvalue = result;
                var decimalContract = new web3.eth.Contract(abi, token_addr)
                decimalContract.methods.decimals().call().then(function (result) {
                    var demical = "1e" + result
                    var token_balance = ((usdtvalue / (demical)) * 1).toString().slice(0, 14)
                    ipt.val(cutZero(token_balance))

                })
                // ipt.val(usdtvalue)
            })
        }
    })
})
$('.rg_max').click(function () {
    $('.expectBox').css('display', 'flex')
    var token = $(".usdt_rgvalue").text()
    token_addr = eval(token + "_addr")
    var getKInfoContract = new web3.eth.Contract(abi, CofiXController)
    getKInfoContract.methods.getKInfo(token_addr).call().then(function (result) {
        var k_original = result[0]
        var k = k_original / 1e8
        // eth_usdt PriceNow
        var myContract3 = new web3.eth.Contract(abi2, OracleMock);
        myContract3.methods.checkPriceNow(token_addr).call().then(function (result) {
            var ethAmount_old = result[0]
            var erc20Amount = result[1];
            var BN = web3.utils.BN;
            // 查净值
            let oraclePrice = [ethAmount_old, erc20Amount, "0", "0", "0"];
            var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
            pairaddrContract.methods.getPair(token_addr).call().then(function (result) {
                var pairaddr = result.toString()
                var myContract4 = new web3.eth.Contract(abi2, pairaddr);
                myContract4.methods.getNAVPerShareForBurn(oraclePrice).call().then(function (result) {
                    var jz_value = (result / 1e18).toFixed(8).slice(0, 14)
                    var myContract3 = new web3.eth.Contract(abi2, OracleMock);
                    myContract3.methods.checkPriceNow(token_addr).call().then(function (result) {
                        var ethAmount_old = result[0]
                        var ethAmount = web3.utils.fromWei(result[0], 'ether')
                        var erc20Amount = result[1];
                        var decimalContract = new web3.eth.Contract(abi, token_addr)
                        decimalContract.methods.decimals().call().then(function (result) {
                            var vala = $(".inp_eth").val();
                            var valb = $(".inp_usdt").val();
                            if (vala == "") {
                                vala = 0
                            }
                            if (valb == "") {
                                valb = 0
                            }
                            var demical = "1e" + result
                            this.dhprice = (erc20Amount / ethAmount / (demical) * 1).toFixed(8).slice(0, 14);
                            var price = (erc20Amount / ethAmount / (demical) * 1)
                            var expectedShare = (vala / jz_value) + (valb / (price / (1 + k)) / jz_value)
                            $('.expectedShare').text(expectedShare.toFixed(8).slice(0, 14))
                        })
                    })
                })
            })
        })
    })
})
$('.dh_eth_max').click(function () {
    var token_fir = $('.btn_select>span').text()
    var token_sec = $('.btn_select2>span').text()
    $('.tk1').text(token_sec)
    $('.tk2').text(token_fir)
    $('.conversionPrice').css('display', 'flex')
    var getKInfoContract = new web3.eth.Contract(abi, CofiXController)
    getKInfoContract.methods.getKInfo(USDT_addr).call().then(function (result) {
        var k_original = result[0]
        var k = k_original / 1e8
        var 𝛉 = result[2] / 1e8
        var myContract3 = new web3.eth.Contract(abi2, OracleMock);
        myContract3.methods.checkPriceNow(USDT_addr).call().then(function (result) {
            var ethAmount_old = result[0]
            var ethAmount = web3.utils.fromWei(result[0], 'ether')
            var erc20Amount = result[1];
            this.dhprice = (erc20Amount / ethAmount / 1000000).toFixed(8).slice(0, 14);
            var uisdtP = (erc20Amount / ethAmount / 1000000)
            var dhprice_new = cutZero(this.dhprice)
            var price = this.dhprice
            var myContract3 = new web3.eth.Contract(abi2, OracleMock);
            myContract3.methods.checkPriceNow(HBTC_addr).call().then(function (result) {
                var ethAmount_old = result[0]
                var ethAmount = web3.utils.fromWei(result[0], 'ether')
                var erc20Amount = result[1];
                var decimalContract = new web3.eth.Contract(abi, HBTC_addr)
                decimalContract.methods.decimals().call().then(function (result) {
                    var demical = "1e" + result
                    this.dhprice = (erc20Amount / ethAmount / (demical) * 1).toFixed(8).slice(0, 14);
                    var hbtcP = (erc20Amount / ethAmount / (demical) * 1)
                    var dhprice_new2 = cutZero(this.dhprice)
                    var hbtc_usdtPrice = (uisdtP / hbtcP).toFixed(8).slice(0, 14)
                    var fir_name = $('.btn_select2>span').text()
                    var sec_name = $('.btn_select>span').text()
                    web3.eth.getAccounts((error, accounts) => {
                        web3.eth.defaultAccount = accounts[0];
                        if (fir_name == "ETH") {
                            web3.eth.getBalance(accounts[0], (err, balance) => {
                                var val1 = (balance / 1e18)
                                if (sec_name == "USDT") {
                                    $(".inp2").val(cutZero((val1 * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                    $(".changePrice").text(cutZero((1 * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                } else {
                                    $(".inp2").val(cutZero((val1 * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                    $(".changePrice").text(cutZero((1 * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                }
                            })
                        } else if (fir_name == "USDT") {
                            var myContract = new web3.eth.Contract(abi, USDT_addr);
                            myContract.methods.balanceOf(accounts[0]).call().then(function (result) {
                                var val1 = result / 1e6;
                                if (sec_name == "ETH") {
                                    $(".inp2").val(cutZero((val1 / (dhprice_new * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                    $(".changePrice").text(cutZero((1 / (dhprice_new * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                } else {
                                    $(".inp2").val(cutZero((val1 / ((dhprice_new * (1 + k)) * (1 - 𝛉)) * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                    $(".changePrice").text((cutZero(1 / ((dhprice_new * (1 + k)) * (1 - 𝛉)) * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                }
                            })

                        } else if (fir_name == "HBTC") {
                            var myContract = new web3.eth.Contract(abi, HBTC_addr);
                            myContract.methods.balanceOf(accounts[0]).call().then(function (result) {
                                var val1 = result / 1e18;
                                if (sec_name == "ETH") {
                                    $(".inp2").val(cutZero((val1 / (dhprice_new2 * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                    $(".changePrice").text(cutZero((1 / (dhprice_new2 * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                } else {
                                    $(".inp2").val(cutZero((val1 / ((dhprice_new2 * (1 + k)) * (1 - 𝛉)) * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                    $(".changePrice").text(cutZero((1 / ((dhprice_new2 * (1 + k)) * (1 - 𝛉)) * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                }
                            })
                        }
                    })

                })
            })
        })
    })
})
$(".sh_sq").click(function () {
    var share = $('.myShare_value').text()
    $('.inp_sheth ').val(share)
    var token = $(".usdt_rgvalue2").text()
    token_addr = eval(token + "_addr")
    var getKInfoContract = new web3.eth.Contract(abi, CofiXController)
    getKInfoContract.methods.getKInfo(token_addr).call().then(function (result) {
        var k_original = result[0]
        var k = k_original / 1e8
        var 𝛉 = result[2] / 1e8
        // eth_usdt PriceNow
        var myContract3 = new web3.eth.Contract(abi2, OracleMock);
        myContract3.methods.checkPriceNow(token_addr).call().then(function (result) {
            var ethAmount_old = result[0]
            var erc20Amount = result[1];
            var BN = web3.utils.BN;
            // 查净值
            let oraclePrice = [ethAmount_old, erc20Amount, "0", "0", "0"];
            var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
            pairaddrContract.methods.getPair(token_addr).call().then(function (result) {
                var pairaddr = result.toString()
                var myContract4 = new web3.eth.Contract(abi2, pairaddr);
                myContract4.methods.getNAVPerShareForBurn(oraclePrice).call().then(function (result) {
                    var jz_value = (result / 1e18).toFixed(8).slice(0, 14)
                    var myContract3 = new web3.eth.Contract(abi2, OracleMock);
                    myContract3.methods.checkPriceNow(token_addr).call().then(function (result) {
                        var ethAmount_old = result[0]
                        var ethAmount = web3.utils.fromWei(result[0], 'ether')
                        var erc20Amount = result[1];
                        var decimalContract = new web3.eth.Contract(abi, token_addr)
                        decimalContract.methods.decimals().call().then(function (result) {
                            var demical = "1e" + result
                            var price = (erc20Amount / ethAmount / (demical) * 1)
                            var eth_ye_Contract = new web3.eth.Contract(abi, WETH9)
                            eth_ye_Contract.methods.balanceOf(pairaddr).call().then(function (result) {
                                var pair_eth = (result / 1e18)
                                var eth_ye_Contract = new web3.eth.Contract(abi, token_addr)
                                eth_ye_Contract.methods.balanceOf(pairaddr).call().then(function (result) {
                                    var pair_token = (result / demical)
                                    var totalsupplyContract = new web3.eth.Contract(abi, pairaddr)
                                    totalsupplyContract.methods.totalSupply().call().then(function (result) {
                                        var totalSupply = result
                                        var sh_np = ((pair_token / price * (1 + k)) + pair_eth) / totalSupply
                                        if (($('.choose_token1').css("display") == "block") == true) {
                                            var sh_num = share * sh_np * (1 - 𝛉)
                                            $(".sh_text1").text(cutZero(sh_num.toFixed(8).slice(0, 14).toString()))
                                            $(".sh_text2").text("--")
                                        }
                                        if (($('.choose_token2').css("display") == "block") == true) {
                                            var sh_num = share * sh_np * (price / (1 - k)) * (1 - 𝛉)
                                            $(".sh_text2").text(cutZero(sh_num.toFixed(8).slice(0, 14).toString()))
                                            $(".sh_text1").text("--")
                                        }
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})
$(".form-control").focus(function () {
    $(this).attr('placeholder', "--")
})
$(".form-control").blur(function () {
    var a = $(this).val()
    if ($(this).val() == "") {
        $(this).attr('placeholder', "--")
    }
})
// refresh function
function transaction() {
    var token = $('.in_put').text()
    token_addr = eval(token + "_addr")
    var kvalueContract = new web3.eth.Contract(abi, CofiXController)
    kvalueContract.methods.getKInfo(USDT_addr).call().then(function (result) {
        var k_original = result[0]
        var k = k_original / 1e8
        var 𝛉 = result[2] / 1e8
        var kvalueContract = new web3.eth.Contract(abi, CofiXController)
        kvalueContract.methods.getKInfo(HBTC_addr).call().then(function (result) {
            var k_original1 = result[0]
            var k1 = k_original1 / 1e8
            var 𝛉1 = result[2] / 1e8
            web3.eth.getAccounts((error, accounts) => {
                web3.eth.defaultAccount = accounts[0];
                $('.wallet_addr').text(accounts[0])
                var token = $('.in_put').text()
                token_addr = eval(token + "_addr")
                var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
                pairaddrContract.methods.getPair(token_addr).call().then(function (result) {
                    var pairaddr = result.toString()
                    if (pairaddr == "0x0000000000000000000000000000000000000000") {

                    } else {
                        // eth_usdt PriceNow
                        var myContract3 = new web3.eth.Contract(abi2, OracleMock);
                        myContract3.methods.checkPriceNow(token_addr).call().then(function (result) {
                            var ethAmount_old = result[0]
                            var ethAmount = web3.utils.fromWei(result[0], 'ether')
                            var erc20Amount = result[1];
                            this.dhprice = (erc20Amount / ethAmount / 1000000);
                            var uisdtP = (erc20Amount / ethAmount / 1000000)
                            var dhprice_new = this.dhprice
                            var price = this.dhprice
                            var myContract3 = new web3.eth.Contract(abi2, OracleMock);
                            myContract3.methods.checkPriceNow(HBTC_addr).call().then(function (result) {
                                var ethAmount_old = result[0]
                                var ethAmount = web3.utils.fromWei(result[0], 'ether')
                                var erc20Amount = result[1];
                                var decimalContract = new web3.eth.Contract(abi, HBTC_addr)
                                decimalContract.methods.decimals().call().then(function (result) {
                                    var demical = "1e" + result
                                    this.dhprice = (erc20Amount / ethAmount / (demical) * 1).toFixed(8).slice(0, 14);
                                    var hbtcP = (erc20Amount / ethAmount / (demical) * 1)
                                    var dhprice_new2 = cutZero(this.dhprice)
                                    var hbtc_usdtPrice = (uisdtP / hbtcP).toFixed(8).slice(0, 14)
                                    var fir_name = $('.btn_select2>span').text()
                                    var sec_name = $('.btn_select>span').text()
                                    var val = $('.inp1').val()
                                    var val2 = $('.inp2').val()
                                    if (fir_name == "ETH") {
                                        if (sec_name == "USDT") {
                                            $(".changePrice").text((1 * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString())
                                            if (val == "") {
                                                $('.inp2').attr('placeholder', '--')
                                            } else {
                                                $(".inp2").val((val * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString())
                                            }
                                        } else {
                                            $(".changePrice").text(cutZero((1 * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                            if (val == "") {
                                                $('.inp2').attr('placeholder', '--')
                                            } else {
                                                $(".inp2").val(cutZero((val * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                            }
                                        }
                                    } else if (fir_name == "USDT") {
                                        if (sec_name == "ETH") {
                                            $(".changePrice").text(cutZero((1 / (dhprice_new * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                            if (val == "") {
                                                $('.inp2').attr('placeholder', '--')
                                            } else {
                                                $(".inp2").val(cutZero((val / (dhprice_new * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                            }

                                        } else {
                                            $(".changePrice").text(cutZero((1 / ((dhprice_new * (1 + k)) * (1 - 𝛉)) * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                            if (val == "") {
                                                $('.inp2').attr('placeholder', '--')
                                            } else {
                                                $(".inp2").val(cutZero((val / ((dhprice_new * (1 + k)) * (1 - 𝛉)) * (dhprice_new2 * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                            }
                                        }
                                    } else if (fir_name == "HBTC") {
                                        if (sec_name == "ETH") {
                                            $(".changePrice").text(cutZero((1 / (dhprice_new2 * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                            if (val == "") {
                                                $('.inp2').attr('placeholder', '--')
                                            } else {
                                                $(".inp2").val(cutZero((val / (dhprice_new2 * (1 + k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                            }

                                        } else {
                                            $(".changePrice").text(cutZero((1 / ((dhprice_new2 * (1 + k1)) * (1 - 𝛉1)) * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                            if (val == "") {
                                                $('.inp2').attr('placeholder', '--')
                                            } else {
                                                $(".inp2").val(cutZero((val / ((dhprice_new2 * (1 + k1)) * (1 - 𝛉1)) * (dhprice_new * (1 - k)) * (1 - 𝛉)).toFixed(8).slice(0, 14).toString()))
                                            }
                                        }
                                    }
                                })
                            })
                        })
                    }
                })
                var token = $('.in_put').text()
                var token_addr = eval(token + "_addr")
                var pairaddrContract = new web3.eth.Contract(abi, CofixFactory)
                pairaddrContract.methods.getPair(token_addr).call().then(function (result) {
                    var pairaddr = result.toString()
                    if (pairaddr == "0x0000000000000000000000000000000000000000") {

                    } else {
                        // eth_usdt PriceNow
                        var myContract3 = new web3.eth.Contract(abi2, OracleMock);
                        myContract3.methods.checkPriceNow(token_addr).call().then(function (result) {
                            var ethAmount_old = result[0]
                            var ethAmount = web3.utils.fromWei(result[0], 'ether')
                            var erc20Amount = result[1];
                            this.dhprice = (erc20Amount / ethAmount / 1000000).toFixed(8).slice(0, 14);
                            var BN = web3.utils.BN;
                            let oraclePrice = [ethAmount_old, erc20Amount, "0", "0", "0"];
                            var myContract4 = new web3.eth.Contract(abi2, pairaddr);
                            myContract4.methods.getNAVPerShareForBurn(oraclePrice).call().then(function (result) {
                                var jz_value = (result / 1e18).toFixed(8).slice(0, 14)
                                $('.jz_ts_show').text(cutZero(jz_value))
                                // My share value
                                var myContract5 = new web3.eth.Contract(abi, pairaddr);
                                myContract5.methods.balanceOf(accounts[0]).call().then(function (result) {
                                    var myShare_original = result
                                    var myShare = result / 1e18
                                    var totalsupplyContract = new web3.eth.Contract(abi, pairaddr)
                                    totalsupplyContract.methods.totalSupply().call().then(function (result) {
                                        var totalSupply = result
                                        var myShare_per = ((myShare_original / totalSupply) * 100).toFixed(4);
                                        if (myShare_per == "NaN") {
                                            myShare_per = 0
                                        }
                                        $('.myShare_per').text(myShare_per);
                                        $('.myShare_value').text(cutZero((myShare * 1).toFixed(8).slice(0, 14)));
                                    })
                                })
                            })
                        })
                    }
                })
            })
        })

    })
}
