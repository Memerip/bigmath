document.addEventListener('DOMContentLoaded', () => {
    const buildGS = async () => {
        const res = await fetch('assets/json/games.json');
        const json = await res.json();
        console.log(json);

        const buttonContainer = document.querySelector('.button-container');
        const searchBar = document.getElementById('search-bar');

        const createButton = (element) => {
            const button = document.createElement('button');
            button.className = 'image-button';
            button.addEventListener('click', () => {
                window.open(element.loc);
                localStorage.setItem('play', element.playurl);
                localStorage.setItem('playTitle', element.title);
            });

            const image = document.createElement('img');
            image.src = element.image;
            image.alt = 'Button Image';
            image.className = 'button-image';

            const title = document.createElement('span');
            title.className = 'button-title';
            title.textContent = element.title;

            button.appendChild(image);
            button.appendChild(title);

            return button;
        };

        const filterButtons = (searchText) => {
            const filteredButtons = json.filter(element =>
                element.title.toLowerCase().includes(searchText.toLowerCase())
            );

            buttonContainer.innerHTML = '';

            filteredButtons.forEach(element => {
                const button = createButton(element);
                buttonContainer.appendChild(button);
            });
        };

        searchBar.addEventListener('input', (event) => {
            const searchText = event.target.value;
            filterButtons(searchText);
        });

        filterButtons('');
    }

    buildGS();
});
