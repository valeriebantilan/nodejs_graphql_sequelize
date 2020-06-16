import express from 'express';
import graphqlHTTP  from 'express-graphql';
import bodyParser from 'body-parser';
import { database } from '../config/database';
import userSchema from '../src/schema/typedefs/Customer'
import userResolver from '../src/schema/resolvers/Customer'

const app = express();

try {
	const startingDatabase = async () => {
		await database.authenticate().catch(e => {
			return new Error(e);
		});
	}
	startingDatabase();

	console.info('connection to the database has been established successfully')
} catch (err) {
	console.info('unable to connect to the database:', err);
}

app.use('/graphql', graphqlHTTP({
  schema: userSchema,
  rootValue: userResolver,
  graphiql: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

module.exports = app;