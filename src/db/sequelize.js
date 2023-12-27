const { Sequelize, DataTypes } = require("sequelize")
const dbConfig = require('./db.config')
const UserModel = require('../models/user')
const RoleModel = require('../models/role')
const ProductModel = require('../models/product')
const CategoryModel = require('../models/category')
const WarehouseModel = require('../models/warehouse')
const InventoryModel = require('../models/inventory')
const BusinessUnitModel = require('../models/businessUnit')

const insertMocks = require("./insert-mocks")

console.log('----- creating sequelize -------')
let sequelize = dbConfig(Sequelize)

const User = UserModel(sequelize, DataTypes)
const Role = RoleModel(sequelize, DataTypes)
const Product = ProductModel(sequelize, DataTypes)
const Category = CategoryModel(sequelize, DataTypes)
const Warehouse = WarehouseModel(sequelize, DataTypes)
const Inventory = InventoryModel(sequelize, DataTypes)
const BusinessUnit = BusinessUnitModel(sequelize, DataTypes)

Category.hasMany(Product)
Product.belongsTo(Category)

User.hasMany(Role)



const forceSync = { force: true };
const initDb = () => {
    return sequelize.sync(forceSync).then(async () => { 
        Boolean(forceSync.force) && await insertMocks(Product, User, Warehouse, Role)
        console.log('la base de donnée a bien été synchronisée') 
    })
}

module.exports = {
    initDb, User, Role, Product, Category, Warehouse, Inventory, BusinessUnit
}