import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './ChatOnline.css';

export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {

    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // get all friends from the current user
    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get("/users/friends/"+currentId);
            setFriends(res.data);
        };
        getFriends();
    },[currentId]);

    // 
    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    },[friends, onlineFriends]);

    //dispatch a conversation of a current user and a clicked friend online.
    const handleClick = async (user) => {
        try {
            const res = await axios.get(`/convs/find/${currentId}/${user._id}`);
            setCurrentChat(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="chatOnline">
            {onlineFriends.map((o) => (
             <div className="chatOnlineFriend" onClick={()=>{handleClick(o)}}>
                <div className="chatOnlineImgContainer">
                    <img
                        className="chatOnlineImg" 
                        src={o?.profilePicture ? PF+o.profilePicture : PF+"person/noAvatar.png"}
                        />
                    <div className="chatOnlineBadge">

                    </div>
                </div>
               <span className="chatOnlineName">{o?.username}</span>
             </div>
            ))}
        
        </div>
    )
}
