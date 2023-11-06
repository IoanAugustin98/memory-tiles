import React, { useContext, useEffect } from 'react'
import { GameControls, GameTile, difficultyMap } from '.';
import { gameContext } from '@/context';

export const Game = () => {
  const { state, dispatch } = useContext(gameContext);
  const { tilesArray, gameWon, difficulty } = state;
  const cols = difficultyMap[difficulty].cols;

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
      
      <div className={`inline-grid gap-4 grid-cols-${cols}`}>
      {
        tilesArray.map(( tile, index )=>{
          return ( 
            <GameTile key={index} index={index} tile={tile}></GameTile>
          );
        })
      }
      </div>
    </div>
  );
}