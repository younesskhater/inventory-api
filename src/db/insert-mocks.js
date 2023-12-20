
const productsMock = require('./mocks/mock-products');
const usersMock = require('./mocks/mock-users');
const warehouseMock = require('./mocks/mock-warehouse')
const bcrypt = require("bcrypt");

const insertMocks = (Product, User, Warehouse) => {
    console.log('mocks insert')
    productsMock.forEach(product => {
        Product.create(product).then(product => console.log(product.toJSON()))
    })
    
    usersMock.forEach(user => {
        bcrypt.hash(user.password, 10).then(hash => {
            user.password = hash;
            User.create(user).then(console.log('users created'))
        })
    })

    warehouseMock.forEach(warehouse => {
        Warehouse.create(warehouse).then(console.log('Warehouse created'))
    })

}

module.exports = insertMocks