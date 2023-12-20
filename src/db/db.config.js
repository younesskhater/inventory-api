
module.exports = (Sequelize) => { 
    let sequelize;
    if (process.env.NODE_ENV === 'production') {
        sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.USERNAME,
            process.env.PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: process.env.DIALECT,
                logging: console.log,
                pool: {
                    max: 30,
                    min: 0,
                    acquire: 60000,
                    idle: 5000
                } 
            }
        )
    } else {
        sequelize = new Sequelize(
            'first-db',
            'root',
            '',
            {
                host: 'localhost',
                dialect: 'mysql',
                logging: false
            }
        )
    }
    return sequelize;
}