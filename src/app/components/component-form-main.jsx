'use client'
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import api from "@/api";
export default function FormMain() {
    const router = useRouter();
    const [error, setError] = useState('');
    const inputFileRef = useRef();
    const inputRef = useRef();
    const [image, setImage] = useState('/images/profile.png');
    const [click, setClick] = useState(false);
    function handleChange() {
        setError('');
    }

    async function handleClick() {
        if(!inputRef.current.value.trim()) return setError('Coloque um nome');
        if(inputRef.current.value.length > 16) return setError('Coloque um nome menor');
        if(click) return;
        setClick(true);
        window.sessionStorage.setItem('name', inputRef.current.value);

        fetch(`${api}/entry`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: inputRef.current.value })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Erro ao fazer a requisição');
          }
          return response.json();
      })
      .then(data => {
          router.push('/chat');
      })
      .catch(error => {
          console.error('Erro:', error);
      });
    }
    function handleFileChange() {
        const file = inputFileRef.current.files[0];
        if (!file) {
          toast.info("Selecione um arquivo.", {
            position: toast.POSITION.BOTTOM_CENTER
          });
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
          window.sessionStorage.setItem('image', imageLink);
          setImage(imageLink);
          console.log('imagem atualizada com sucesso')
        })
        .catch(error => {
          console.error('Erro na requisição fetch:', error);
        });
      }
      useEffect(() => {
        const imageme = window.sessionStorage.getItem('image') || null;
        if(imageme) {
            setImage(imageme);
        }

    }, []);

    return(
    <div className="flex justify-center mt-10">
        <div className="flex flex-col">
        <label htmlFor="imageInput" style={{ cursor: 'pointer' }}>
        <img className="rounded-full w-20 h-20 m-auto" id="imageButton" src={image} />
        </label>
        <input type="file" ref={inputFileRef} id="imageInput" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />

        <input onChange={handleChange} ref={inputRef} className="mt-10 px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:border-gray-700 geist" placeholder="Nome" />
        {error ? <p className="geist text-red-600">{error}</p> : null}
        <button onClick={handleClick} className="mt-5 hover:text-gray-400">Entrar</button>
        </div>
    </div>
    )
}