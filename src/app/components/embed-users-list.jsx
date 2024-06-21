import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SocketExists from "./shared/SocketExists";
export default function UsersList() {
    const socket = useSelector(state => state.setSocket.setSocket);
    const [listUsers, setListUsers] = useState([]);
    useEffect(() => {
        if (socket) {
            socket.emit('usersList');
            socket.on('receiveListUsers', data => {
                setListUsers(data.data);
            });
            return () => socket.off('receiveListUsers');
        }
    }, [socket]);
    return(
        <div className="flex justify-center">
            <SocketExists socket={socket} />
           <div className="bg-gray-800 w-screen">
            <div className="mt-10">
            {listUsers.map((user, index) => (
            <div key={index}>
                {user.name ? (
                    <div className="flex justify-center"> 
                         <div className="flex justify-center bg-gray-900 mb-2 mt-4 w-52 h-10 items-center phone:ml-80">
                       <p className="geist text-white">{user.name}</p>
                    </div>
                    </div>
                ) : null}
            </div>
        ))}
        </div>
           </div>
        </div>
    )
}