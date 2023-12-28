const { capitalize, upperCase } = require('lodash')

// can add more fields ( features for allowed interaction with the feature (CRUD))
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'There is already a role with this code'
            },
            set(role) {
                this.setDataValue('name', capitalize(role))
            },
            validate: {
                notEmpty: { msg: 'Please entrer the role name'},
                notNull: { msg: 'the role name can not be null'}
            }
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
        },
    },
    {
     timestamps: true,
     createdAt: 'created',
     hooks: {
        beforeSave: (role, options) => {
          // Set code based on name
          if (role.name) {
            role.code = upperCase(role.name).replace(' ', '_');
          }
        },
      },
    })
 }