import { useEffect, useState } from "react";
export default function Profile({ styles, imagesrc=undefined }) {
    const [image, setImage] = useState('/images/profile.png');
    useEffect(() => {
        if(!imagesrc) {
            const imageme = window.sessionStorage.getItem('image') || null;
            if(imageme) {
                setImage(imageme);
            }
        } else {
            setImage(imagesrc);
        }
    }, []);
    return(
        <img className={styles} src={image}/>
    )
}