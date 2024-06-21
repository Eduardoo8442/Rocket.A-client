'use client'
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRouter } from "next/router";
import Profile from "./profile";
import Link from "next/link";
export default function RightBar() {
    const [embed, setEmbed] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [name, setName] = useState('');
    const router = useRouter();
    useEffect(() => {
        if(!window.sessionStorage.getItem('name')) router.push('/');
        setMobile(window.innerWidth >= 770 ? true : false);
        setEmbed(window.innerWidth >= 770 ? true : false);
        setName(window.sessionStorage.getItem('name'));
    }, []);
    function handleClick() {
        console.log(embed)
        if(embed) setEmbed(false);
        else setEmbed(true)
    }



    function Bar() {
        return(
        <div className="bg-gray-950 h-screen w-80 fixed">     
       {mobile ? null :  <RxHamburgerMenu onClick={handleClick} className="fixed"/> }
       <div className="flex m-auto w-full h-full flex-col">
         <div className="flex justify-center items-center bg-gray-800 w-auto h-10 m-10">
             <Profile styles='rounded-full w-7 h7'/>
             <h1 className="geist ml-2 text-white">{name}</h1>
          </div>
          <div className="flex justify-center text-center">
          <div className="flex flex-col roboto text-white">
            <Link href='/chat'><p className="m-2 hover:text-gray-400">Chat</p></Link>
            <Link href='/users'><p className="m-2 hover:text-gray-400">Lista de usuários</p></Link>
          </div>
          </div>
       </div>
        </div>
        )
    }

    return(
        <div>
            {embed ? <Bar /> : <RxHamburgerMenu className="fixed" onClick={handleClick}/> }
        </div>
    )
}