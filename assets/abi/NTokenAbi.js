var mappingabi = [{
	"constant": false,
	"inputs": [{
		"name": "token",
		"type": "address"
	}, {
		"name": "nToken",
		"type": "address"
	}],
	"name": "addTokenMapping",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{
		"name": "token",
		"type": "address"
	}],
	"name": "checkTokenMapping",
	"outputs": [{
		"name": "",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "voteFactory",
		"type": "address"
	}],
	"name": "changeMapping",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{
		"name": "token",
		"type": "address"
	}, {
		"name": "nToken",
		"type": "address"
	}],
	"name": "changeTokenMapping",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{
		"name": "voteFactory",
		"type": "address"
	}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "constructor"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"name": "token",
		"type": "address"
	}, {
		"indexed": false,
		"name": "nToken",
		"type": "address"
	}],
	"name": "TokenMappingLog",
	"type": "event"
}]