import { Route, Routes } from "react-router-dom";
import { Login, Signup, TaskForm, Dashboard, DisplayDashboard } from "./pages";
import Home from "./pages/Home";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createTask" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/:email" element={<DisplayDashboard />} />
        {/* <Route path="/dashboard/:email" element={<DisplayDashboard />} /> */}
      </Routes>
    </div>
  );
}

export default App;