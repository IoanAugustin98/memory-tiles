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
      const visibleTiles = state.tilesArray.filter(( { visible, matched } ) => {
        return visible && !matched;
      });

      const newTiles = state.tilesArray.slice();
      const playedTile = newTiles[payload];
      newTiles[playedTile.index] = {
        ...playedTile,
        visible: true
      }

      if( visibleTiles.length === 2 ) {
        const [ visibleTile1, visibleTile2 ] = visibleTiles;
        if( visibleTile1.id === visibleTile2.id ) {
          newTiles[visibleTile1.index] = {
            ...visibleTile1,
            matched: true
          };
          newTiles[visibleTile2.index] = {
            ...visibleTile2,
            matched: true
          };
        } else {
          newTiles[visibleTile1.index] = {
            ...visibleTile1,
            visible: false
          };
          newTiles[visibleTile2.index] = {
            ...visibleTile2,
            visible: false
          };
        }
        return {
          ...state,
          tilesArray: newTiles
        };
      }

      const matchedTiles = newTiles.filter(({matched}) => {
        return matched === true;
      });

      if(matchedTiles.length === newTiles.length-2){
        return {
          ...state,
          playing: false,
          gameWon: true,
        };
      }

      return {
        ...state,
        tilesArray: newTiles
      };

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
  const { tilesArray, playing, gameWon } = state;
  const newGame = ( difficulty = 'easy' ) => {
    dispatch({ type: 'game:new' });
  }

  useEffect(() => {
    newGame()
  },[]);

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