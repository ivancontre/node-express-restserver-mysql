import { DataTypes } from 'sequelize';
import db from '../database/config';

const User = db.define('user', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    }
});

export default User;