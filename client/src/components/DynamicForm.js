import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const DynamicForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showToastInvalid, setShowToastInvalid] = useState(false);
  const [showUpdate, setshowUpdate] = useState(false);
  const [allUserNames, setAllUserNames] = useState([]);
  const navigate  = useNavigate();

  const errorMessageTrue = false;

  useEffect(()=>{
    async function fetchData (){
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
  
        const { data } = await axios.get('http://localhost:8080/api/getAllUserNames',config);
  
        if (!data) {
          console.log(data.status);
        } else {
          setAllUserNames(data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
    
  },[])

  const [rows, setRows] = useState([
    {
      sno: 1,
      itDept: "",
      appName: "",
      activityName: "",
      itPic: "",
      userDept: "",
      start: "",
      end: "",
      status: "ongoing",
      remarks: "",
    },
  ]);

  const handleInputChange = (index, fieldName, value) => {
    const updatedRows = [...rows];
    if (fieldName === 'start' || fieldName === 'end') {
      // For 'start' and 'end' fields, extract the date part only
      updatedRows[index][fieldName] = value ? new Date(value.setHours(0, 0, 0, 0)) : null;
    } else {
      updatedRows[index][fieldName] = value;
    }
    setRows(updatedRows);
  };
  
  const clearFields = (index) => {
    const clearedRow = {
      sno: rows[index].sno,
      itDept: "",
      application: "",
      appName: "",
      activityName: "",
      itPic: "",
      userDept: "",
      start: "",
      end: "",
      status: "ongoing",
      remarks: "",
    };
    const updatedRows = [...rows];
    updatedRows[index] = clearedRow;
    setRows(updatedRows);
  };

  const handleAssign = async() => {
    let isValid = true;

    // Check if any field is empty in any row
    rows.forEach((row, index) => {
      if (
        row.itDept === "" ||
        row.appName === "" ||
        row.activityName === "" ||
        row.itPic === "" ||
        row.userDept === "" ||
        row.start === "" ||
        row.end === ""
      ) {
        isValid = false;
        setShowToastInvalid(true);
        setTimeout(() => {
          setShowToastInvalid(false);
        }, 2000);
        return; // exit the loop if any field is empty
      }
    });

    if (!isValid) {
      return; // exit the function if any field is empty
    }
    console.log(rows);
    // Your assignment logic here
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post('http://localhost:8080/api/postAssignmentForm',{rows},config);
      if (!data) {
        console.log(data.status);
      } else {
        setshowUpdate(true);
        setTimeout(() => {
          setshowUpdate(false);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }



    // If assignment is successful, reset showToastInvalid
    setShowToastInvalid(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 border border-gray-300 rounded shadow-lg">
      <h1 className="text-2xl font-semibold mb-4 text-blue-600">
        Assignment Form
      </h1>
      {errorMessageTrue && (
        <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
          {errorMessage}
        </div>
      )}
      {rows.map((row, index) => (
        <div
          key={index}
          className="mb-4 p-4 border border-gray-300 rounded shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-blue-600">
              Row {row.sno}
            </h2>
            {showToastInvalid && (
              <div className="mt-4 p-2 bg-red-500 text-white rounded shadow-md">
                Please Fill all the feilds.
              </div>
            )}
            <div className="flex items-center space-x-2">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => handleAssign()}
              >
                Assign
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => clearFields(index)}
              >
                Clear
              </button>
            </div>
          </div>
          <form>
            <div className="grid grid-cols-2 gap-4">
              {/* IT Dept */}
              <div className="mb-4">
                <label
                  htmlFor={`itDept-${index}`}
                  className="block text-sm font-medium text-gray-600"
                >
                  IT Dept
                </label>
                <input
                  type="text"
                  id={`itDept-${index}`}
                  value={row.itDept}
                  onChange={(e) =>
                    handleInputChange(index, "itDept", e.target.value)
                  }
                  className="border border-blue-300 focus:border-blue-500 p-2 rounded w-full focus:outline-none"
                />
              </div>

              {/* App Name */}
              <div className="mb-4">
                <label
                  htmlFor={`appName-${index}`}
                  className="block text-sm font-medium text-gray-600"
                >
                  App Name
                </label>
                <input
                  type="text"
                  id={`appName-${index}`}
                  value={row.appName}
                  onChange={(e) =>
                    handleInputChange(index, "appName", e.target.value)
                  }
                  className="border border-blue-300 focus:border-blue-500 p-2 rounded w-full focus:outline-none"
                />
              </div>

              {/* Activity Name */}
              <div className="mb-4">
                <label
                  htmlFor={`activityName-${index}`}
                  className="block text-sm font-medium text-gray-600"
                >
                  Activity Name
                </label>
                <input
                  type="text"
                  id={`activityName-${index}`}
                  value={row.activityName}
                  onChange={(e) =>
                    handleInputChange(index, "activityName", e.target.value)
                  }
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>

              {/* IT PIC */}
              <div className="mb-4">
                <label
                  htmlFor={`itPic-${index}`}
                  className="block text-sm font-medium text-gray-600"
                >
                  IT PIC
                </label>
                <select
                  id={`itPic-${index}`}
                  value={row.itPic}
                  onChange={(e) => handleInputChange(index, 'itPic', e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                >
                  <option value="" disabled>Select IT PIC</option>
                  {allUserNames.map((userName, i) => (
                    <option key={i} value={userName.userName}>{userName.userName}</option>
                  ))}
                </select>
              </div>


              {/* User Dept */}
              <div className="mb-4">
                <label
                  htmlFor={`userDept-${index}`}
                  className="block text-sm font-medium text-gray-600"
                >
                  User Dept
                </label>
                <input
                  type="text"
                  id={`userDept-${index}`}
                  value={row.userDept}
                  onChange={(e) =>
                    handleInputChange(index, "userDept", e.target.value)
                  }
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>

              {/* Start Date */}
              <div className="mb-4">
                <label
                  htmlFor={`start-${index}`}
                  className="block text-sm font-medium text-gray-600"
                >
                  Start Date
                </label>
                <DatePicker
                  id={`start-${index}`}
                  selected={row.start}
                  onChange={(date) => handleInputChange(index, "start", date)}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>

              {/* End Date */}
              <div className="mb-4">
                <label
                  htmlFor={`end-${index}`}
                  className="block text-sm font-medium text-gray-600"
                >
                  End Date
                </label>
                <DatePicker
                  id={`end-${index}`}
                  selected={row.end}
                  onChange={(date) => handleInputChange(index, "end", date)}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>

              {/* Status */}
              <div className="mb-4">
                <label
                  htmlFor={`status-${index}`}
                  className="block text-sm font-medium text-gray-600"
                >
                  Status
                </label>
                <select
                  id={`status-${index}`}
                  value={row.status}
                  onChange={(e) =>
                    handleInputChange(index, "status", e.target.value)
                  }
                  className="border border-gray-300 p-2 rounded"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="tobestarted">To Be Started</option>
                  <option value="ended">Ended</option>
                </select>
              </div>
            </div>

            {/* Remarks */}
            <div className="mb-4">
              <label
                htmlFor={`remarks-${index}`}
                className="block text-sm font-medium text-gray-600"
              >
                Remarks
              </label>
              <textarea
                id={`remarks-${index}`}
                value={row.remarks}
                onChange={(e) =>
                  handleInputChange(index, "remarks", e.target.value)
                }
                className="border border-gray-300 p-2 rounded w-full"
              ></textarea>
            </div>
            {showUpdate && (
              <div className="mt-4 p-2 bg-green-500 text-white rounded shadow-md">
                List is Updated.
              </div>
            )}
          </form>
        </div>
      ))}
    </div>
  );
};

export default DynamicForm;
