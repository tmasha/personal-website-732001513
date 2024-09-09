document.addEventListener('DOMContentLoaded', () => {
    const changeStyleButton = document.getElementById('changeStyleButton');
    const styleElement = document.getElementById('style');
    const video = document.getElementById('backgroundVideo');
    const me = document.getElementById('me');

    function toggleStyleSheet() {
        const currentStyle = styleElement.getAttribute('href');
        const newStyle = currentStyle === 'style.css' ? 'style2.css' : 'style.css';
        styleElement.setAttribute('href', newStyle);
        localStorage.setItem('stylesheet', newStyle);

        const newVideoSrc = newStyle === 'style2.css' ? '/src/test2.mp4' : '/src/test.mp4';
        video.setAttribute('src', newVideoSrc);
        video.load();
        video.play();

        const newImgSrc = newStyle == 'style2.css' ? '/src/me2.jpg' : '/src/me.jpg';
        me.setAttribute('src', newImgSrc);
    }

    changeStyleButton.addEventListener('click', toggleStyleSheet);

    const savedStyle = localStorage.getItem('stylesheet');
    if (savedStyle) {
        styleElement.setAttribute('href', savedStyle);

        const savedVideoSrc = savedStyle === 'style2.css' ? '/src/test2.mp4' : '/src/test.mp4';
        video.setAttribute('src', savedVideoSrc);
        video.load();
        video.play();

        const newImgSrc = newStyle == 'style2.css' ? '/src/me2.jpg' : '/src/me.jpg';
        me.setAttribute('src', newImgSrc);
    }
});