import React, { useState } from 'react';
import Header from './Header';
import DynamicForm from './DynamicForm';
import SideDrawer from './SideDrawer';
import Homepage from './HomePage';
import ReplicateDynamicForm from './ReplicateDynamicForm';
import FetchChats from './FetchChats';

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCreateTaskClicked, setIsCreateTaskClicked] = useState(false);
  const [replicateDynamicFormButton, setReplicateDynamicFormButton] = useState(false);
  const [fetchTask, setfetchTasks] = useState(false);

  const retrievedUser = JSON.parse(localStorage.getItem('userInfo'));
  
  const userName = retrievedUser.userName;
  const admin  = retrievedUser.admin;


  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCreateTask = () => {
    setIsCreateTaskClicked(!isCreateTaskClicked);
    setfetchTasks(false);
    setReplicateDynamicFormButton(false);
  };

  const handleReplicateDynamicForm = () => {
    setReplicateDynamicFormButton(!replicateDynamicFormButton);
    setfetchTasks(false);
    setIsCreateTaskClicked(false);
  };

  const handlefetchTasks = () =>{ 
    setIsCreateTaskClicked(false);
    setReplicateDynamicFormButton(false);
    setfetchTasks(!fetchTask);
  }
  return (
    <div>
      <Header
        retrievedUserName={userName}
        admin = {admin}
        toggleDrawer={toggleDrawer}
        onCreateTask={handleCreateTask}
        toogleReplicateDynamicform={handleReplicateDynamicForm}
        toogleFetchingChats={handlefetchTasks}
      />
      <SideDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} userDetails={retrievedUser} toogleReplicateDynamicform={handleReplicateDynamicForm} />
      
      {isCreateTaskClicked && <DynamicForm />}
      {replicateDynamicFormButton && <ReplicateDynamicForm />}
      {fetchTask && <FetchChats admin={admin} userName={userName}/>}
      {!isCreateTaskClicked && !replicateDynamicFormButton && !fetchTask && <Homepage />}
    </div>
  );
};

export default Dashboard;
