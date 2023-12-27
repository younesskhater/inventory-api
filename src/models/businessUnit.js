const businessUnitTypes = {
    provider: 'PROVIDER',
    client: 'CLIENT'
}

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('BusinessUnit', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Please entrer your first name'},
                notNull: { msg: 'the first name can not be null'}
            }
        },
        // provider or client
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Please entrer the type of business unit'},
                notNull: { msg: 'the type of BU can not be null'}
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
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: {
                msg: 'There is already an account with this email'
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: {
                msg: 'There is already a BU with this email'
            },
            validate: {
                isEmail: true
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
     timestamps: true,
     createdAt: 'created',
     validate: {
        atLeastOneContactPointForProvider() {
            if (this.type === businessUnitTypes.provider && !this.email && !this.phoneNumber) {
                throw new Error('You have to fill at least one contact point - email or phone number')
            }
        }
    },
    })
 }