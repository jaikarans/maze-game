import { config, game } from '..';
import mazeMainLogo from '../../assets/mazeMainLogo.png'
import { createNewGame } from '../utils/newGame';

const canvas = document.getElementsByTagName('canvas')[0];

const mainMenu = document.createElement('div');

const logo = document.createElement('img');

const menuList = document.createElement('div');

const easy = document.createElement('button');
const medium = document.createElement('button');
const hard = document.createElement('button');
const setting = document.createElement('button');
const score = document.createElement('button');

mainMenu.id = 'mainMenu'
logo.id = 'logo'
menuList.id = 'menuList'


document.getElementsByTagName('body')[0].appendChild(mainMenu);
mainMenu.appendChild(logo);
mainMenu.appendChild(menuList);
menuList.append(easy, medium, hard, setting, score);

// logo properties
logo.src = mazeMainLogo

easy.innerText = 'Easy';
medium.innerText = 'Medium';
hard.innerText = 'Hard';
setting.innerText = 'Setting'
score.innerText = 'Score'

export const showMainMenu = () => {
    let gameDiv = document.getElementById('game');
    if (gameDiv){
        console.log('gameDiv is set to none')
        gameDiv.style.display = 'none';

    }
    
    mainMenu.style.display = 'block';

}

easy.addEventListener('click', () => {
    console.log('easy clicked.. ');

    // to add button click effect
    easy.classList.toggle("clicked");

    mainMenu.style.display = 'none';

    setTimeout(function() {
        easy.classList.remove("clicked");
    }, 100);
    
    let gameDiv = document.getElementById('game');
    if (gameDiv){
        gameDiv.style.display = 'block';

    }

    if (config.mobile) {
        config.numberOfRows = 14;
        config.numberOfColumns = 18;
        config.wallLineWidth = 3;
    } else {
        // for tablet, laptop and desktop
        config.numberOfRows = 18;
        config.numberOfColumns = 18;
        config.wallLineWidth = 4;
    }

    createNewGame();


})

medium.addEventListener('click', () => {
    medium.classList.toggle("clicked");

    // to add button click effect
    easy.classList.toggle("clicked");

    mainMenu.style.display = 'none';

    setTimeout(function() {
        easy.classList.remove("clicked");
    }, 100);
    
    let gameDiv = document.getElementById('game');
    if (gameDiv){
        gameDiv.style.display = 'block';

    }

    if (config.mobile) {
        config.numberOfRows = 20;
        config.numberOfColumns = 26;
        config.wallLineWidth = 2;
    } else {
        // for tablet, laptop and desktop
        config.numberOfRows = 30;
        config.numberOfColumns = 30;
        config.wallLineWidth = 4;
    }

    createNewGame();

})

hard.addEventListener('click', () => {
    hard.classList.toggle("clicked");

    // to add button click effect
    easy.classList.toggle("clicked");

    mainMenu.style.display = 'none';

    setTimeout(function() {
        easy.classList.remove("clicked");
    }, 100);
    
    let gameDiv = document.getElementById('game');
    if (gameDiv){
        gameDiv.style.display = 'block';

    }

    if (config.mobile) {
        config.numberOfRows = 35;
        config.numberOfColumns = 40;
        config.wallLineWidth = 2;
    } else {
        // for tablet, laptop and desktop
        config.numberOfRows = 60;
        config.numberOfColumns = 60;
        config.wallLineWidth = 1;
    }

    createNewGame();

})

setting.addEventListener('click', () => {
    setting.classList.toggle("clicked");

    setTimeout(function() {
        setting.classList.remove("clicked");
    }, 100);
})

score.addEventListener('click', () => {
    score.classList.toggle("clicked");

    setTimeout(function() {
        score.classList.remove("clicked");
    }, 100);

})