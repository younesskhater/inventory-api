
const products = require('./mocks/mock-products');
const usersMock = require("./mocks/mock-users");
const bcrypt = require("bcrypt");

const insertMocks = (Product, User) => {
    console.log('********* CREATING products **************')
    products.forEach(product => {
        Product.create(product).then(product => console.log(product.toJSON()))
    })
    
    usersMock.forEach(user => {
        bcrypt.hash(user.password, 10).then(hash => {
            user.password = hash;
            User.create(user).then(console.log('users created'))
        })
    })
}

module.exports = insertMocks