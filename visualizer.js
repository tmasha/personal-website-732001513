//  Add event listener to the document to wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('visualizerCanvas');
    const context = canvas.getContext('2d');

    // Ensures the canvas fills the page
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const audio = new Audio("src/test.mp3");

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 128; // The number of data values that are calculated per second
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = (canvas.width / bufferLength);

    let x;
    function animate() {
        x = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        
        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i];
            const fraction = i / bufferLength;
            // For each color variable, the first number * (1 - fraction) is the starting color value, and the second number * fraction is the ending color value
            const r = Math.round(135 * (1 - fraction) + 55 * fraction);
            const g = Math.round(0 * (1 - fraction) + 0 * fraction);
            const b = Math.round(171 * (1 - fraction) + 255 * fraction);
    
            context.fillStyle = `rgb(${r},${g},${b})`;
            context.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        }
        requestAnimationFrame(animate);
    }

    // Start the visualizer when the user clicks anywhere on the page
    document.body.addEventListener('click', () => {
        audioContext.resume().then(() => {
            audio.play().then(() => {
                animate();
            });
        });
    });
});
