// // // Create an AudioContext object
// // const audioContext = new AudioContext();

// // // Create an oscillator node, which generates a periodic waveform
// // const oscillator = audioContext.createOscillator();

// // // Set the initial frequency and type of waveform for the oscillator
// // oscillator.frequency.value = 300; // in hertz
// // oscillator.type = 'sine'; // sine wave

// // // Connect the oscillator to the output (speakers)
// // oscillator.connect(audioContext.destination);

// // // Start the oscillator to begin generating sound
// // oscillator.start();

// // // Schedule changes to the oscillator frequency over time to create the beeping effect
// // oscillator.frequency.setValueAtTime(300, audioContext.currentTime); // start at 300 Hz
// // oscillator.frequency.linearRampToValueAtTime(800, audioContext.currentTime + 1); // increase to 800 Hz over 1 second
// // oscillator.frequency.exponentialRampToValueAtTime(10000, audioContext.currentTime + 2); // increase to 10 kHz over another second



// // // Create an Audio object from the oscillator node
// // const audio = new Audio();
// // audio.srcObject = oscillator;

// // // Define a function to check for danger and play the sound if necessary
// // function checkForDanger() {
// //   if (true) {
// //     audio.play();
// //   }
// // }

// // // Call the checkForDanger function periodically or in response to some event
// // // setInterval(checkForDanger, 1000); // check every second




// // Create an audio context
// const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// // Create an oscillator node
// const oscillator = audioContext.createOscillator();
// oscillator.type = 'sine';
// oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // set initial frequency

// // Create a gain node to control volume
// const gainNode = audioContext.createGain();
// gainNode.gain.setValueAtTime(0, audioContext.currentTime);

// // Connect the oscillator to the gain node and the gain node to the destination
// oscillator.connect(gainNode);
// gainNode.connect(audioContext.destination);

// // Define variables for the starting and ending frequencies
// const startFreq = 440;
// const endFreq = 880;

// // Define a function to update the oscillator frequency based on a variable value
// function updateFrequency(value) {
//   const frequency = startFreq + (endFreq - startFreq) * value; // calculate the current frequency
//   oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // set the new frequency
// }

// // Call the updateFrequency function with your variable value whenever you want to change the sound



// Set up audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create oscillator node for the sound
const oscillator = audioContext.createOscillator();
oscillator.type = "sine"; // Set oscillator type to triangle wave

// Connect oscillator to audio context output
oscillator.connect(audioContext.destination);

oscillator.frequency.linearRampToValueAtTime(880,audioContext.currentTime +1)
oscillator.frequency.linearRampToValueAtTime(880,audioContext.currentTime +2)

// Create a function to play the sound
let isPlaying = false;
function playSound() {
  if (!isPlaying) {
    // Start oscillator
    oscillator.start();
    isPlaying = true;
  }
}

// Create a function to stop the sound
function stopSound() {
  if (isPlaying) {
    // Stop oscillator
    oscillator.stop();
    isPlaying = false;
  }
}

// Set up variable that indicates the dangerous threshold
const dangerThreshold = 7.5;

// Create a function that updates the frequency of the sound based on a distance value
function updateSoundFrequency(distance) {
  // Map distance value to a frequency range between 200 Hz and 800 Hz
  const frequency = THREE.MathUtils.mapLinear(distance, dangerThreshold, 0, 200, 800);

  // Update oscillator frequency
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
}

setInterval(()=>{
    oscillator.frequency.linearRampToValueAtTime(880,audioContext.currentTime +1)
    oscillator.frequency.linearRampToValueAtTime(880,audioContext.currentTime +2)
},0)

// In your animation loop, call the updateSoundFrequency function with the distance variable:
// const distance = /* calculate distance to dangerous object */;
// if (distance < dangerThreshold) {
//   playSound();
//   updateSoundFrequency(distance);
// } else {
//   stopSound();
// }