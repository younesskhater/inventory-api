const { Sequelize, DataTypes } = require("sequelize");
const ProductModel = require('../models/product')
const UserModel = require('../models/user')
const products = require('./mock-products');
const usersMock = require("./mocks/mock-users");
const bcrypt = require("bcrypt")

let sequelize

if (process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.USERNAME,
        process.env.PWD,
        {
            host: process.env.DB_HOST,
            dialect: process.env.DIALECT,
            dialectOptions: {
                timezone: 'Etc/GMT-2'
            },
            logging: console.log
        }
    )
} else {
    sequelize = new Sequelize(
        'first-db',
        'root',
        '',
        {
            host: 'localhost',
            dialect: 'mariadb',
            dialectOptions: {
                timezone: 'Etc/GMT-2'
            },
            logging: false
        }
    )
}

const Product = ProductModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const force = true;
const initDb = () => {
    return sequelize.sync({force}).then(_ => { 
        createFromMock()
        console.log('la base de donnée a bien été synchronisée') 
    })
}

const createFromMock = () => {
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

module.exports = {
    initDb, Product, User
}