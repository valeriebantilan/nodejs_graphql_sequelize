import sequelize from 'sequelize';
import { Customer } from '../../../config/sequelize';


const users = {
    customers: () => {
      const customers = Customer.findAll();
      return customers;
    },
    customer: ({ id }) => {
      const customer = Customer.findOne({where: {id}});
      return customer;
    },
    updateCustomer: ({ id, name, email }) => {
      const user = User.update({ id, name, email });
      return user;
    },
};
  

export default users;