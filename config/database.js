import Sequelize from 'sequelize';
import config from './config';


const database = new Sequelize(
  config.development.name,
  config.development.username,
  config.development.password, {
    host: config.development.host,
    dialect: 'mysql' || 'postgres',
    // dialectOptions: {
    //   useUTC: false, // for reading from database
    //   dateStrings: true,
    //   typeCast: function (field, next) { // for reading from database
    //     if (field.type === 'DATETIME') {
    //       return field.string()
    //     }
    //       return next()
    //   }
    // },
    // timezone: 'Asia/Singapore',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  },
);



module.exports = {
  database,
}