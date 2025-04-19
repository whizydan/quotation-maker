// lib/models/index.ts
import { Sequelize } from 'sequelize'
import { sequelize } from '../db'

// Manually import models
import User from './user'

// Register models in an object
const models: any = {
  User,
}

// Sync all models
export const syncModels = async () => {
  try {
    await sequelize.authenticate()

    // Sync all models
    await Promise.all(Object.values(models).map((model: any) => model.sync({ alter: true })))

    console.log('All models synced successfully')
  } catch (err) {
    console.error('Error syncing models:', err)
  }
}

export { models }
