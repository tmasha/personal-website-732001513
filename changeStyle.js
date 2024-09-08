document.addEventListener('DOMContentLoaded', () => {
    const changeStyleButton = document.getElementById('changeStyleButton');
    const styleElement = document.getElementById('style');

    function toggleStyleSheet() {
        const currentStyle = styleElement.getAttribute('href');
        const newStyle = currentStyle === 'style.css' ? 'style2.css' : 'style.css';
        styleElement.setAttribute('href', newStyle);
        localStorage.setItem('stylesheet', newStyle);
    }

    changeStyleButton.addEventListener('click', toggleStyleSheet);

    const savedStyle = localStorage.getItem('stylesheet');
    if (savedStyle) {
        styleElement.setAttribute('href', savedStyle);
    }
});