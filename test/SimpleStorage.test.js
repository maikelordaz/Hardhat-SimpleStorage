const { ethers } = require("hardhat")
const { expect, assert } = require("chai")
//describe("SimpleStorage", () => {}) esto es lo mismo, pero es mejor practica ponerlo como la que sigue
describe("SimpleStorage", function () {
    /*
     * Adentro de cada describe voy a tener:
     * 1. Un beforeEach() lo hago antes de cada prueba
     * 2. Varios it() cada una de las pruebas
     * 3. Pudiese tener un describe dentro del describe mas grande. Me sirve para separar procesos
     * o subtareas dentro de las pruebas. Cada describe interno tiene su propio beforeEach y sus
     * it()
     */
    /*
     * let simpleStorageFactory
     * let simpleStorage
     * Da lo mismo inicializarlos separados como arriba, o juntos como abajo
     */
    let simpleStorageFactory, simpleStorage

    beforeEach(async function () {
        // como simpleStorageFactory y simpleStorage estan dentro del beforeEach(), tengo que
        // declararlas afuera para que cada it() pueda ver las variables
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0" //recuerda poner los numeros como strings, menos probabilidad de error
        // puedo usar assert o expect, ambas las importo de chai
        assert.equal(currentValue.toString(), expectedValue)
        //expect(currentValue.toString()).to.be.equal(expectedValue)
    })

    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.equal(expectedValue, currentValue.toString())
    })

    it("Should add a person", async function () {
        await simpleStorage.addPerson("Alice", 7)
    })

    /*
     * Si tengo muchisimas pruebas puedo correr una sola de la siguiente forma:
     * 1. Necesito buscar una palabra clave
     * 2. Esta palabra clave va a estar en la descripcion del it()
     * 3. corro el siguiente comando
     * yarn hardhat test --grep (palabra cave)
     * npx hardhat test --grep (palabra clave)
     * Por ejemplo si mi palabra clave es "store"
     * yarn hardhat test --grep store
     * npx hardhat test --grep store
     * 4. Otra forma es en la sintaxis del test poner it.only
     *  */
})
