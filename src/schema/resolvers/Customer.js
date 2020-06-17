import sequelize from 'sequelize';
import { Customer } from '../../../config/sequelize';


const users = {
  customers: async () => {
    try {
      const customers = await Customer.findAll();
      return customers;
    } catch (err) {
      throw new Error(err);
    }
    },
  customer: async ({ id }) => {
      try {
        const customer = await Customer.findOne({where: {id}});
        return customer;
      } catch (err) {
        throw new Error(err);
      }
    },
  updateCustomer: async ({ id, firstName }) => {
      try {
        const customer = await Customer.update({ firstName },
          {
              where: { id, },
              returning: true,
              plain: true,
          }).then(() => { return Customer.findOne({ where: { id } }) });

        return customer;
      } catch (err) {
        throw new Error(err);
      }
  },
  createCustomer: async ({ firstName, lastName }) => {
    try {
      const customer = await Customer.create({ firstName, lastName });
  
      return customer;

    } catch (err) {
      throw new Error(err);
    }
  },
  deleteCustomer: async ({ id }) => {
    try {
      let stats = false;
      const customer = await Customer.destroy({ where: { id } });
  
      if (customer) {
        stats = true;
      }
  
      return stats;
    } catch (err) {
      throw new Error(err);
    }
  }
};
  

export default users;