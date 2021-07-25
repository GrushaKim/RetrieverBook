import { useEffect, useState } from "react";
import "./Conversation.css";

export default function Conversation({conversation, currentUser}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const friendId = conversation.member.find(m=>m !== currentUser._id);
    }, []);

    return (
        <div className="conversation">
            <img 
                className="conversationImg"
                src="https://www.rover.com/blog/wp-content/uploads/2021/06/denvers_golden_life-1024x1024.jpg" 
                alt="" 
            />
            <span className="conversationName">Zariah</span>
        </div>
    )
}
