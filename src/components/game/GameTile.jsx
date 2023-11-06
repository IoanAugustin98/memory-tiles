import { gameContext } from '@/context';
import React, { useContext } from 'react'

export const GameTile = ({ tile, index }) => {
    const { dispatch } = useContext(gameContext);
    const { id, visible } = tile;
    return (
        <button 
            type='button' 
            title="Click here to uncover" 
            key={index} 
            className={`w-32 h-32 border border-primary rounded-md flex bg-gray-300 text-primary justify-center items-center text-4xl`}
            onClick={() => {
                dispatch({ type: 'game:playTile', payload: index })
            }}
        >
            { visible === true ? <i className={`${id} drop-shadow-sm`}></i> : <></> }
        </button>
    );
}
