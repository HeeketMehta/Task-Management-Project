import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";


const Dashboard = ({email_from_displaydash}) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const fetchTasks = async () => {
      try {
        
        
        const response = await axios.get(`http://localhost:5050/dashboard/${email_from_displaydash}`,{params:{data:email_from_displaydash}}, {withCredentials:true});
        console.log(response)
        
        setTasks(response.data);
      } 
      catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map((task) => (
          
          <li key={task._id}>{task.task_title} {task.category} {task.priority} {task.hours} {task.email}</li>
        ))}
    </div>
  );
};

export default Dashboard;