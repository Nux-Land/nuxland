export const contract_address = "0x22F09919FB5d3B045c3e97F23ebffFdd7CACb9e2";
export const ABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_target",
                "type": "uint256"
            }
        ],
        "name": "addEntity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "restartFundraising",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "sendFunds",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "stopFundraising",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "withdrawFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllEntity",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address payable",
                        "name": "entityowner",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "entityId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "targetAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentProgress",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isFundraisingStarted",
                        "type": "bool"
                    }
                ],
                "internalType": "struct funding.Entity[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getContractFunds",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getEntityFunds",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMyEntity",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address payable",
                        "name": "entityowner",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "entityId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "targetAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentProgress",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isFundraisingStarted",
                        "type": "bool"
                    }
                ],
                "internalType": "struct funding.Entity",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]