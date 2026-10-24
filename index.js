//audios
var startAudio = document.getElementById("start-audio");
var mediAudio = document.getElementById("medi-audio");
var concludeAudio = document.getElementById("conclude-audio");

//var selectWrapper = document.getElementById("selection-wrapper");
//var buttonWrapper = document.getElementById("button-wrapper");
//image
var mediImg = document.getElementById("medi-img");
var errorMessage = document.getElementById("error-message");
var minsSelect = document.getElementById("mins-selection");

var selectedMins = 0;
    minsSelect.addEventListener("change",function(){
        selectedMins = parseInt(minsSelect.value,10);
        console.log(selectedMins);
    });


var timeOut1, timeOut2;

//AI generated part
var wakeLock = null; // Variable to hold the wake lock
//AI generated part

function resetAllData() {
        clearTimeout(timeOut1);
        clearTimeout(timeOut2);

        startAudio.pause();
        mediImg.style.animation = 'none';
        mediAudio.pause();
        concludeAudio.pause();

        //AI generated part
        // Release the wake lock when stopping/resetting
        if (wakeLock !== null) {
            wakeLock.release().then(() => {
              wakeLock = null;
           });
        }
        //AI generated part
}

//AI generated part
async function requestWakeLock() {
    // Keep the screen awake so iOS doesn't freeze the timers
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
        } catch (err) {
            console.log(`${err.name}, ${err.message}`);
        }
    }
}
//AI generated part

function Start(){
    if(selectedMins === 0){
        errorMessage.innerText = "Please choose an amount of time";
        resetAllData();
       
    }

    else{
        //reset all data
        resetAllData();
        //reset all data
        errorMessage.innerText = "";

        //AI generated part
        // 1. UNLOCK AUDIO FOR iOS: Play and instantly pause/mute them on user click
        startAudio.play().catch(() => {});
        mediAudio.play().then(() => { mediAudio.pause(); mediAudio.currentTime = 0; }).catch(() => {});
        concludeAudio.play().then(() => { concludeAudio.pause(); concludeAudio.currentTime = 0; }).catch(() => {});

        // 2. Request screen wake lock so iOS doesn't pause timers
        requestWakeLock();
        //AI generated part

        startAudio.play();

        //this timeOut is used for animation starting and meditation audio playing
        timeOut1 = setTimeout(function(){
          mediImg.style.animation = 'topDown 6s';
          mediImg.style.animationIterationCount = 'infinite';
          play(); //meditation audio play
        },4050);

        

        //this timeOut 2 is used for times up. when times up the animation will stop and music as well.
        var filterMins = selectedMins;
        timeOut2 = setTimeout(function(){
            slowPause();
            mediImg.style.animation = 'none';
            
            
            concludeAudio.play();

            //AI generated part
            // Release wake lock when finished
            if (wakeLock !== null) {
                wakeLock.release().then(() => { wakeLock = null; });
            }
            //AI generated part
           
            
        },filterMins *= 60000);
       
    }
}


function Stop(){
  resetAllData();
}



var fadeTimer = null;

function slowPause() {
    
  clearTimeout(fadeTimer);
  mediAudio.pause();
  mediAudio.currentTime = 0;

  
}


function play(){
    mediAudio.volume = 1.0;
    mediAudio.play();
}


