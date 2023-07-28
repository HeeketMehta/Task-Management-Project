import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import TaskForm from './TaskForm';
import { ToastContainer, toast } from "react-toastify";
import Dashboard from './Dashboard';


const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  
  const [username, setUsername] = useState("");
  
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:5050",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      // console.log(email)
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  


  const createTask = async (task_title, priority, category, hours, email) => {

    try {
      const response = await axios.post('http://localhost:5050/createTask', {
        task_title,
        priority,
        category,
        hours,
        email,

      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Task created successfully:', response.data);

      navigate(`/dashboard/${email}`,{state:{id:email}});
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };




  const Logout = () => {
    
    removeCookie("token");
    navigate("/signup");
  };


  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username} </span>
        </h4>

        <div className="form_container">
        <span>Add a Task</span>
        <TaskForm createTask={createTask} />
        </div> 
        {/* <Dashboard /> */}

        
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;