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
    updateCustomer: async ({ id, firstName}) => {
        const customer = await Customer.update({ firstName },
            {
                where: { id, },
                returning: true,
                plain: true,
            }).then(() => { return Customer.findOne({ where: { id } }) });

        return customer;
    },
};
  

export default users;