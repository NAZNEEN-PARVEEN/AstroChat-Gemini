import "./Chat.css";
import {useContext,useState,useEffect} from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css";

//react -markdown
//rehype- hightlight 


function Chat() {
  const {newChat,prevChats,reply} = useContext(MyContext);
  const [latestReply,setLatestReply]=useState(null);

  useEffect(()=>{
      if(reply === null){
        setLatestReply(null);
        return;
      }


    //latestReply seprate =>typing effect create
    if(!prevChats?.length)return;

    const content = reply.split(" "); //individual words

    let idx=0;
    const interval = setInterval(()=>{
      setLatestReply(content.slice(0, idx+1).join(" "));
      idx++;
      if(idx >= content.length) clearInterval(interval);
    },40);
    return ()=> clearInterval(interval);
  },[prevChats,reply]);


  //chat for login 
  const token = localStorage.getItem("token");
// if (!token) window.location.href = "/login";

<button onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}>
  Logout
</button>


    return (
        <>

        {newChat && <h1> Start New Chat  My Friend ?</h1>}
        <div className="chats">
          {
            prevChats?.slice(0,-1).map((chat,idx)=>
            <div className={chat.role === "user" ? "userDiv" : "gptDiv" } key={idx}>
                {
                  chat.role === "user"?
                  <p className="userMessage">{chat.content}</p> :
                 <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                }
            </div>
             )
          }

              {/* convert in ternury to better perfoms */}

            {
                 prevChats.length > 0 && (
                  <>
                   {
                latestReply === null ? (
                   <div className="gptDiv" key={"non-typing"}>
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>
                  </div>

                ): (

                    <div className="gptDiv" key={"typing"}>
                   <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                  </div>
                )
              }


                  </>
                 )
            }
             

             






        </div>

        </>
      );
}

export default Chat;