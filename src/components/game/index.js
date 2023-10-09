import shuffle from 'lodash.shuffle';

export * from './Game'

const difficultyMap = {
    easy: 6
};

export const icons = [
    'fa-solid fa-house',
    'fa-solid fa-magnifying-glass',
    'fa-solid fa-user',
    'fa-solid fa-check',
    'fa-solid fa-download',
    'fa-solid fa-image',
    'fa-regular fa-image'
];

export const generateTilesArray = ( difficulty = 'easy' ) => {
    const slicedIcons = icons.slice(0,difficultyMap[difficulty]);
    const tilesArray = shuffle([...slicedIcons, ...slicedIcons]);
    return tilesArray.map((id) => {
        return {
            id,
            matched: false,
            visible: false
        }
    });
};