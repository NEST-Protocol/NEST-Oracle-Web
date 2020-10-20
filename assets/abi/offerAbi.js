var offerAbi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "changeDeviationFromScale",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "checkAttenuationAmount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "checkTranAddition",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "offset",
                "type": "uint256"
            },
            {
                "name": "count",
                "type": "uint256"
            },
            {
                "name": "order",
                "type": "uint256"
            }
        ],
        "name": "list",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "changeTranEth",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "checkTranEth",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "blockNum",
                "type": "uint256"
            },
            {
                "name": "token",
                "type": "address"
            },
            {
                "name": "serviceCharge",
                "type": "uint256"
            }
        ],
        "name": "checkOfferMining",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "num",
                "type": "uint32"
            }
        ],
        "name": "changeBlockLimit",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "firstAmount",
                "type": "uint256"
            },
            {
                "name": "top",
                "type": "uint256"
            },
            {
                "name": "bottom",
                "type": "uint256"
            }
        ],
        "name": "changeAttenuationAmount",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "checkOwnerMining",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "checkOfferSpan",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "ethAmount",
                "type": "uint256"
            },
            {
                "name": "tokenAmount",
                "type": "uint256"
            },
            {
                "name": "contractAddress",
                "type": "address"
            },
            {
                "name": "tranEthAmount",
                "type": "uint256"
            },
            {
                "name": "tranTokenAmount",
                "type": "uint256"
            },
            {
                "name": "tranTokenAddress",
                "type": "address"
            }
        ],
        "name": "sendEthBuyErc",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "contractAddress",
                "type": "address"
            }
        ],
        "name": "toIndex",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "blockNum",
                "type": "uint256"
            },
            {
                "name": "token",
                "type": "address"
            }
        ],
        "name": "checkBlockOfferAmount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "iv",
                "type": "uint256"
            },
            {
                "name": "buf",
                "type": "bytes"
            },
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "writeUInt",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "voteFactory",
                "type": "address"
            }
        ],
        "name": "changeMapping",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "ethAmount",
                "type": "uint256"
            },
            {
                "name": "tokenAmount",
                "type": "uint256"
            },
            {
                "name": "contractAddress",
                "type": "address"
            },
            {
                "name": "tranEthAmount",
                "type": "uint256"
            },
            {
                "name": "tranTokenAmount",
                "type": "uint256"
            },
            {
                "name": "tranTokenAddress",
                "type": "address"
            }
        ],
        "name": "sendErcBuyEth",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "changekDeviate",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "changeTranAddition",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getPriceCount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "checkBlockLimit",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "blockNum",
                "type": "uint256"
            },
            {
                "name": "token",
                "type": "address"
            }
        ],
        "name": "checkBlockMining",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "start",
                "type": "address"
            },
            {
                "name": "count",
                "type": "uint256"
            },
            {
                "name": "maxFindCount",
                "type": "uint256"
            },
            {
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "find",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "changeOwnerMining",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "toAddress",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "createBlock",
                "type": "uint256"
            }
        ],
        "name": "checkContractState",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "changeLeastEth",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "priceIndex",
                "type": "uint256"
            }
        ],
        "name": "getPrice",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "contractAddress",
                "type": "address"
            }
        ],
        "name": "turnOut",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "changeOfferSpan",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "ethAmount",
                "type": "uint256"
            },
            {
                "name": "erc20Amount",
                "type": "uint256"
            },
            {
                "name": "erc20Address",
                "type": "address"
            }
        ],
        "name": "offer",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "checkleastEth",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "voteFactory",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "contractAddress",
                "type": "address"
            }
        ],
        "name": "OfferTokenContractAddress",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "contractAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "tokenAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "ethAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "erc20Amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "continued",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "mining",
                "type": "uint256"
            }
        ],
        "name": "OfferContractAddress",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "tranSender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "tranToken",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "tranAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "otherToken",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "otherAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "tradedContract",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "tradedOwner",
                "type": "address"
            }
        ],
        "name": "OfferTran",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "nowBlock",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "blockAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "tokenAddress",
                "type": "address"
            }
        ],
        "name": "OreDrawingLog",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "blockNum",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "tokenAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "offerTimes",
                "type": "uint256"
            }
        ],
        "name": "MiningLog",
        "type": "event"
    }
]
