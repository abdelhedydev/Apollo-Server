const { ApolloServer, gql } = require('apollo-server')

const todos = [
  { task: 'swiming ', completed: true }
]

const typeDefs = gql`
  type Todo {
    task : String
    completed : Boolean
  }
  type Query {
    getTodos: [Todo]
  }
  type Mutation {
    addToDo(task : String,completed : Boolean): Todo
  }
`

const resolvers = {
  Query: {
    getTodos: () => todos
  },
  Mutation: {
    addToDo: (_, { task, completed }) => {
      const newTodo = { task, completed }
      todos.push(newTodo)
      // console.log('ur todos', todos)
      return newTodo
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
