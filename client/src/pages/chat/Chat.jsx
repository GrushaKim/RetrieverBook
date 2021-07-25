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
                        <Conversation conversation={c} currentUser={user}/>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <Message />
                        <Message own={true} />
                        <Message />
                        <Message />
                        <Message />
                        <Message own={true} />
                        <Message />
                    </div>
                    <div className="chatBoxBottom">
                        <textarea 
                            className="chatMessageInput"
                            placeholder="leave your message"
                        ></textarea>
                        <button className="chatSubmitButton">Send</button>
                    </div>
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
