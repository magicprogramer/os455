const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    model: String,
    name: String
});

const DriverSchema = new mongoose.Schema({
    name: String,
    age: Number,
    cars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    }]
});

mongoose.connect('mongodb://localhost:27017/graphq');

const Car = mongoose.model('Car', CarSchema);
const Driver = mongoose.model('Driver', DriverSchema);

const typeDefs = gql`
    type Car {
        id: ID
        model: String
        name: String
    }

    type Driver {
        id: ID
        name: String
        age: Int
        cars: [Car]
    }

    type Query {
        drivers: [Driver]
        cars(id: ID!): [Car]
    }

    type Mutation {
        addDriver(name: String, age: Int): Driver
        addCar(driverId: ID!, model: String, name: String): Car
    }
`;

const resolvers = {
    Query: {
        drivers: async () => {
            return await Driver.find().populate('cars');
        },
        cars: async (_, { id }) => {
            const driver = await Driver.findById(id).populate('cars');
            if (!driver) throw new Error('Driver not found');
            return driver.cars;
        }
    },
    Mutation: {
        addDriver: async (_, { name, age }) => {
            const driver = new Driver({ name, age });
            return await driver.save();
        },
        addCar: async (_, { driverId, model, name }) => {
            const car = new Car({ model, name });
            await car.save();

            const driver = await Driver.findById(driverId);
            if (!driver) throw new Error('Driver not found');

            driver.cars.push(car._id);
            await driver.save();

            return car;
        }
    }
};

// --- Start Server ---
async function startServer() {
    const app = express();
    const PORT = 3030;

    const gqlServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await gqlServer.start();
    gqlServer.applyMiddleware({ app });

    app.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}${gqlServer.graphqlPath}`);
    });
}

startServer();
