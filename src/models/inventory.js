const isCategoryValid = (category) => {
    
}
module.exports = (sequelize, DataTypes) => {
   return sequelize.define('Inventory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantityAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Please use integer numbers only'},
            notNull: { msg: 'The minimum quantity is required'},
            min: {
                args: [0],
                msg: 'The minimum quantity is 0'
            }
        }
    },
    minimumStockLevel: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            isInt: { msg: 'Please use integer numbers only'},
            min: {
                args: [0],
                msg: 'The minimum stock is 0'
            }
        }
    },
    maximumStockLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Please use integer numbers only'},
            notNull: { msg: 'The minimum quantity is required'},
            min: {
                args: [0],
                msg: 'The minimum quantity is 0'
            }
        }
    },
    reorderPoint: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Please use integer numbers only'},
            notNull: { msg: 'The minimum quantity is required'},
            min: {
                args: [0],
                msg: 'The minimum quantity is 0'
            }
        }
    }
   },
   {
    timestamps: true,
    createdAt: 'created',
    updatedAt: true
   })
}