const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/spotify')

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