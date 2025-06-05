app.post("/accesMessage/:id", async (req, res) => {
    try {
        const { userId, txt ,imgUser,imgProfile} = req.body; 
 
        let isChat = await ChatTalking.findOne({
            $and: [
                { users: { $elemMatch: { $eq: req.params.id } } }, 
                { users: { $elemMatch: { $eq: userId } } }  
            ]
        });
        

        if (isChat) {

          
            isChat.messages.push({
                imgUser : imgUser,
                senderId: userId,  
                content: txt,  
                timestamp: new Date() ,
                imgProfile : imgProfile,

            });
             
            io.emit("PrvMessages", { room: isChat });

            await isChat.save();
            // like here if i push some message to user  get preveous message and increamnt to my new message and send it again to front and this mean should be do  the logic if this chat exisit get it instead this telle me this good idea for this or no ? 
            return res.json(isChat);  
           

        } else {
             
            const newChat = new ChatTalking({
                users: [req.params.id, userId],  
                messages: []
            });
            await newChat.save(); // Save the new chat
            return res.json(newChat); // Return the new chat
       
        }

    } catch (error) {
        console.log(`This Error by ${error}`); // Log the error
        res.status(404).json({ message: error }); // Send a 404 response with the error message
    }
});
