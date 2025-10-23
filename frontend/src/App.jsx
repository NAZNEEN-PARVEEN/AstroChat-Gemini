import './App.css'
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import Login from "./login.jsx"; 
import Signup from "./signup.jsx"; 
import { MyContext } from "./MyContext.jsx";
import { useState } from 'react';
import { v1 as uuidv1 } from "uuid";
import { BrowserRouter, Routes, Route } from 'react-router-dom';



// Component to hold the main chat layout (Sidebar + ChatWindow)
function MainLayout() {
  // Authentication check can be added here (e.g., redirecting if no token)
  return (
    <div className=' main '> 
        <Sidebar />
        <ChatWindow />
    </div>
  );
}


function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads
  };

  return (
    // BrowserRouter is essential for enabling routing
    <BrowserRouter>
      <MyContext.Provider value={providerValues}>
        <div className='app'>
          <Routes>
            
            {/* Login Route: Renders only the Login page when URL is /login */}
            <Route path="/login" element={<Login />} />
            
            {/* Signup Route: Renders only the Signup page when URL is /signup */}
            <Route path="/signup" element={<Signup />} />
            
            {/* Main Application Route: Renders the chat interface when URL is / */}
            <Route path="/" element={<MainLayout />} /> 

          </Routes>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;