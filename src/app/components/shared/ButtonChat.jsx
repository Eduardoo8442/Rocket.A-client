import React, { useState } from 'react';
import ButtonOptions from '../templates/ButtonsOptions';

export default function ButtonChat({ func, func2, refElement }) {
  const [options, setOptions] = useState(false);
  function handleClick(e) {
    setOptions(value => value ? false : true);
  }
  return (
    <div>
      <input 
        onKeyDown={func} 
        ref={refElement} 
        className="bg-gray-800 text-white p-2 w-60 rounded-md mr-2" 
        placeholder="Digite sua mensagem..." 
      />
      <button 
        onClick={handleClick}
        className="bg-blue-500 text-white text-3xl px-4 py-2 pt-0 rounded-md"
      >
        +
      </button>
      {options ? <ButtonOptions func={func2} /> : null }
    </div>
  );
}
