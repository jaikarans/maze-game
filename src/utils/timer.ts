const timer = document.getElementById('timer');

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

export const resetTimerText = () => {
    startTime = new Date().getTime();
    if (timer) {
        timer.innerText = '00:00:00';
    }
}

// Update the timer every second
export const startCounter = () => {
    startCounterId = setInterval(updateTimer, 1000)
}



export const stopCounter = () => {
    clearInterval(startCounterId);
}
