import React, { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(name, email, password);

  return (
    <div class="w-full h-full py-8 sm:px-8  bg-gray-200 pt-16" style={{height:'100vh'}}>
      <div class="mx-auto  italic md:text-xl font-extrabold text-black divide-x">
         <div class="flex justify-center items-center rounded-lg p-2 text-white"><span class="bg-green-500 p-2 rounded-lg">Effortless Data Management: A GraphQL CRUD Project </span></div>
         <div class="w-full flex justify-center mt-2">
         <div className="w-full md:w-1/2 h-2 bg-black  rounded-xl"></div>
         </div>
      </div>
      <div class="w-full py-8  lg:w-2/4  rounded-lg  mt-6 md:mx-auto bg-cyan-950">
        <form class="flex justify-center items-center ">
          <div class="block md:flex justify-center">
            <div class="w-full flex justify-center md:w-1/3  rounded-lg">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfSyLQ7BVaprxYkzau28kVx2H-uUz9Y_Ciyg&s"
                class="rounded-lg "
              />
            </div>
            <div class=" mt-8 w-full md:w-2/3 md:mt-0 md:ml-4">
              <div class="flex">
                <span class="w-28 flex font-extrabold text-md items-center font-mono text-lg  text-white">
                  Name
                </span>

                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Enter Your Name"
                  onChange={(e) => setName(e.target.value)}
                  class="w-full   px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 "
                />
              </div>
              <div class="flex">
                <span class="w-28 flex font-extrabold items-center font-mono text-lg  text-white ">
                  Email
                </span>

                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter Your Email Id"
                  onChange={(e) => setEmail(e.target.value)}
                  class="w-full mt-1  px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
                />
              </div>
              <div class="flex">
                <span class="w-20 flex font-extrabold items-center text-lg font-mono  text-white">
                  Password
                </span>

                <input
                  type="number"
                  name="password"
                  value={password}
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  class="mt-1 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
                />
              </div>
              <div class=" flex justify-center items-center mt-2">
                <button class="w-full bg-blue-500 font-mono hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-violet-300 text-white text-xl rounded-md p-2" onClick={() => {
    // Your function to handle registration
    console.log("Register button clicked");
  }}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
