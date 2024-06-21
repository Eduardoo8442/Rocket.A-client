import { useEffect } from "react";
import { useRouter } from "next/router";
export default function SocketExists({ socket }) {
    const router = useRouter();
    useEffect(() => {
    if(!socket) {
    router.push('/');
    }
    }, []);
    return(
        <></>
    )
}