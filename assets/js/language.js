var arrLang = {
    "zh": {
        "swap_btn": "Swap",
        "title_dh": "Swap",
        'title_zs': 'Add Liquidity',
        'address': 'Contract address:',
        'zf_text': 'Input',
        'zf_input': 'Enter input amount',
        'balance_text': 'Balance:',
        'hq_text': 'Output',
        'hd_text': 'Output',
        'hd_input': 'Estimated output amount',
        'dhjg_text': 'Price',
        'lj_text': 'Connect wallet',
        'jgsm_title': 'Price Description',
        'jgsm_cont': 'The price is obtained from the NEST Oracle',
        'comfirm_text': 'Comfirm',
        'jz': 'Net worth',
        'myfe': 'My share',
        'myfevalue': 'Total value of my share',
        'rg': 'Subscribe',
        'sh': 'Redemption',
        'yjzj': 'Expected increase in share',
        'walletye': 'Balance',
        'zg_input': 'Enter the subscription amount',
        'sh_input': 'Enter the redemption share',
        'jzsm_title': 'Net worth Description',
        'jzsm_cont1': "The net value represents the current value of ETH owned by each market maker share.",
        'jzsm_cont2': 'It will change with the fluctuation of market-making income and the value of ERC-20 ETH.',
        'jzsm_cont3': 'When the market maker performs subscription and redemption, it calculates the increased or decreased share according to the current net value and K coefficient.',
        'jzsm_cont4': 'See the document for the specific calculation method.',
        'jjcbalance_text': 'Pool balance:',
        'all_text': 'All',
        'sq_text': 'Approve',
        'fesq': '（share）approve',
        'Deposit': 'Deposit asset',
        'Expected': 'Expected share',
        'Redemption': 'Redemption share',
        'Select': 'Select redemption asset type',
        'activate': 'Activate',
        'balance': 'balance',
        'activate_pair': 'Activate trading pair',
        'lastPrice': 'Latest price',
        'initial': 'Initial liquid assets',
        'OracleAddr': 'Oracle address',
        'wallet': "wallet",
        "install": 'Please install MetaMask first',
        'community': 'Community',
        'word': 'Docs',
        'white': 'Whitepaper',
        'sh_warn': 'Insufficient redeemable shares',
        'wallet_warn': 'Insufficient wallet balance',
        'market_warn': 'Insufficient market-making funds',
    },
    "en": {
        'wallet': "钱包",
        "swap_btn": "交易",
        "title_dh": '兑换',
        'title_zs': '做市',
        'address': '合约地址:',
        'zf_text': '支付',
        'zf_input': '输入支付数量',
        'balance_text': '钱包余额：',
        'hq_text': '获取',
        'hd_text': '获得',
        'hd_input': '预计获得数量',
        'dhjg_text': '兑换价格',
        'lj_text': '连接钱包',
        'jgsm_title': '价格说明',
        'jgsm_cont': '兑换价格从 NEST Protocol 预言机调用获取',
        'comfirm_text': '确定',
        'jz': '净值',
        'myfe': '我的份额',
        'myfevalue': '我的份额总价值',
        'rg': '认购',
        'sh': '赎回',
        'yjzj': '预计增加份额',
        'walletye': '钱包余额',
        'zg_input': '输入参与认购金额',
        'sh_input': '输入赎回份额',
        'jzsm_title': '净值说明',
        'jzsm_cont1': "净值代表当前每个做市商份额所拥有的 ETH 价值。",
        'jzsm_cont2': '会随着做市收入、ERC-20 的ETH价值波动而改变。',
        'jzsm_cont3': '在做市商进行认购和赎回时，按照当前净值以及 K 系数来计算增加或减少的份额。',
        'jzsm_cont4': '具体的计算方式见文档。',
        'jjcbalance_text': '资金池余额：',
        'all_text': '全部',
        'sq_text': '授权',
        'fesq': '(份额)授权',
        'Deposit': '转入资产',
        'Expected': '预计获得份额',
        'Redemption': '赎回份额',
        'Select': '选择赎回资产类型',
        'activate': '激活',
        'balance': '余额',
        'activate_pair': '激活交易对',
        'lastPrice': '最新报价',
        'initial': '初始做市资产',
        'OracleAddr': '预言机地址',
        "install": '请先安装Metamask！',
        'community': '社区',
        'word': '文档',
        'white': '白皮书',
        'sh_warn': '可赎回份额不足',
        'wallet_warn': '钱包余额不足',
        'market_warn': '做市资金不足',
    }
};

// The default language is English
var lang = "zh";
// Check for localStorage support
if ('localStorage' in window) {
    var lang = localStorage.getItem('lang') || navigator.language.slice(0, 2);
    if (!Object.keys(arrLang).includes(lang)) lang = 'en';
}

$(document).ready(function () {
    $(".lang").each(function (index, element) {
        var word = arrLang[lang][$(this).attr("key")]
        $(this).text(word);

    });
    console.log(localStorage.getItem('lang'));
    if (localStorage.getItem('lang') == 'en') {
        $('.circleen').removeClass('active')
        $('.circlezh').addClass('active')
    } else if (localStorage.getItem('lang') == 'zh') {
        $('.circlezh').removeClass('active')
        $('.circleen').addClass('active')
    } else {
        $('.circlezh').addClass('active')
        $('.circleen').removeClass('active')
    }
});

// get/set the selected language
$(".translate").click(function () {
    var lang = $(this).attr("id");
    if (lang == 'zh') {
        $('.circleen').removeClass('active')
        $('.circlezh').addClass('active')

    } else {
        $('.circlezh').removeClass('active')
        $('.circleen').addClass('active')

    }
    // update localStorage key
    if ('localStorage' in window) {
        localStorage.setItem('lang', lang);
        console.log(localStorage.getItem('lang'));
    }

    $(".lang").each(function (index, element) {
        var word = arrLang[lang][$(this).attr("key")]
        $(this).text(word);

    });
});