import sequelize from 'sequelize';
import { Customer } from '../../../config/sequelize';


const users = {
    customers: async () => {
      const customers = await Customer.findAll();
      return customers;
    },
    customer: async ({ id }) => {
      const customer = await Customer.findOne({where: {id}});
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