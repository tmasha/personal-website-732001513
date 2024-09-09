document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');

    const loadContent = (url) => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                contentDiv.innerHTML = data;
            })
            .catch(error => console.error('Error loading content:', error));
    };

    document.getElementById('aboutLink').addEventListener('click', () => loadContent('about.html'));
    document.getElementById('portfolioLink').addEventListener('click', () => loadContent('portfolio.html'));
    document.getElementById('qualificationsLink').addEventListener('click', () => loadContent('qualifications.html'));
    document.getElementById('serviceLink').addEventListener('click', () => loadContent('service.html'));
    document.getElementById('contactLink').addEventListener('click', () => loadContent('contact.html'));


    loadContent('about.html');
});