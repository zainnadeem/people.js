const url = process.env.DATABASE_URL || 'postgres://localhost:5432/spotify'
const Sequelize = require('sequelize')
const db = new Sequelize(url)

var Person = db.define('person', {
    name: {
        type: Sequelize.STRING,
        allowNull: false   // non optional property
    },
    favoriteCity: {
        type: Sequelize.STRING,
        allowNull: false  // non optional property 
    }
})

module.exports = db