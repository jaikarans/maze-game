import mazeMainLogo from '../../assets/mazeMainLogo.png'
const mainMenu = document.createElement('div');

const logo = document.createElement('img');

const menuList = document.createElement('div');

const easy = document.createElement('button');
const medium = document.createElement('button');
const hard = document.createElement('button');
const options = document.createElement('button');
const score = document.createElement('button');

mainMenu.id = 'mainMenu'
logo.id = 'logo'
menuList.id = 'menuList'


document.getElementsByTagName('body')[0].appendChild(mainMenu);
mainMenu.appendChild(logo);
mainMenu.appendChild(menuList);
menuList.append(easy, medium, hard, options, score);

// logo properties
logo.src = mazeMainLogo

easy.innerText = 'Easy';
medium.innerText = 'Medium';
hard.innerText = 'Hard';
options.innerText = 'Options'
score.innerText = 'Score'

export const showMainMenu = () => {
    document.getElementsByTagName('canvas')[0].style.display = 'none';
    mainMenu.style.display = 'block';

}

easy.addEventListener('click', () => {
    console.log('easy clicked.. ');
})

medium.addEventListener('click', () => {

})

hard.addEventListener('click', () => {

})

options.addEventListener('click', () => {

})

score.addEventListener('click', () => {
    
})