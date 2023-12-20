const isWarehouseValid = (category) => {
    
}
module.exports = (sequelize, DataTypes) => {
   return sequelize.define('Warehouse', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please give a name to your warehouse'},
            notNull: { msg: 'The name of the warehouse is required'},
            len: {
                args: [1, 50],
                msg: 'Characters number of the name of a category can\'t exceed 50'
            }
            // is: {
            //     args: ["^[a-z]+$", 'i'],
            //     msg: "Only letters allowed"
            // }
        }
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: 'Please give a location to your warehouse'},
            notNull: { msg: 'The location of the warehouse is required'},
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    moreDetails: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hasRefrigeration: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        validate: {
            isBoolean: { msg: 'hasRefrigeration should be true or false'}
        }
    }
   },
   {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
   })
}