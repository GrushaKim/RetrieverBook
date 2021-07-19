import "./Message.css";

export default function Message({own}) {
    return (
        <div className={own ? "message own": "message"}>
            <div className="messageTop">
                <img 
                    className="messageImg"
                    src="https://www.rover.com/blog/wp-content/uploads/2021/06/denvers_golden_life-1024x1024.jpg" 
                    alt="" 
                />
                <p className="messageText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet neque nec erat mattis cursus. Donec luctus, mauris quis blandit volutpat, purus ligula blandit elit, in sollicitudin leo ligula a massa.</p>
            </div>
            <div className="messageBottom">a hour ago</div>
        </div>
    )
}
