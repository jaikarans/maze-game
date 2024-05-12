const timer = document.getElementById('timer');

let paused = false; // Variable to track if the timer is paused
let pausedTime = 0; // Variable to store the time when paused

function updateTimer() {

    console.log('timer');
    // Get the current time
    var now = new Date().getTime();
    
    // Calculate the time difference between now and the start time
    var timeDiff = now - startTime;
    
    // Calculate hours, minutes, and seconds
    var hours: number | string = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes: number | string = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds: number | string = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    // Add leading zeros if necessary
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    
    // Update the timer display
    if (timer) {
        timer.innerHTML = hours + ":" + minutes + ":" + seconds;

    }
}


// Start the timer when the page loads
var startTime = new Date().getTime();

let startCounterId: NodeJS.Timeout;

export const startTimer = () => {
    startTime = new Date().getTime();
    if (timer) {
        timer.innerText = '00:00:00';
    }
    startCounterId = setInterval(updateTimer, 1000)
}

export const stopTimer = () => {
    clearInterval(startCounterId)
    
}

export const pauseTimer = () => {
    clearInterval(startCounterId);
    paused = true;
    pausedTime = new Date().getTime(); // Store the current time when paused

}

// Update the timer every second
export const resumeTimer = () => {
    // startTime = new Date().getTime();
    // startCounterId = setInterval(updateTimer, 1000)
    if (paused) {
        startTime += new Date().getTime() - pausedTime; // Adjust startTime to account for paused time
        startCounterId = setInterval(updateTimer, 1000);
        paused = false;
    }

}



