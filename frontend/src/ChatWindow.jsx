import "./chatwindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import React, { useContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {ScaleLoader} from "react-spinners";

function ChatWindow() {
const {prompt,setPrompt,reply ,setReply,currThreadId, prevChats,setPrevChats,setNewChat}=useContext(MyContext);

    const[loading,setLoading]=useState(false);
    const [isOpen, setIsOpen] = useState(false); // last main set as false 
      const navigate = useNavigate(); 


    // functions 
    const getReply=async ()=>{
        setLoading(true);
        setNewChat(false);
        console.log(false);
        console.log("Message",prompt,"threadId",currThreadId);
        const options={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            message:prompt,
            threadId:currThreadId
        })
        };
        try{
         const response=   await fetch("https://astrochat-gemini.onrender.com/api/chat",options);
         const res = await response.json();
            console.log(res);
            setReply(res.reply);

        }catch(err){
            console.log(err);
        }
        setLoading(false);
    }


   // --- LOGOUT LOGIC HERE (Tokaen hatana aur navigate karna) ---
    const handleLogout = async () => {
        // 1. JWT token ko hataana (Client-side Logout)
        localStorage.removeItem('userToken'); 
        
        // 2. Server ko notify karna (Optional call to the backend route)
        try {
            await fetch('https://astrochat-gemini.onrender.com/api/auth/logout', { method: 'POST' });
            console.log("Server notified of logout.");
        } catch(error) {
            console.error("Logout notification failed, continuing client-side logout:", error);
        }

        // 3. User ko Login page par bhej dena
        navigate('/login');
    };
    

    //append new chat to previeus chat
    useEffect(()=>{
        if(prompt && reply){
            setPrevChats(prevChats=>(
                [...prevChats,{
                    role:"user",
                    content:prompt
                },{
                    role:"assistant",
                    content:reply
                }]
            ));
        }
        
            setPrompt("");
        },[reply]); 


const handleProfileClick = ()=>{
    setIsOpen(!isOpen);
}


    return (  
    
        <div className="chatWindow" >
            <div className="navbar">
                <span>Gemini</span>
                <div className="userIconDiv" onClick={handleProfileClick}>
           <span className="userIcon"> <i className="fa-solid fa-user"></i> </span>
                </div>
            </div>

                        {/* user icon create  */}

                        {
                            isOpen && 
                            <div className="dropDown">

                                 <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
                                 <div className="dropDownItem" ><i class="fa-solid fa-cloud-arrow-up"></i>Upgrade plan</div>
                                  <div className="dropDownItem" onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i> Log out</div>
                                   <a href="/signup" style={{textDecoration: 'none' }}>  <div className="dropDownItem"><i class="fa-solid fa-user-plus"></i> signup</div></a>
                                    <a href="/login"  style={{textDecoration: 'none' }}>   <div className="dropDownItem"><i class="fa-solid fa-right-to-bracket"></i> Login</div></a> 
                            </div>
                        }

            <Chat></Chat>
            <ScaleLoader color="#fff" class="load" loading={loading} />
            <div className="chatInput">
                <div className="InputBox">
                    <input id="textmassage" placeholder="Messages"
                     value={prompt} onChange={(e)=> setPrompt(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter'?getReply():''}
                     >
                        
                  
                    </input>
                    <div id="submit" onClick={getReply}> <i  className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                   Gemini can make mistakes, so double-check it
                </p>

            </div>
       
        </div>
    );
}

export default ChatWindow;