const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require('./db.config')
const UserModel = require('../models/user')
const ProductModel = require('../models/product')
const CategoryModel = require('../models/category')
const WarehouseModel = require('../models/warehouse')
const insertMocks = require("./insert-mocks");

console.log('----- creating sequelize -------')
let sequelize = dbConfig(Sequelize)

const User = UserModel(sequelize, DataTypes)
const Product = ProductModel(sequelize, DataTypes)
const Category = CategoryModel(sequelize, DataTypes)
const Warehouse = WarehouseModel(sequelize, DataTypes)

Product.belongsTo(Category)

const forceSync = { force: true };
const initDb = () => {
    return sequelize.sync(forceSync).then(async () => { 
        Boolean(forceSync.force) && await insertMocks(Product, User, Warehouse)
        console.log('la base de donnée a bien été synchronisée') 
    })
}

module.exports = {
    initDb, Product, User, Category, Warehouse
}