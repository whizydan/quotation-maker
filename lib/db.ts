// lib/db.ts
// import { Sequelize } from 'sequelize'

// export const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql',
// })

//above is for mysql

import { Sequelize } from 'sequelize'

// Check if using environment variables for SQLite path or using an in-memory database
const databaseUrl = process.env.DB_URL || './database.sqlite' // Default to a local SQLite file

export const sequelize = new Sequelize({
  dialect: 'sqlite', // Use SQLite as the dialect or mysql
  storage: databaseUrl, // Specify the SQLite file path or ':memory:' for in-memory
  logging: false, // Optional: disable logging
})
