import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./Chat.css";

export default function Chat() {

    const {user} = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);

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
                            <Message message={m} own={m.sender === user._id} />
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea 
                            className="chatMessageInput"
                            placeholder="leave your message"
                        ></textarea>
                        <button className="chatSubmitButton">Send</button>
                    </div>
                    </> : <span className="noConversationText"> Start to chat!</span>}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline />
                </div>
            </div>
        </div>
        </>
    )
}
