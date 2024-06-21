

export default function OptionsMessage({ socket, func, idMessage }) {
    function handleClick() {
        func(null);
    }
    function handleClickPopMessage() {
      socket.emit('popMessage', { idMessage });
    }
    return(
        <div className="absolute right-0 z-50">
            <div className=" bg-slate-950 border w-40 h-24 rounded-md">
                   <button onClick={handleClick} className="absolute bg-green-700 p-1 geist rounded-br-xl pr-10 hover:bg-green-900">Voltar</button>
            <div className="flex justify-center  items-center flex-col h-full">
                <p onClick={handleClickPopMessage} className="text-red-500 m-2 cursor-pointer hover:text-red-800">Excluir mensagem</p>
            </div>
            </div>
        </div>
    )
}