import { Sequelize } from 'sequelize';

const db = new Sequelize('demodb', 'test', '123456', {
    host: 'localhost',
    //port: 3306,
    dialect: 'mysql',
    //dialectModule: tedious,
    //logging: true
});

export default db;