import React, { useEffect, useState } from 'react'
import { GameControls, GameDifficulty, GameTile, generateTilesArray } from '.';

export const Game = () => {
  const [ tilesArray, setTilesArray ] = useState([]);
  const [ unflipTimeoutId, setunflipTimeoutId ] = useState(-1);
  const [ gameState, setGameState ] = useState({
    playing: true,
    gameWon: false
  });

  const newGame = ( difficulty = 'easy' ) => {
    setTilesArray(generateTilesArray());
  }

  useEffect(() => {
    newGame()
  },[]);

  useEffect(() => {
    const matchedTiles = tilesArray.filter(({matched}) => {
      return matched === true;
    });

    if( tilesArray.length > 0 && matchedTiles.length === tilesArray.length ) {
      setGameState({
        playing: true,
        gameWon: true
      });
    }
  },[tilesArray, setGameState])

  useEffect(() => {
    const pairs = tilesArray.filter(( { visible, matched } ) => {
      return visible && !matched;
    });
    if( pairs.length === 2 ){
      const [ tile1, tile2 ] = pairs;
      if( tile1.id === tile2.id ) {
        tile1.matched = tile2.matched = true;
        setTilesArray(tilesArray.slice());
      } else {
        const timeoutId = setTimeout(() => {
          tile1.visible = tile2.visible = false;
          setTilesArray(tilesArray.slice());
        }, 5 * 1000);
        setunflipTimeoutId(timeoutId);
      }
    }
  },[tilesArray, setTilesArray]);

  const onClick = (tileIndex) => {
    const pairs = tilesArray.filter(( { visible, matched } ) => {
      return visible && !matched;
    });

    if( pairs.length >= 2 ) {
      pairs.forEach((pair) => {
        pair.visible = false;
      });
      if( unflipTimeoutId > 0 ) {
        clearTimeout(unflipTimeoutId);
        setunflipTimeoutId(-1);
      }    
    }

    const tile = tilesArray[tileIndex];
    //tile.visible = true;
    tilesArray[tileIndex] = {
      ...tile,
      visible: true
    };

    setTilesArray(tilesArray.slice());

  }

  if( tilesArray.length < 1 ){
    return 'Loding';
  }

  if( gameState.gameWon === true ) {
    return (
      <>
        <h2>You won</h2>
        <button 
          title='New game?'
          type='button'
          onClick={() => {
            setTilesArray(generateTilesArray());
            setGameState({
              playing: true,
              gameWon: false
            });
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
            onClick={onClick}
          >
          </GameTile>
          );
        })
      }
      </div>
    </div>
  );
}
