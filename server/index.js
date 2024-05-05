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
const cookieParser = require('cookie-parser');
const app=express()
app.use(cookieParser());
app.use(bodyParser.json())
async function startServer(){
    
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
            id:ID!
            name: String!
            email: String!
            password: String!
          }
          type AuthData {
            token: String
            user: User
            msg:String
          } 
          type Query {
            getUser(token:ID!):User
          }
          type  Mutation{
            register(name: String!, email: String!, password: String!): AuthData!
            updateUser(id: ID!, name: String, email: String): User!
            deleteUser(id: ID!): String!
          }
        `,
        resolvers: {
          Query: {
            getUser: async (_, { token }) => {
              console.log(token)
              var decoded = jwt.verify(token, process.env.SECRET_KEY);
              console.log(decoded.userId)
              return await User.findOne({ _id: decoded.userId }); // Assuming you're using MongoDB and the User model
            }
            
          },
          Mutation: {
            register: async (parent, { name, email, password }, context) => {
              try {
                const existingUser = await User.findOne({ email });
                console.log(name,email,password)
                if (existingUser) {
                 
                  const isMatch = await bcrypt.compare(password, existingUser.password)
                  if(isMatch){
                    const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET_KEY);
                   
                    return {token,user:existingUser}
                  }else{
                    console.log("hi")
                   return {msg:"Password incorrect"};
                   
                  }
                 

                 
                }else{
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({ name, email, password: hashedPassword });
                await newUser.save();
                const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);
                 return {token,user:newUser};
                }

              } catch (error) {
                throw new Error(error);
              }
            },

            updateUser: async (_, { id, name, email }) => {
              // Logic to update user information
              // Example: Assuming you have a database where users are stored
              console.log(name,email)
              const user = await User.findById(id);
              if (!user) {
                throw new Error("User not found");
              }
              if (name) {
                user.name = name;
              }
              if (email) {
                user.email = email;
              }
              await user.save();
              return user;
            },
            deleteUser: async (_, { id }) => {
              console.log("delete user",id)
              try {
                  const deletedUser = await User.findByIdAndDelete(id);
                  if (deletedUser) {
                      return "deleted";
                  } else {
                      return "notfound";
                  }
              } catch (error) {
                  console.error('Error deleting user:', error);
                  return "notdeleted";
              }
          }
          
          },
          
        },
        context: ({ req, res }) => ({ req, res }),
        plugins: [
          {
            requestDidStart(requestContext) {
              return {
                async willSendResponse({ response, context }) {
                  // Set the cookie in the response headers
                     console.log("bye")
                  if (context && context.cookie) {
                    console.log("Hi")
                    response.http.headers.set('Set-Cookie', context.cookie);
                  }
                },
              };
            },
          },
        ],
      });
    app.use(cors({origin:"*"}))
   
    
    await server.start();
    app.use("/graphql",expressMiddleware(server))
    app.listen(8000,()=>console.log("server is connected"))
}

startServer()