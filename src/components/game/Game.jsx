import React, { useEffect, useReducer, useState } from 'react'
import { GameControls, GameTile, generateTilesArray } from '.';

const initialState = {
  tilesArray: [],
  unflipTimeoutId: -1,
  playing: true,
  gameWon: false,
  difficulty: 'easy'
}

const reducer = (state, {type, payload}) => {
  switch(type) {
    case 'game:new':
      return {
        ...state,
        tilesArray: generateTilesArray(),
        playing: true,
        gameWon: false
      }
    case 'game:won':
        return {
          ...state,
          playing: false,
          gameWon: true
        }
    case 'game:lost':
      return {
        ...state,
        playing: false,
        gameWon: false
      }
    case 'game:playTile':
      const pairs = state.tilesArray.filter(( { visible, matched } ) => {
        return visible && !matched;
      });
      if( pairs.length >= 2 ) {
        pairs.forEach((pair) => {
          pair.visible = false;
        });
      }
      if( pairs.length === 2 ) {
        
      }
      const tile = state.tilesArray[payload];
      const newTiles = state.tilesArray.slice();
      newTiles[payload] = {
        ...tile,
        visible: true
      };
      return {
        ...state,
        tilesArray: newTiles
      }
    case 'game:setTilesArray':
      return {
        ...state,
       tilesArray: payload
      }
    case 'game:setUnflipTimeoutId':
      return {
        ...state,
        timeoutId: payload
      }
    default:
      return state;
  }
}

export const Game = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { tilesArray, playing, gameWon, unflipTimeoutId } = state;
  const newGame = ( difficulty = 'easy' ) => {
    dispatch({ type: 'game:new' });
  }

  useEffect(() => {
    newGame()
  },[]);

  useEffect(() => {
    const matchedTiles = tilesArray.filter(({matched}) => {
      return matched === true;
    });
    if( tilesArray.length > 0 && matchedTiles.length === tilesArray.length ) {
      dispatch({ type: 'game:won' });
    }
  },[tilesArray, dispatch]);

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
        <GameControls newGame={newGame}></GameControls>
      </div>
      
      <div className='inline-grid grid-cols-4 gap-4'>
      {
        tilesArray.map(( tile, index )=>{
          return ( 
          <GameTile 
            key={index} 
            index={index} 
            tile={tile} 
            onClick={() => {
              dispatch({ type: 'game:playTile', payload: index })
            }}
          >
          </GameTile>
          );
        })
      }
      </div>
    </div>
  );
}
