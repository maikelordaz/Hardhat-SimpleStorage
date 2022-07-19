require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number")
require("./tasks/accounts")
require("hardhat-gas-reporter")
require("solidity-coverage")

/** @type import('hardhat/config').HardhatUserConfig */

/* 
* No es necesario ponerlas aqui pero es mas fácil para leer, puedo tomar el habito de definirlas
* asi no las vaya a usar, pero si no existen o algo asi, puede dar un error, entonces puedo,
 * poner:
 * const RINKEBY_RPC_URL =
  process.env.RINKEBY_RPC_URL || "https://eth-rinkeby/example" 
*/
const RINKEBY_RPC_URL =
    process.env.RINKEBY_RPC_URL || "https://eth-rinkeby/example"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x00"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

module.exports = {
    /*
     * Es bueno definir las redes y luego cuando corra los scripts seleccionar la red
     * con --network en la terminal con el comando:
     * yarn hardhat run scripts/deploy.js --network hardhat
     * npm hardhat run scripts/deploy.js --network hardhat
     */
    defaultNetwork: "hardhat",
    networks: {
        rinkeby: {
            url: RINKEBY_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 4,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            // accounts: hardhat lo pone solo
            chainId: 31337,
        },
    },
    solidity: "0.8.8",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true, // solo esta linea es necesaria para el reporte, puedo ponerlo false cuando ya no quiera el dato
        outputFile: "gas-report.txt", // crea un archivo txt con el reporte
        noColors: true, // pone o quita los colores, con true se lee mejor el cuadro
        currency: "USD", // elige la moneda a mostrar
        coinmarketcap: COINMARKETCAP_API_KEY, // toma el precio de coinmarketcap con un llamado a la api
        token: "MATIC", // si lo pongo puedo elegir el token
    },
}
