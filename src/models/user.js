module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
     id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
     },
     firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please entrer your first name'},
            notNull: { msg: 'the first name can not be null'}
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please entrer your first name'},
            notNull: { msg: 'the first name can not be null'}
        }
    },
     email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: {
            msg: 'There is already an account with this email'
         },
         validate: {
             notEmpty: { msg: 'Please entrer your email'},
             notNull: { msg: 'the email can not be null'},
             isEmail: true
         }
     },
     password: {
         type: DataTypes.STRING,
         allowNull: true,
         get() {
             return this.getDataValue('password')
         },
         set(password) {
             this.setDataValue('password', password
             )
         },
         validate: {
         }
     }
    },
    {
     timestamps: true,
     createdAt: 'created'
    })
 }