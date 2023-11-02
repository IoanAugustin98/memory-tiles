import React, { useContext, useEffect, useReducer, useState } from 'react'
import { GameControls, GameTile, generateTilesArray } from '.';
import { gameContext } from '@/context';

export const Game = () => {
  const { state, dispatch } = useContext(gameContext);
  const { tilesArray, playing, gameWon } = state;

  useEffect(() => {
    dispatch({ type: 'game:new' });
  },[dispatch]);

  if( tilesArray.length < 1 ){
    return 'Loading';
  }

  if( gameWon === true ) {
    return (
      <>
        <h2>You won</h2>
        <button 
          title='New game?'
          type='button'
          onClick={() => {
            dispatch({type: 'game:new'});
          }}
        >
          New game?
        </button>
      </>
    );
  }

  return (
    <div>
      <div className="w-2/3 mx-auto mb-10">
        <GameControls></GameControls>
      </div>
      
      <div className='inline-grid grid-cols-4 gap-4'>
      {
        tilesArray.map(( tile, index )=>{
          const { id, visible } = tile;
          return ( 
          /*<GameTile 
            key={index} 
            index={index} 
            tile={tile} 
            onClick={() => {
              dispatch({ type: 'game:playTile', payload: index })
            }}
          >
          </GameTile>*/
          <button 
            type='button' 
            title="Click here to uncover" 
            key={index} 
            className={`w-32 h-32 border border-primary rounded-md flex bg-gray-300 text-primary justify-center items-center text-4xl`}
            onClick={() => {
              dispatch({ type: 'game:playTile', payload: index });
            }}
          >
            { visible === true ? <i className={`${id} drop-shadow-sm`}></i> : <></> }
          </button>
          );
        })
      }
      </div>
    </div>
  );
}