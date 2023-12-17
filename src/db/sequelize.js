const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require('../models/user')
const ProductModel = require('../models/product')
const CategoryModel = require('../models/category')
const WarehouseModel = require('../models/warehouse')
const insertMocks = require("./insert-mocks");

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

const User = UserModel(sequelize, DataTypes)
const Product = ProductModel(sequelize, DataTypes)
const Category = CategoryModel(sequelize, DataTypes)
const Warehouse = WarehouseModel(sequelize, DataTypes)

Product.belongsTo(Category)

const force = false;
const initDb = () => {
    return sequelize.sync({ force: true }).then(async () => { 
        await insertMocks(Product, User)
        console.log('la base de donnée a bien été synchronisée') 
    })
}

module.exports = {
    initDb, Product, User, Category, Warehouse
}