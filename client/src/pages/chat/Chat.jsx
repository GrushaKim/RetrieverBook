import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./Chat.css";
import {io} from "socket.io-client";

export default function Chat() {

    const {user} = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivedMessage, setArrivedMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const scrollRef = useRef();

    // connect to socket
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", data => {
            setArrivedMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    },[]);

    useEffect(() => {
        arrivedMessage && currentChat?.members.includes(arrivedMessage.sender) &&
        setMessages(prev => [...prev, arrivedMessage])
    }, [arrivedMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users=>{
            setOnlineUsers(users);
        })
    },[user]);

    // take event(message) from server.
    

    // get conversation info of each friend (id, username, profile picture)
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/convs/"+user._id);
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user._id]);
    
    // get all messages from the selected conversation
    useEffect(()=>{
        const getMessages = async () =>{
            try {
                const res = await axios.get("/chats/"+currentChat?._id)
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    },[currentChat]);

    // send a message 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };
        
        // distinguish a receiver
        const receiverId = currentChat.members.find((member) => member !== user._id);
        
        //send a message to socket server. 
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });

        try {
            const res = await axios.post("/chats", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    return (
        <>
        <Topbar />
        <div className="chat">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input 
                        type="text"
                        placeholder="Search for friends"
                        className="chatMenuInput" 
                />
                    {conversations.map((c) => (
                        <div onClick={()=>setCurrentChat(c)}>
                        <Conversation conversation={c} currentUser={user} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentChat ?
                        <>
                   
                    <div className="chatBoxTop">
                        {messages.map((m) => (
                            <div ref={scrollRef}>
                            <Message message={m} own={m.sender === user._id} />
                            </div>
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea 
                            className="chatMessageInput"
                            placeholder="leave your message"
                            onChange={(e)=>setNewMessage(e.target.value)}
                            value={newMessage}
                        ></textarea>
                        <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                    </div>
                    </> : <span className="noConversationText"> Start to chat!</span>}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline 
                        onlineUsers={onlineUsers} 
                        currentId={user._id} 
                        setCurrentChat={setCurrentChat}
                    />
                </div>
            </div>
        </div>
        </>
    )
}
