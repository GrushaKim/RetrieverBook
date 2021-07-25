const router = require("express").Router();
const Chat = require("../models/Chat");

// add a message
router.post("/", async(req, res)=> {
    const newChat = new Chat(req.body);
    try {
        const savedChat = await newChat.save();
        res.status(200).json(savedChat);
    } catch (err) {
        res.status(500).json(err);
    };
})

//get all messages
router.get("/:conversationId", async(req, res)=> {
    try {
        const chats = await Chat.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
