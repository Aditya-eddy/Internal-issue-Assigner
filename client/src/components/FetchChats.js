import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import format from "date-fns/format";

const FetchChats = ({ admin, userName }) => {
  const [chats, setChats] = useState([]);
  const [completedChats, setCompletedChats] = useState([]);
  const [taskIdCounter, setTaskIdCounter] = useState(1);

  useEffect(() => {
    fetchData();
    fetchCompletedChats();
    console.log("red");
  }, [taskIdCounter]);

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        "http://localhost:8080/api/getAssignmentForm",
        config
      );

      if (!data) {
        console.log(data.status);
      } else {
        setChats(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCompletedChats = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        "http://localhost:8080/api/getAssignmentFormCompleted",
        config
      );

      if (!data) {
        console.log(data.status);
      } else {
        setCompletedChats(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.delete(
        `http://localhost:8080/api/deleteAssignmentFormById/${id}`,
        config
      );
    } catch (err) {
      console.log(err);
    }
  };

  const AddintoCompletedData = async (chat) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8080/api/completedpostAssignmentForm",
        { chat: [chat] }, // Send chat as an array containing a single object
        config
      );
      if (!data) {
        console.log(data.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteCompletedChats = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.delete(
        `http://localhost:8080/api/deleteCompletedAssignmentFormById/${id}`,
        config
      );

      setCompletedChats(completedChats.filter((chat) => chat.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const exportToCSV = (y) => {
    const fileName = "exported_data";
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const fileExtension = ".xlsx";

    // Assuming chats is defined somewhere in your code
    const formattedChats = y.map((chat) => ({
      ...chat,
      start: format(new Date(chat.start), "MM/dd/yyyy"),
      end: format(new Date(chat.end), "MM/dd/yyyy"),
    }));

    const ws = XLSX.utils.json_to_sheet(formattedChats);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const completeDoneChats = async (id) => {
    handleDeleteCompletedChats(id);

    fetchCompletedChats();
    setTaskIdCounter(taskIdCounter + 1);
  };

  const completeChats = async (chat) => {
    handleDelete(chat._id);
    AddintoCompletedData(chat);
    setTaskIdCounter(taskIdCounter + 1);
  };

  return (
    <>
      <div className="container mx-auto mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold mb-4 md:mb-0">
            Pending Tasks : {userName}
          </h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-green hover:bg-blue-600"
            onClick={fetchData}
          >
            Refresh
          </button>
          {admin && (
            <div className="flex items-center">
              <div className="mr-4"></div>
              <button
                onClick={() => exportToCSV(chats)}
                className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-green active:bg-green-600"
              >
                Export to Excel
              </button>
            </div>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Task ID</th>
                <th className="py-2 px-4 border-b">IT Department</th>
                <th className="py-2 px-4 border-b">App Name</th>
                <th className="py-2 px-4 border-b">Activity Name</th>
                <th className="py-2 px-4 border-b">IT PIC</th>
                <th className="py-2 px-4 border-b">User Department</th>
                <th className="py-2 px-4 border-b">Start Date</th>
                <th className="py-2 px-4 border-b">End Date</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Remarks</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {admin
                ? chats.map((chat, index) => (
                    <tr key={chat.id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b">{index + 1}</td>
                      <td className="py-2 px-4 border-b">{chat.itDept}</td>
                      <td className="py-2 px-4 border-b">{chat.appName}</td>
                      <td className="py-2 px-4 border-b">
                        {chat.activityName}
                      </td>
                      <td className="py-2 px-4 border-b">{chat.itPic}</td>
                      <td className="py-2 px-4 border-b">{chat.userDept}</td>
                      <td className="py-2 px-4 border-b">
                        {new Date(chat.start).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {new Date(chat.end).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b">{chat.status}</td>
                      <td className="py-2 px-4 border-b">
                          <div className="overflow-auto max-w-xs">
                            <p className="whitespace-pre-wrap">
                              {chat.remarks}
                            </p>
                          </div>
                        </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => completeChats(chat)}
                          className="bg-green-500 w-15 h-7 pr-3 pl-3 text-white rounded-lg z-10 focus:outline-none focus:shadow-outline-green hover:bg-red-700"
                        >
                          Completed
                        </button>
                      </td>
                    </tr>
                  ))
                : chats
                    .filter((v) => v.itPic == userName)
                    .map((chat, index) => (
                      <tr key={chat.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b">{index + 1}</td>
                        <td className="py-2 px-4 border-b">{chat.itDept}</td>
                        <td className="py-2 px-4 border-b">{chat.appName}</td>
                        <td className="py-2 px-4 border-b">
                          <div
                            className="overflow-auto"
                            style={{ maxHeight: "100px" }}
                          >
                            {chat.activityName}
                          </div>
                        </td>
                        <td className="py-2 px-4 border-b">{chat.itPic}</td>
                        <td className="py-2 px-4 border-b">{chat.userDept}</td>
                        <td className="py-2 px-4 border-b">
                          {new Date(chat.start).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {new Date(chat.end).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-4 border-b">{chat.status}</td>
                        <td className="py-2 px-4 border-b">
                          <div className="overflow-auto max-w-xs">
                            <p className="whitespace-pre-wrap">
                              {chat.remarks}
                            </p>
                          </div>
                        </td>
                        <td className="py-2 px-4 border-b">
                          <button
                            onClick={() => completeChats(chat)}
                            className="bg-green-500 w-15 h-7 pr-3 pl-3 text-white rounded-lg z-10 focus:outline-none focus:shadow-outline-green hover:bg-red-700"
                          >
                            Completed
                          </button>
                        </td>
                      </tr>
                    ))}
            </tbody>
          </table>
        </div>
      </div>
      {admin && (
        <div className="container mx-auto mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold mb-4 md:mb-0">
              Completed Details
            </h1>
            <div className="flex items-center">
              <div className="mr-4"></div>
              <button
                onClick={() => exportToCSV(completedChats)}
                className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-green active:bg-green-600"
              >
                Export to Excel
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Task ID</th>
                  <th className="py-2 px-4 border-b">IT Department</th>
                  <th className="py-2 px-4 border-b">App Name</th>
                  <th className="py-2 px-4 border-b">Activity Name</th>
                  <th className="py-2 px-4 border-b">IT PIC</th>
                  <th className="py-2 px-4 border-b">User Department</th>
                  <th className="py-2 px-4 border-b">Start Date</th>
                  <th className="py-2 px-4 border-b">End Date</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Remarks</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {completedChats.map((chat, index) => (
                  <tr key={chat.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{chat.itDept}</td>
                    <td className="py-2 px-4 border-b">{chat.appName}</td>
                    <td className="py-2 px-4 border-b">{chat.activityName}</td>
                    <td className="py-2 px-4 border-b">{chat.itPic}</td>
                    <td className="py-2 px-4 border-b">{chat.userDept}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(chat.start).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {new Date(chat.end).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">{chat.status}</td>
                    <td className="py-2 px-4 border-b">
                          <div className="overflow-auto max-w-xs">
                            <p className="whitespace-pre-wrap">
                              {chat.remarks}
                            </p>
                          </div>
                        </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => completeDoneChats(chat._id)}
                        className="bg-red-500 w-15 h-7 pr-3 pl-3 text-white rounded-lg z-10 focus:outline-none focus:shadow-outline-green hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default FetchChats;
