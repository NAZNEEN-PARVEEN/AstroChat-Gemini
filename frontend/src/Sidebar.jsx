import "./sidebar.css";
import { useContext, useEffect, useState } from "react"; // 1. Import useState
import {MyContext} from "./MyContext.jsx";
import {v1 as uuidv1} from "uuid";


function Sidebar () {

  // State for mobile sidebar visibility (Default to false/hidden)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 2. New State

  // Toggle function
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  }

  //show all threads 
  const {allThreads,setAllThreads,currThreadId,setNewChat,setPrompt,setReply,setCurrThreadId,setPrevChats}= useContext(MyContext);

  const getAllThreads=async()=>{
    try{
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();
      //find title and id 
      const filtereData = res.map(thread => ({threadId:thread.threadId, title:thread.title}));
      setAllThreads(filtereData);
    }catch(err){
      console.log(err);
    }

  };

  useEffect(()=>{
    getAllThreads();
  },[currThreadId]);


  //when click new chat 
  const createNewChat = ()=>{
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
    // Optionally close sidebar on new chat creation
    setIsSidebarOpen(false); 
  }

  //fetch old data 
  const ChangeThread = async(newThreadId)=>{
    setCurrThreadId(newThreadId);

      try{
      const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
        const res = await response.json();
        console.log(res);
        setPrevChats(res);
        setNewChat(false);
        setReply(null);
        // Close sidebar when an old thread is selected
        setIsSidebarOpen(false); 
      }catch(err){
        console.log(err);

      }
  }
    
  const deleteThread = async (threadId) =>{

  try {
    const response = await fetch(`http://localhost:8080/api/thread/${threadId}`, { method:"DELETE" });
    const res = await response.json();
    console.log(res);

    //updated threads re-render
    setAllThreads(prev => prev.filter(thread => thread.threadId != threadId));

    if(threadId == currThreadId){
      createNewChat();
    }

  } catch (err) {
    console.log(err);
  }
}

    return ( 
      <>
        {/* 3. Mobile Toggle Button */}
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {/* Example icon (ensure you have Font Awesome loaded) */}
          <i className="fa-solid fa-bars"></i> 
        </button>

        {/* 4. Conditional Class for Sidebar Visibility */}
        <section className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
             <button onClick={createNewChat}>
                 <img src="src/assets/after remove.png" className="logo"></img>
             <span> <i className="fa-solid fa-pen-to-square"></i></span> 
             </button>

             {/* Close button for when sidebar is open on mobile (optional) */}
             {isSidebarOpen && (
               <button className="sidebar-close-btn" onClick={toggleSidebar}>
                 <i className="fa-solid fa-xmark"></i>
               </button>
             )}


        <ul className="history">
          {
              allThreads?.map((thread,idx)=>(
                <li key={idx}
                onClick={(e) => ChangeThread (thread.threadId)}
                className={thread.threadId=== currThreadId ? "highlighted":" "}
                >

                  {thread.title}
                  <i className="fa-solid fa-trash"
                  onClick={(e)=>{
                    e.stopPropagation();//stop event bubbling 
                    deleteThread(thread.threadId);
                  }}
                  ></i>
                  </li>
              ))
          }
        </ul>

        <div className="sign">
          <p>By Nazneen Perveen &#9829;</p>
        </div>
        </section>
      </>
    );
}
export default Sidebar;