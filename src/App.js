import "./App.css";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Search from "./components/Search";
import CreateEmployee from "./components/CreateEmployee";
import { RotateLoader } from "react-spinners";
import axios from "./axios";

function App() {
  const [search, setsearch] = useState("");
  const [apiData, setapiData] = useState([]);
  const [filteredDta, setfilteresData] = useState(apiData);
  const [isPending, setisPending] = useState(false);
  const [viewModal, setviewModal] = useState(false);
  const [clickedEmp, setclickedEmp] = useState({});
  const [type, settype] = useState(0);
  const [deleting, setdeleting] = useState(false);

  useEffect(() => {
    const result =
      apiData &&
      apiData.filter((itr) => {
        return itr.name.toLowerCase().match(search.toLowerCase());
      });
    setfilteresData(result);

    if (search.length === 0) {
      setfilteresData(apiData && apiData);
    }
  }, [search, filteredDta, isPending]);

  const getMyResult = async () => {
    try {
      const res = await axios.get("/employee");
      console.log(res.data);
      setapiData(res.data);
      setisPending(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMyResult();
    setisPending(true);
  }, [viewModal,deleting]);

  const viewEmployee = (id) => {
    setviewModal(true);
    const employee=filteredDta.find(emp=>emp._id===id);
    setclickedEmp(employee);
    settype(1);
  };
  const editEmployee = (id) => {
    setviewModal(true);
    const employee=filteredDta.find(emp=>emp._id===id);
    setclickedEmp(employee);
    settype(2);
  };
  const deleteEmployee = async (id) => {
    setdeleting(true);
    try {
      const res = await axios.delete(`/employee/${id}`);
      console.log(res.data);
      setdeleting(false);
    } catch (error) {
      console.log(error.message);
      setdeleting(false);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
      center: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
      center: true,
    },
    {
      name: "Number",
      selector: (row) => row.number,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
      center: true,
    },
    {
      name: "NIC",
      selector: (row) => row.nic,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
      center: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
      center: true,
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex gap-5">
          <button
            className="px-3 py-1 text-sm text-white rounded-md bg-blue-500 font-semibold"
            onClick={() => viewEmployee(row._id)}
          >
            View
          </button>
          <button
            className="px-3 py-1 text-sm text-white rounded-md bg-yellow-500 font-semibold"
            onClick={() => editEmployee(row._id)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 text-sm text-white rounded-md bg-red-500 font-semibold"
            onClick={() => deleteEmployee(row._id)}
          >
            Delete
          </button>
        </div>
      ),
      center: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "6px", // override the cell padding for head cells
        paddingRight: "6px",
        // backgroundColor: '#C5C5C5',
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    cells: {
      style: {
        paddingLeft: "6px", // override the cell padding for data cells
        paddingRight: "6px",
      },
    },
  };

  return (
    <div className="App">
      <div className="px-10 py-5 flex place-items-center justify-between bg-gradient-to-r from-emerald-200">
        <div>
        <div className="font-semibold text-gray-700 tracking-wide text-2xl text-left">Employees Data</div>
        <div className="text-sm tracking-wide">All the fields in the below table are sortable.</div>
        </div>
        <div><button onClick={()=>setviewModal(true)} className="bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold text-white text-sm px-6 py-3 rounded-lg">Add New Employee</button></div>
      </div>
      <div className="py-5">
        {!isPending ? (
          <DataTable
            className="overflow-auto scrollbar-thin scrollbar-thumb-[#FFD700]  scrollbar-track-white"
            columns={columns}
            data={filteredDta}
            fixedHeader
            fixedHeaderScrollHeight="450px"
            pagination
            highlightOnHover
            customStyles={customStyles}
            subHeader
            subHeaderComponent={
              <Search
                change={(e) => setsearch(e.target.value)}
                value={search}
              />
            }
          />
        ) : (
          <div className="grid place-items-center h-96 bg-white">
            <div>
              <RotateLoader color="#FFD700" />
            </div>
          </div>
        )}
      </div>
      {viewModal && <div className="absolute grid bg-gray-500 bg-opacity-50 place-items-center inset-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto  h-[calc(100%-1rem)] max-h-full">
        <CreateEmployee setviewModal={setviewModal} emp={clickedEmp} setemp={setclickedEmp} type={type} settype={settype}/>
      </div>}
    </div>
  );
}

export default App;
