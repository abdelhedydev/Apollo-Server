const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })

const User = require('./models/User')
const Todo = require('./models/Todo')

// for gql files
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')
mongoose
  .connect(process.env.MONGO_DB_URL, { useNewUrlParser: true })
  .then(() => console.log('DB connected'))
  .catch(err => console.log(`error : ${err}`))

const server = new ApolloServer({
  typeDefs,
  context: {
    User,
    Todo
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
