import React,{useState,useEffect} from 'react'
import Cookies from 'js-cookie';
import { gql, useQuery,useMutation } from "@apollo/client";
import {UPDATE_USER,DELETE_USER} from "./graphqlMutation"
import { useNavigate } from 'react-router-dom';
import { GET_USER } from './graphqlQuery';



function HomePage() {
  const token=Cookies.get('token')
   const [name,setName]=useState("")
   const [email,setEmail]=useState("")
   const [id,setId]=useState("")
   const [changeName,setChangeName]=useState("")
   const [changeEmail,setChangeEmail]=useState("")
   const [isDisabled, setIsDisabled] = useState(true);
   const [updateUser,{load,err}]=useMutation(UPDATE_USER)
   const navigate=useNavigate()
   const { loading, error, data } = useQuery(GET_USER, {
    variables: { token }
  });
  console.log(id)
 const [deleteUser,{deleteloading,deleteerror}]=useMutation(DELETE_USER)

 console.log("id",id,data)
 
 useEffect(() => {
    if (data && data.getUser && !loading) {
      setName(data.getUser.name);
      setEmail(data.getUser.email);
      setId(data.getUser.id)
    }
    if(!Cookies.get("token")){
      navigate("/")
    }
  }, [data]);

  // Handle loading state
  if (loading){ return <p class="flex justify-center font-bold">Loading...</p>;}
 

  // Handle error state
  if (error){
    return <p class="flex justify-center font-bold border-2 bg-red-600 rounded-lg text-slate-50">Error: {error.message}</p>
  } 
   

   const toggleDisabled = () => {
    if(isDisabled==true){
      setIsDisabled(!isDisabled)
    }
    console.log(!isDisabled)
     if((changeName!="" && changeEmail=="") || (changeName=="" && changeEmail!="") || (isDisabled==false && changeName=="" && changeEmail=="") ){
      alert("Enter email and Name")
     
     }else if(changeName!="" && changeEmail!=""){
      updateUser({ variables: { id, name:changeName, email:changeEmail } })
      .then(() => {
        // Mutation succeeded
        alert("User updated successfully")
        console.log('User updated successfully');
        setIsDisabled(!isDisabled);
      })
      .catch((err) => {
        // Mutation failed
        console.log("Error updating user")
        console.error('Error updating user:', err);
        setIsDisabled(!isDisabled);
      });
    
     }
    
     setChangeEmail("")
     setChangeName("")
   };

   const deleteUserFunction=async()=>{
      const data=await deleteUser({ variables: { id} })
      console.log(data)
      Cookies.remove('token')
      navigate("/")
   }

  return (
    <div class="w-full  bg-gray-300 pt-16" style={{height:'100vh'}}>
    <div class="flex justify-center items-center  md:text-lg font-extrabold font-sans bg-sky-500 py-2 rounded-lg text-white"><span>Interactive Dashboard: Read, Update, Delete Profiles</span></div>
    
      <div class="w-full py-8  md:w-2/4  rounded-lg md:p-10 mt-6 md:mx-auto bg-cyan-950">
    <div class="flex justify-center items-center ">
      <div class="block md:flex justify-center">
        <div class="w-full flex justify-center md:w-1/3  rounded-lg">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfSyLQ7BVaprxYkzau28kVx2H-uUz9Y_Ciyg&s"
            class="rounded-lg "
          />
        </div>
        <div class=" mt-8 w-full md:w-2/3 md:mt-0 md:ml-4">
          <div class="flex mb-2">
          <span class="w-28 flex font-extrabold items-center font-mono text-lg  text-white ">
            <img src="data:image/png;base64,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" class="w-16 rounded-full flex font-extrabold text-md items-center font-mono text-lg  text-white" />
</span>
            <input
              type="text"
              name="name"
              value={isDisabled ? name : changeName}
              placeholder="Enter Your Name"
              onChange={(e) => setChangeName(e.target.value)}
              disabled={isDisabled}  class=" h-12 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
            />
           
          </div>
          <div class="flex">
            <span class="w-28 flex font-extrabold items-center font-mono text-lg  text-white ">
              <img src="data:image/png;base64,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" class="w-16 rounded-full flex font-extrabold text-md items-center font-mono text-lg  text-white"/>
            </span>
           
            <input
              type="email"
              name="email"
              value={isDisabled?email:changeEmail}
              placeholder="Enter Your Email Id"
              onChange={(e) => setChangeEmail(e.target.value)}
              disabled={isDisabled}  class=" h-12 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
            />
          </div>
         
          <div class=" flex justify-center items-center mt-2 ">
            <button  onClick={toggleDisabled} class="w-full bg-blue-500 font-mono hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-violet-300 text-white text-xl rounded-md p-2 mr-2">
            {isDisabled ? 'Update' : 'Done'}
            </button>
            <button onClick={deleteUserFunction} class="w-full bg-blue-500 font-mono hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-violet-300 text-white text-xl rounded-md p-2">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default HomePage