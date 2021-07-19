const router = require("express").Router();
const Conversation = require("../models/Conversation");

//create a new conversation (put sender+receiver in an array)
router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }
});
//get a conversation id of a current user
router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId]},
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
