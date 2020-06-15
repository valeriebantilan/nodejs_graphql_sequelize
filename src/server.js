const express = require('express');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
import { database } from '../config/database';
import userSchema from '../src/schema/typedefs/User'
import userResolver from '../src/schema/resolvers/User'


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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/graphql', graphqlHTTP({
  schema: userSchema,
  rootValue: userResolver,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));