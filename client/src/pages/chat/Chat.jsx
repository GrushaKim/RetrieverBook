import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversations from "../../components/conversations/Conversations";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import "./Chat.css";

export default function Chat() {
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
                    <Conversations />
                    <Conversations />
                    <Conversations />
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
