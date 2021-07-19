import "./Conversations.css";

export default function Conversations() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
