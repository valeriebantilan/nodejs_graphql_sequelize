import {database} from './database';

const Customer = database.import('../src/utils/models/customer');

module.exports = {
    Customer,
}