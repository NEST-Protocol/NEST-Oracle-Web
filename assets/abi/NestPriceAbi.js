var NestPriceAbi = [{ "constant": false, "inputs": [{ "name": "tokenAddress", "type": "address" }, { "name": "num", "type": "uint256" }], "name": "updateAndCheckPriceList", "outputs": [{ "name": "", "type": "uint256[]" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "ethAmount", "type": "uint256" }, { "name": "tokenAmount", "type": "uint256" }, { "name": "endBlock", "type": "uint256" }, { "name": "tokenAddress", "type": "address" }, { "name": "offerOwner", "type": "address" }], "name": "addPrice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "checkPriceCostProportion", "outputs": [{ "name": "user", "type": "uint256" }, { "name": "abonus", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "tokenAddress", "type": "address" }], "name": "checkPriceNow", "outputs": [{ "name": "ethAmount", "type": "uint256" }, { "name": "erc20Amount", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "checkPriceCost", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "ethAmount", "type": "uint256" }, { "name": "tokenAmount", "type": "uint256" }, { "name": "tokenAddress", "type": "address" }, { "name": "blockNum", "type": "uint256" }], "name": "changePrice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "user", "type": "uint256" }, { "name": "abonus", "type": "uint256" }], "name": "changePriceCostProportion", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "tokenAddress", "type": "address" }, { "name": "blockNum", "type": "uint256" }], "name": "checkPriceForBlock", "outputs": [{ "name": "ethAmount", "type": "uint256" }, { "name": "erc20Amount", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "changePriceCost", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "voteFactory", "type": "address" }], "name": "changeMapping", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
        {
            name: "",
            type: "uint8",
        },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
},
{
    constant: true,
    inputs: [
        {
            name: "owner",
            type: "address",
        },
    ],
    name: "balanceOf",
    outputs: [
        {
            name: "",
            type: "uint256",
        },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
}, {
    constant: false,
    inputs: [
        {
            name: "spender",
            type: "address",
        },
        {
            name: "value",
            type: "uint256",
        },
    ],
    name: "approve",
    outputs: [
        {
            name: "",
            type: "bool",
        },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
}, { "constant": false, "inputs": [{ "name": "tokenAddress", "type": "address" }], "name": "updateAndCheckPriceNow", "outputs": [{ "name": "ethAmount", "type": "uint256" }, { "name": "erc20Amount", "type": "uint256" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "add", "type": "address" }, { "name": "isBlack", "type": "bool" }], "name": "changeBlackList", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "add", "type": "address" }], "name": "checkBlackList", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "voteFactory", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "a", "type": "address" }, { "indexed": false, "name": "b", "type": "uint256" }, { "indexed": false, "name": "c", "type": "uint256" }], "name": "NowTokenPrice", "type": "event" }]