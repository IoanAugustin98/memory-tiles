import React, { useContext } from 'react'
import { difficultyMap } from '.'
import { gameContext } from '@/context'

export const GameDifficulty = () => {
    const { state, dispatch } = useContext(gameContext);
    const { difficulty } = state;
  return (
    <div className='w-2/3 mx-auto text-2xl flex justify-between gap-24'>
        <label>Diffilcuty:</label>
        <ul className='flex justify-between gap-24'>
            {
                Object.entries(difficultyMap).map(([key, { label, halfTiles }]) => {
                    return (
                        <button 
                            key={key} 
                            title={`Set difficulty to ${label} (${halfTiles * 2} tiles)`}
                            onClick={ () => {
                                dispatch({
                                    type: 'game:setDifficulty',
                                    payload: key
                                });
                            }}
                            className={`${difficulty === key ? 'text-primary font-bold' : '' }`}
                        > 
                            { label } 
                        </button>
                    );
                })
            }
        </ul>
    </div>
  )
}
