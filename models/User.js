const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');
class User extends Model {}
/*
* username:
* prevent null values from being saved for username,
* we only want to allow alphanumeric characters
*
* password:
* prevent null values from being saved for the password
* minimum length of 8 characters
* */
User.init(
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isAlphaNumeric: true,
				// notNull: true,
			},
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			validate: {
				isEmail: true,
			}
		},
		password: {
			type: DataTypes.STRING,
			validate: {
				notNull: true,
				len: [8],
			}
		},
	},
	{
		sequelize,
		timestamps: false,
		modelName: 'User',
	}
);
module.exports = User;
