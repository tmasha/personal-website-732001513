document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('visualizerCanvas');
    const context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const audio = new Audio("src/test.mp3");
    audio.volume = 0;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 128;
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
            const r = Math.round(135 * (1 - fraction) + 55 * fraction);
            const g = Math.round(0 * (1 - fraction) + 0 * fraction);
            const b = Math.round(171 * (1 - fraction) + 255 * fraction);
    
            context.fillStyle = `rgb(${r},${g},${b})`;
            context.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        }
        requestAnimationFrame(animate);
    }

    const volumeSlider = document.getElementById('volumeSlider');
    volumeSlider.addEventListener('input', (event) => {
        audio.volume = event.target.value;
    });

    const playPauseButton = document.getElementById('playPauseButton');
    playPauseButton.addEventListener('click', () => {
        if (audio.paused) {
            audioContext.resume().then(() => {
                audio.play();
                playPauseButton.textContent = '⏸';
                animate();
            });
        } else {
            audio.pause();
            playPauseButton.textContent = '▶';
        }
    });
});