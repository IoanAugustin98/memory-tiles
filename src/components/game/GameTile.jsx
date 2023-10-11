import React from 'react'

export const GameTile = ({ tile, onClick = () => {}, index }) => {
    const { id, visible } = tile;
    return (
        <button 
            type='button' 
            title="Click here to uncover" 
            key={index} 
            className={`w-32 h-32 border border-primary rounded-md flex bg-gray-300 text-primary justify-center items-center text-4xl`}
            onClick={() => {
                onClick(index);
            }}
        >
            { visible === true ? <i className={`${id} drop-shadow-sm`}></i> : <></> }
        </button>
    )
}
