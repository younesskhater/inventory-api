const { Sequelize, DataTypes } = require("sequelize");
const ProductModel = require('../models/product')
const UserModel = require('../models/user')
const products = require('./mock-products');
const usersMock = require("./mocks/mock-users");
const bcrypt = require("bcrypt")

let sequelize

console.log('----- creating sequelize -------')
if (process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.USERNAME,
        process.env.PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: process.env.DIALECT,
            port: '3306',
            logging: console.log,
            pool: {
                max: 30,
                min: 0,
                acquire: 60000,
                idle: 5000
            } 
        }
    )
} else {
    sequelize = new Sequelize(
        'first-db',
        'root',
        '',
        {
            host: 'localhost',
            dialect: 'mysql',
            logging: false
        }
    )
}

console.log('trying to connect to db .......')

const Product = ProductModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const force = false;
const initDb = () => {
    return sequelize.sync().then(_ => { 
        // createFromMock()
        bcrypt.hash('123', 10).then(hash => {
            User.create({email: 'you@gmail.com', password: hash}).then(console.log('users created'))
        })
        console.log('la base de donnée a bien été synchronisée') 
    })
}

const createFromMock = () => {
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

module.exports = {
    initDb, Product, User
}