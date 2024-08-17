import { DataTypes } from 'sequelize';
import { sequelize } from "../config/rdb.js";

export const User = sequelize.define(
    'user',
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        spotify_user_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        spotify_access_token: {
            type: DataTypes.STRING
        },
        spotify_refresh_token: {
            type: DataTypes.STRING
        },
        profile_picture_url: {
            type: DataTypes.STRING
        },
        user_creation_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        token_expiry_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }
);

export default User;