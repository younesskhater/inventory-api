module.exports = (sequelize, DataTypes) => {
   return sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please give a name to your products'},
            notNull: { msg: 'The name of the product is required'},
            len: {
                args: [1, 50],
                msg: 'Characters number of the name of a product can\'t exceed 50'
            }
            // is: {
            //     args: ["^[a-z]+$", 'i'],
            //     msg: "Only letters allowed"
            // }
        }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please choose a category'},
            notNull: { msg: 'The category of the product is required'}
        }
    },
    material: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please choose a material'},
            notNull: { msg: 'The material of the product is required'}
        }
    },
    minQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Please use integer numbers only'},
            notNull: { msg: 'The minimum quantity is required'},
            min: {
                args: [1],
                msg: 'The minimum quantity is 1'
            }
        }
    },
    characteristics: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('characteristics').split(',').map(characteristic => { 
                const keyValue = characteristic.split(':')
                return { [keyValue[0]]: keyValue[1] }
            })
        },
        set(characteristics) {
            this.setDataValue('characteristics', 
                characteristics.map(characteristic => Object.entries(characteristic).map(([k,v]) => `${k}:${v}`)).join()
            )
        },
        validate: {
            isCharacteristicsValid(characteristics) {
                const characteristicsList = characteristics.split(',').map(characteristic => { 
                    const keyValue = characteristic.split(':')
                    return keyValue[0]
                })
                if (characteristicsList.length > 10) {
                    throw new Error('Characteristics can\'t exceed 10')
                }
                const hasDuplication = new Set(characteristicsList).size !== characteristicsList.length;
                if (hasDuplication) {
                    throw new Error('Characteristics should not be duplicated')
                }
                
                

            }
        }
    }
   },
   {
    indexes: [
        {
            unique: true,
            fields: ['name', 'category']
        }
    ],
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
   })
}