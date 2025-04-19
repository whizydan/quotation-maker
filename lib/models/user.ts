// lib/models/User.ts
import { DataTypes } from 'sequelize'
import { sequelize } from '../db'

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
})

export default User
