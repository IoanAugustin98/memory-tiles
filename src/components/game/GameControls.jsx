import { gameContext } from '@/context';
import React, { useContext } from 'react'

export const GameControls = () => {
    const { dispatch } = useContext(gameContext);
    const buttonClasses = 'text-2xl inline-flex border border-light px-16 py-2 bg-gray-300 rounded-lg';
  return (
    <div className='flex justify-between'>
        <button 
            type='button'
            title='New Game'
            className={buttonClasses}
            onClick={() => {
                dispatch({type: 'game:new'});
            }}
        >
            New Game
        </button>

        <div className={buttonClasses}>
            <span>Time 00:00</span>
        </div>
    </div>
  )
}
