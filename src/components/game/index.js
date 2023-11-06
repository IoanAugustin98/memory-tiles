import shuffle from 'lodash.shuffle';

export * from './Game'
export * from './GameControls'
export * from './GameTile'
export * from './GameDifficulty'

export const difficultyMap = {
    easy: {
        halfTiles: 6,
        cols: 4,
        label: 'Easy'
    },
    medium: {
        halfTiles: 12,
        cols: 6,
        label: 'Medium'
    },
    hard: {
        halfTiles: 20,
        cols: 8,
        label: 'Hard'
    },
    veryHard: {
        halfTiles: 30,
        cols: 10,
        label: 'Very Hard'
    }
};

export const icons = [
    'fa-solid fa-house',
    'fa-solid fa-magnifying-glass',
    'fa-solid fa-user',
    'fa-solid fa-check',
    'fa-solid fa-download',
    'fa-solid fa-image',
    'fa-solid fa-circle-xmark',
    'fa-solid fa-phone',
    'fa-solid fa-bars',
    'fa-solid fa-envelope',
    'fa-solid fa-location-dot',
    'fa-solid fa-music',
    'fa-solid fa-wand-magic-sparkles',
    'fa-solid fa-heart',
    'fa-solid fa-arrow-right',
    'fa-solid fa-bomb',
    'fa-solid fa-poo',
    'fa-solid fa-camera-retro',
    'fa-solid fa-comment',
    'fa-solid fa-caret-up',
    'fa-solid fa-truck-fast',
    'fa-solid fa-pen-nib',
    'fa-solid fa-arrow-up',
    'fa-solid fa-hippo',
    'fa-solid fa-face-smile',
    'fa-solid fa-calendar-days',
    'fa-solid fa-paperclip',
    'fa-solid fa-shield-halved',
    'fa-solid fa-file',
    'fa-solid fa-bell'
];

export const generateTilesArray = ( difficulty = 'easy' ) => {
    const slicedIcons = icons.slice(0,difficultyMap[difficulty].halfTiles);
    const tilesArray = shuffle([...slicedIcons, ...slicedIcons]);
    return tilesArray.map((id, index) => {
        return {
            id,
            matched: false,
            visible: false,
            index
        }
    });
};