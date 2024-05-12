import soundEnabled from '../../assets/soundIcon50.png';
import soundDisabled from '../../assets/noSoundIcon50.png';
import crossImg from '../../assets/cross30.png';
import { config } from '../index';
import { enableTouchSwipe } from '../mobileTouch/mobileTouchHandler';
import { enableKeybordControl } from '../keybordAction/keybordHandler';

const setting = document.getElementById('setting');


const crossIcon: HTMLImageElement = document.createElement('img');
crossIcon.src = crossImg;
crossIcon.id = 'crossIcon';
setting?.appendChild(crossIcon);

const soundIcon: HTMLImageElement = document.createElement('img');
soundIcon.src = soundEnabled;
soundIcon.id = 'soundIcon'
setting?.appendChild(soundIcon);


soundIcon.addEventListener('click', () => {

    if (config.soundEnabled) {
        config.soundEnabled = false;
        soundIcon.src = soundDisabled;

    } else {
        config.soundEnabled = true;
        soundIcon.src = soundEnabled;
    }
});

crossIcon.addEventListener('click', () => {
    if (setting) {
        setting.style.display = 'none';
    }

    // enable touch swipe
    enableTouchSwipe();
    // enbale keyboard keys for controlling game
    enableKeybordControl();
});