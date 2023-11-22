import { gameContext } from '@/context';
import React, { useContext } from 'react'
import { GameTimer } from './GameTimer';

export const GameControls = () => {
    const { dispatch, state } = useContext(gameContext);
    const { timeLeft } = state;
    const buttonClasses = 'text-2xl inline-block border border-light py-2 bg-gray-300 rounded-lg basis-1/3 text-center';
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
        <GameTimer timeLeft={timeLeft}></GameTimer>       
    </div>
  )
}
