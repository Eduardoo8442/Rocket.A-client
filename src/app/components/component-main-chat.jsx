'use client'
import { useEffect, useState } from "react";
import { useRef } from "react";
import { io } from "socket.io-client";
import api from "@/api";
import Profile from "./templates/profile";
import { useDispatch } from "react-redux";
import { socket as socketFunction } from "@/store/actions";
import SocketExists from "./shared/SocketExists";
import ButtonChat from "./shared/ButtonChat";
import ImageFocus from "./embed-image-focus";
import OptionsMessage from "./embed-options-message";
export default function ChatEmbed() {
    const [messages, setMessages] = useState([]);
    const socket = io.connect(api);
    const [name, setName] = useState('Sem nome');
    const [linkImage, setLinkImage] = useState('/images/profile.png');
    const [imageClick, setImageClick] = useState(null);
    const [options, setOptions] = useState(null);
    const dispatch = useDispatch();
    const inputRef = useRef();
    dispatch(socketFunction(socket));
    function handleClick(image=null, type='message') {
    if(!inputRef.current.value.trim() && type !== 'image') return;
    socket.emit('sendMessage', { name: name, message: inputRef.current.value, image: linkImage, imageMessage: image });
    inputRef.current.value = '';
    }
    
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleClick();
        }
    }
    function handleClickImage(e) {
       if(!imageClick) {
        setImageClick(e.target.src);
       }
    }
    function handleClickMessage(e) {
    const ids = e.currentTarget.id.split(' ');
     if(ids[0] === name && options !== ids[1]) {
        setOptions(ids[1]);
     }
    }

    useEffect(() => {
        const imageBeta = window.sessionStorage.getItem('image');
        const nameBeta = window.sessionStorage.getItem('name');
        if(nameBeta) setName(nameBeta);
        if(imageBeta) setLinkImage(imageBeta);
        socket.emit('saveName', { name: window.sessionStorage.getItem('name')})
        socket.on('receive', data => {
            setMessages((currentList) => [...currentList, data]);
        });
        socket.on('connect', () => {
         socket.emit('joinedUser', { name: nameBeta });
        });
        socket.on('joinedUserSendClient', ({ name }) => {
            setMessages((currentList) => [...currentList, { joined: name }]);
        });
        socket.on('exitUserSendClient', ({ name }) => {
            setMessages((currentList) => [...currentList, { exit: name }]);
        });
        socket.on('popMessageSendClient', ({ idMessage }) => {
            setMessages((currentMessages) => {
                const index = currentMessages.findIndex(item => item.idMessage === idMessage);
                if(index !== -1) {
                    const elementMessage = document.querySelector(`.${idMessage}`);
                    if(elementMessage) {
                        elementMessage.remove();
                        const newMessages = [...currentMessages];
                        newMessages.splice(index, 1);
                        return newMessages;
                    } else {
                        console.log('não encontramos o elemento');
                    }
                }
                return currentMessages;
            });
        });
        return () => {
            socket.off('receive');
            socket.off('joinedUserSendClient');
            socket.off('popMessageSendClient');
            socket.disconnect();
          };
    }, []);
    return (
        <div>
            <ImageFocus func={setImageClick} src={imageClick}/>
            <SocketExists socket={socket}/>
            <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4">
            <ButtonChat func={handleKeyDown} func2={handleClick} refElement={inputRef}/>
        </div>
        <div className="phone:mb-10"></div> 
        {messages.map((message, index) => (
            <div key={index}>
                <div className="flex mb-2 items-center phone:ml-80">
                {message.joined ? <p className="text-green-500">O(a) {message.joined} entrou no chat!</p> : null}
                {message.exit ? <p className="text-red-500">O(a) {message.exit} saiu do chat!</p> : null}
                {message.name ? (
                        <div onClick={handleClickMessage} id={`${message.name} ${message.message}`} className={`${message.idMessage} flex justify-center relative flex-col`}>
                        {message.message === options ? <OptionsMessage socket={socket} func={setOptions} idMessage={message.idMessage}/> : null}
                        <div className="flex items-center">
                        <Profile imagesrc={message.image} styles='rounded-full w-8 h8'/>
                        <p className="inline ml-2 mr-1 text-gray-300">{message.name}:</p>
                        {message.message ? (<div> <p className=" text-white inline break-all">{message.message}</p></div>) : null }
                        </div>
                        {message.imageMessage ? <img onClick={handleClickImage} className="mt-2 max-w-80 cursor-pointer hover:brightness-50" src={message.imageMessage}/> : null }   
                        </div>             
                ) : null}
            </div>
            </div>
        ))}
        <div className="mt-40"></div>
    </div>
    );
}
