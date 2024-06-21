import { useRef, useCallback } from "react";
import { FaImages } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

import api from "@/api";

export default function ButtonOptions({ func }) {
  const buttonFileRef = useRef(null);
  
  const handleClickFunc = useCallback(() => {
  func();
  }, [func]);
  function handleFileChange() {
    const file = buttonFileRef.current.files[0];
    if (!file) {
      return;
    }

    const url = `${api}/upload`;
    const formData = new FormData();
    formData.append('file', file);

    fetch(url, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(result => {
      const imageLink = result.imageLink;
      func(imageLink, 'image');
    })
    .catch(error => {
      console.error('erro ao enviar imagem:', error);
    });
  }
  function handleClick() {
    buttonFileRef.current.click();
  }
  return (
    <div>
        <button  onClick={handleClick}  className="bg-blue-500 rounded p-2 m-2 mr-0 hover:bg-blue-300 animate-spawn">
          <FaImages />
        </button>
      <input 
        type="file" 
        ref={buttonFileRef} 
        id="buttonImage" 
        accept="image/*" 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />
      <button 
        onClick={handleClickFunc} 
        className="bg-blue-500 rounded p-2 m-2 hover:bg-blue-300 animate-spawn"
      >
        <IoIosSend />
      </button>
    </div>
  );
}
