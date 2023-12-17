const isCategoryValid = (category) => {
    
}
module.exports = (sequelize, DataTypes) => {
   return sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: 'Please give a name to your category'},
            notNull: { msg: 'The name of the category is required'},
            len: {
                args: [1, 50],
                msg: 'Characters number of the name of a category can\'t exceed 50'
            }
            // is: {
            //     args: ["^[a-z]+$", 'i'],
            //     msg: "Only letters allowed"
            // }
        }
    }
   },
   {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
   })
}