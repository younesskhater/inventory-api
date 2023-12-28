
const productsMock = require('./mocks/mock-products');
const usersMock = require('./mocks/mock-users');
const rolesMock = require('./mocks/mock-roles');
const warehouseMock = require('./mocks/mock-warehouse')
const bcrypt = require("bcrypt");

const insertMocks = (Product, User, Warehouse, Role) => {
    
    rolesMock.forEach(role => {
        Role.create(role).then(role => console.log('Role : ', role.toJSON().code))
    })
    
    productsMock.forEach(product => {
        Product.create(product).then(product => console.log('Product : ', product.toJSON().name))
    })

    usersMock.forEach(user => {
        bcrypt.hash(user.password, 10).then(hash => {
            user.password = hash;
            const { roles, ...userWithoutRoles } = user
            User.create(userWithoutRoles).then(async (newUser) => { 
                if (roles) {
                    const userRoles = await Role.findAll({ where: { code: roles}})
                    await newUser.addRoles(userRoles)
                }
                console.log('users created')
            })
        })
    })

    warehouseMock.forEach(warehouse => {
        Warehouse.create(warehouse).then(console.log('Warehouse created'))
    })

    

}

module.exports = insertMocks