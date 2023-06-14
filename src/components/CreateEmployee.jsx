import React, { useEffect, useState } from "react";
import axios from "../axios";
import { GrClose } from "react-icons/gr";

function CreateEmployee({ setviewModal,emp,setemp, type,settype }) {
  const [name, setname] = useState(emp ? emp.name:"");
  const [email, setemail] = useState(emp ? emp.email:"");
  const [address, setaddress] = useState(emp ? emp.address:"");
  const [number, setnumber] = useState(emp ? emp.number:null);
  const [nic, setnic] = useState(emp ? emp.nic:null);

  // useEffect(() => {
  //   if(emp && (type===1 || type===2)){
  //     // getData(id);
  //     setaddress(emp && emp.address);
  //     setemail(emp && emp.email);
  //     setname(emp && emp.name);
  //     setnic(emp && emp.nic);
  //     setnumber(emp && emp.number);
  //   }
  // })

  // const getData= async(id)=>{
  //   try {
  //     const res = await axios.get(`/employee/${id}`);
  //     console.log(res.data);
  //     setaddress(res.data.address);
  //     setemail(res.data.email);
  //     setname(res.data.name);
  //     setnic(res.data.nic);
  //     setnumber(res.data.number);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // } 

  const handleUpdate = async()=>{
    try {
      const res = await axios.put(`/employee/${emp && emp._id}`, {
        name: name,
        email: email,
        number: number,
        nic: nic,
        address: address,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
    console.log({name,email,address,number,nic})
    setviewModal(false);
    setaddress("");
    setemail("");
    setname("");
    setnic(null);
    setnumber(null);
    setemp({});
    settype(0);
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    getMyResult();
    setviewModal(false);
    setaddress("");
    setemail("");
    setname("");
    setnic(null);
    setnumber(null);
    settype(0);
  };

  const getMyResult = async () => {
    try {
      const res = await axios.post("/employee", {
        name: name,
        email: email,
        number: number,
        nic: nic,
        address: address,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-[600px] bg-white rounded-lg shadow">
      <div className="flex place-items-center px-6 py-3 justify-between">
        <div className="font-semibold tracking-wide text-gray-600 text-2xl">
          {type===1 ? "View Employee Data":type===2?"Update Employee Data":"Create New Employee"}
        </div>
        <div
          onClick={() => {setviewModal(false); setemp({}); settype(0);}}
          className="rounded-xl p-2 hover:bg-gray-200 cursor-pointer transition-all ease-in-out"
        >
          <GrClose className="font-semibold" />
        </div>
      </div>
      <hr className="h-px mb-2 bg-gray-300 border-0"></hr>
      <div className="w-full px-10 py-2">
        {(type===0 || type===2) ? 
        <input
          className="w-full px-6 py-2 font-semibold text-gray-700 rounded-md bg-gray-200 focus:outline-0"
          placeholder="Enter Employee Name"
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />:
        <input
          className="w-full px-6 py-2 font-semibold text-gray-700 rounded-md bg-gray-200 focus:outline-0"
          placeholder="Enter Employee Name"
          type="text"
          value={name}
        />}
      </div>
      <div className="w-full px-10 py-2">
      {(type===0 || type===2) ? <input
          className="w-full px-6 py-2 font-semibold text-gray-700 rounded-md bg-gray-200 focus:outline-0"
          placeholder="name@example.com"
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />:
        <input
          className="w-full px-6 py-2 font-semibold text-gray-700 rounded-md bg-gray-200 focus:outline-0"
          placeholder="name@example.com"
          type="email"
          value={email}
        />}
      </div>
      <div className="w-full px-10 py-2">
      {(type===0 || type===2) ? <input
          className="w-full px-6 py-2 font-semibold text-gray-700 rounded-md bg-gray-200 focus:outline-0"
          placeholder="52 streen new lane NY"
          type="text"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
        />:
        <input
          className="w-full px-6 py-2 font-semibold text-gray-700 rounded-md bg-gray-200 focus:outline-0"
          placeholder="52 streen new lane NY"
          type="text"
          value={address}
        />}
      </div>
      <div className="w-full px-10 py-2">
      {(type===0 || type===2) ? <input
          className="w-full px-6 py-2 font-semibold text-gray-700 rounded-md bg-gray-200 focus:outline-0"
          placeholder="95xxxxx236"
          type="number"
          value={number}
          onChange={(e) => setnumber(e.target.value)}
        />:
        <input
          className="w-full px-6 py-2 font-semibold text-gray-700 rounded-md bg-gray-200 focus:outline-0"
          placeholder="95xxxxx236"
          type="number"
          value={number}
        />}
      </div>
      <div className="w-full px-10 py-2">
      {(type===0 || type===2) ? <input
          className="w-full font-semibold text-gray-700 px-6 py-2 rounded-md bg-gray-200 focus:outline-0"
          placeholder="Enter your 10 digit NIC"
          type="number"
          value={nic}
          onChange={(e) => setnic(e.target.value)}
        />:
        <input
          className="w-full font-semibold text-gray-700 px-6 py-2 rounded-md bg-gray-200 focus:outline-0"
          placeholder="Enter your 10 digit NIC"
          type="number"
          value={nic}
        />}
      </div>
      <div className="w-full grid px-5 place-items-end py-3">
        <div className="flex gap-5">
          <button onClick={() => {setviewModal(false); setemp({}); settype(0);}} className="text-gray-600 font-semibold text-sm px-6 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
            Cancel
          </button>
          {!type && <button
            className="text-white font-semibold text-sm px-6 py-2 rounded-md bg-green-700 hover:bg-green-800"
            onClick={handleSubmit}
          >
            Submit
          </button>}
          {type===2 && <button
            className="text-white font-semibold text-sm px-6 py-2 rounded-md bg-green-700 hover:bg-green-800"
            onClick={handleUpdate}
          >
            Update
          </button>}
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;
