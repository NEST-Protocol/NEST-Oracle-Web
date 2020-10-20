var USDT_offer = "0xFf6ad075D75FA51cdB231da54E6dF007E60C7122"
var _offer = "0x49665947b3Ac4a75DaD7B8E59701752bEc28Ff66"

function hidden_address(wallet_address) {
    if (null === wallet_address) return wallet_address;
    // 0x3ead5b...1cee9c.字符串长度小于等于此长度的不处理
    let strLen = wallet_address.length
    if (strLen <= 17) return wallet_address;

    // 剩下的就是正常长度的钱包地址
    return wallet_address.slice(0, 8) + '...' + wallet_address.slice(-6)
}
