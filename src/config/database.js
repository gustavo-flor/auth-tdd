require('dotenv').config({
  path: process.env.NODE_ENV == "test" ? ".env.test" : ".env"
});

module.exports = {
  host: process.env.HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_STORAGE,
  operatorsAliases: false,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
