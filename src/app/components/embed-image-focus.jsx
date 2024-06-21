'use client';
export default function ImageFocus({ func, src }) {
    function handleClick() {
        window.open(src, '_blank', 'noopener,noreferrer');
    }
    function handleClickExit() {
    func(null);
    }
    return (
        <div>
            {src ? (
                <div onClick={handleClickExit} className="h-screen w-screen fixed z-50 bg-gray-900 opacity-90 flex items-center justify-center">
                    <div className="rounded-md bg-slate-950 w-80 h-80 relative">
                        <button className="absolute bg-green-700 p-1 geist rounded-br-xl pr-10 hover:bg-green-900">Voltar</button>
                        <div className="flex justify-center items-center flex-col h-full">
                        <img className="max-h-40" src={src}/>
                        <p onClick={handleClick} className="text-white geist text-xs mt-10 hover:text-gray-500 cursor-pointer">Abrir em outra página</p>
                        </div>
                      
                    </div>
                </div>
            ) : null}
        </div>
    );
}