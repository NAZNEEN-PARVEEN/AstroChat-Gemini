import express, { response } from "express";
import  Threads  from "../modles/Thread.js";
import Thread from "../modles/Thread.js";
import getGeminiAPIResponse from "../utils/openai.js";
import ensureAuth from "../middleware/authMiddleware.js";  


const router = express.Router();

//test
router.post("/test",async(req,res)=>{
    try{
        const thread = new Threads({
            threadId:"saman javed",
            title:"Testing New Thread2"
        });
        const response = await thread.save();
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"failed to save in DB"});

 
    }
});


// To get all threads 1
router.get("/thread", async (req, res) => {
    try {
        // ✅ Correct way to sort by `updatedAt` in descending order
        const threads = await Threads.find({}).sort({ updatedAt: -1 });
        res.json(threads);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch threads" });
    }
});

//get id, router 2
router.get("/thread/:threadId",async (req, res)=>{

    const {threadId} = req.params;
    try{
         const thread = await Thread.findOne({threadId});

         if(!thread){
            res.status(404).json({error:"Thread not found "});
         }
         res.json(thread.messages);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to fetch chat"});
    }
});


//delete
router.delete("/thread/:threadId", ensureAuth,async(req,res)=>{
    const {threadId} = req.params;

    try{
       const deleteThread= await Thread.findOneAndDelete({threadId});

       if(!deleteThread) {
        res.status(404).json({error:"Thread not found "});
       }

       res.status(200).json({success:"Thread delete successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"failed to delete thread"});

    }
});



//chat
router.post("/chat",async(req,res)=>{
    const  {threadId,message}=req.body;

    if(!threadId || !message){
        res.status(400).json({error:"missing messages"});
    }

    try{
        let thread = await Thread.findOne({threadId});

        if(!thread){
            //create a new thread in DB
            thread= new Thread({
                threadId,
                title:message,
                messages:[{role: "user", content:message}]
            });
        }else{
            thread.messages.push({role:"user",content:message});
        }


        //reply assitant
        const assistantReply = await getGeminiAPIResponse(message);

     thread.messages.push({role:"assistant",content:assistantReply});
        thread.updatedAt = new Date();

            await thread.save();
            res.json({reply:assistantReply});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"sonething went wrong "});
    }
});






export default router;