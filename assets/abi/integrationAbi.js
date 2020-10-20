var IntegrationAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "voteFactory",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "bonusInfo",
		"outputs": [
			{
				"internalType": "bool",
				"name": "voting",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "tokenSaveAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "tokenAbonusContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "leveingBalance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "voteFactory",
				"type": "address"
			}
		],
		"name": "changeVoteFactory",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "pricingToken",
				"type": "address"
			}
		],
		"name": "pricingInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "allowAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "leftTokenBalance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "leftETHBalance",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "offerPrice",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "miningAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "pricingToken",
				"type": "address"
			}
		],
		"name": "takeInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "leftTokenBalance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "leftETHBalance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "allowAmount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "offerPrice",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]