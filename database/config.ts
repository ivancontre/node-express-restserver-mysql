import { Sequelize } from 'sequelize';

const db = new Sequelize('demodb', 'test', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        freezeTableName: true //prevent sequelize from pluralizing table names
    },
    //logging: true
});

export default db;