const express=require("express")
const mongoose=require("mongoose")
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const dotenv=require("dotenv").config()
const cors=require("cors")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User=require("./models/userModel")

async function startServer(){
    const app=express()
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log("database connected")
    }).catch((err)=>{
        console.log(err)
    })

    const server = new ApolloServer({
        typeDefs: `
          type User {
            name: String!
            email: String!
            password: String!
          }
          type AuthData {
            token: String!
            user: User!
          } 
          type Query {
            getUser(token:ID!):User
          }
          type  Mutation{
            register(name: String!, email: String!, password: String!): AuthData!

          }
        `,
        resolvers: {
          Query: {
            getUser: async (_, { token }) => {
              console.log(id)
              var decoded = jwt.verify(token, process.env.SECRET_KEY);
              return await User.findOne({ _id: decoded.id }); // Assuming you're using MongoDB and the User model
            }
          },
          Mutation: {
            register: async (parent, { name, email, password }) => {
              try {
                const existingUser = await User.findOne({ email });
                console.log(parent)
                if (existingUser) {
                  throw new Error('User already exists');
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({ name, email, password: hashedPassword });
                await newUser.save();
                const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);
                return { token, user: newUser };
              } catch (error) {
                throw new Error(error);
              }
            },
          },
        }
      });
    app.use(cors({origin:"*"}))
    app.use(bodyParser.json())
    await server.start();
    app.use("/graphql",expressMiddleware(server))
    app.listen(8000,()=>console.log("server is connected"))
}

startServer()