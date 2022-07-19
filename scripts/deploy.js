const { ethers, run, network } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Contract deployed at: ${simpleStorage.address}`)
    //console.log(network.config) esta linea me permite ver los datos de la red que hago deploy
    // con este if verifico si hice deploy a una mainnet o testnet y verifico de una vez
    // si es la red local de hardhat no entra en el if
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block txes...")
        await simpleStorage.deployTransaction.wait(6) // espero 6 bloques luego del deploy para verificar
        await verify(simpleStorage.address, []) // [] son los argumentos del constructor
    }
    // interactuo con el contrato
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is: ${currentValue}`)
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is: ${updatedValue}`)
}

// Funcion asincrona para verificar el contrato de forma programatica
async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    // un try para verificar
    try {
        // verifico el contrato. args son los argumentos del constructor
        await run("verify:verify", {
            address: contractAddress,
            costructorArguments: args,
        })
        // si no puede tomo el error y lo muestro
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("already verified")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
