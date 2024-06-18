const galleries = [
    {
        id: 'gallery1',
        images: [
            'covid19_DE_with_sql_project_photos/import_data_1.png',
            'covid19_DE_with_sql_project_photos/import_data_2.png'
        ],
        footnotes: [
            'Importing data',
            'Importing data'
        ]
    },
    {
        id: 'gallery2',
        images: [
            'covid19_DE_with_sql_project_photos/overview_1.png',
            'covid19_DE_with_sql_project_photos/overview_2.png',
            'covid19_DE_with_sql_project_photos/overview_3.png',
            'covid19_DE_with_sql_project_photos/overview_4.png',
            'covid19_DE_with_sql_project_photos/starting_data.png'
        ],
        footnotes: [
            'An overview of the covid Deaths table',
            'An overview of the covid Vaccination table',
            'Confirming accuracy of the data in the covid deaths table',
            'Confirming accuracy of the data in the covid vaccinations table',
            'A view of the data we are going to start with'
        ]
    },
    {
        id: 'gallery3',
        images: [
            'covid19_DE_with_sql_project_photos/TotalCases_vs_TotalDeaths.png',
            'covid19_DE_with_sql_project_photos/TotalCases_vs_TotalDeaths_Africa.png',
            'covid19_DE_with_sql_project_photos/TotalCases_vs_TotalDeaths_USA.png',
            'covid19_DE_with_sql_project_photos/TotalCases_vs_TotalDeaths_UK.png'
        ],
        footnotes: [
            'Total cases vs total deaths',
            'Total cases vs total deaths in Africa',
            'Total cases vs total deaths in USA',
            'Total cases vs total deaths in UK'
        ]
    },
    {
        id: 'gallery4',
        images: [
            'covid19_DE_with_sql_project_photos/TotalCases_vs_Population_africa.png',
            'covid19_DE_with_sql_project_photos/TotalCases_vs_Population_UK.png'
        ],
        footnotes: [
            'Infection rates in Africa',
            'infection rates in United Kingdom'
        ]
    },
    {
        id: 'gallery5',
        images: [
            'covid19_DE_with_sql_project_photos/highest_infection_rate.png'
        ],
        footnotes: [
            'Countries with the highest infection rates'
        ]
    },
    {
        id: 'gallery6',
        images: [
            'covid19_DE_with_sql_project_photos/highest_deathcount_per_population_country.png',
            'covid19_DE_with_sql_project_photos/highest_deathcount_per_population_continent.png'
        ],
        footnotes: [
            'Death rates by country',
            'Death rates by continent'
        ]
    },
    {
        id: 'gallery7',
        images: [
            'covid19_DE_with_sql_project_photos/global_level_analysis.png'
        ],
        footnotes: [
            'Global covid 19 daily trend analysis'
        ]
    },
    {
        id: 'gallery8',
        images: [
           'covid19_DE_with_sql_project_photos/TotalPopulation_vs_vaccinations.png',
           'covid19_DE_with_sql_project_photos/TotalPopulation_vs_vaccinations_percent.png',
           'covid19_DE_with_sql_project_photos/TotalPopulation_vs_vaccinations_percent_TempTable_1.png',
           'covid19_DE_with_sql_project_photos/TotalPopulation_vs_vaccinations_percent_TempTable_2.png'
        ],
        footnotes: [
            'Covid 19 vaccination coverage',
            'Covid 19 vaccination coverage using CTEs',
            'Covid 19 vaccination coverage- creating temp table',
            'Covid 19 vaccination coverage- populating the temp table'
        ]
    },
    {
        id: 'gallery9',
        images: [
            'covid19_DE_with_sql_project_photos/view_1.png',
            'covid19_DE_with_sql_project_photos/view_2.png',
            'covid19_DE_with_sql_project_photos/view_3.png'
        ],
        footnotes: [
            'Creating a view',
            'Created view in the database',
            'An overview of the created view'
        ]
    }
];

let currentIndex = {};
let zoomLevel = 1;
let isDragging = false;
let startX, startY, startLeft, startTop;
let isZoomedIn = false;
let isClick = false;

const fullscreenModal = document.getElementById('fullscreen-modal');
const fullscreenImage = document.getElementById('fullscreen-image');
const fullscreenFootnote = document.getElementById('fullscreen-footnote');
const fullscreenPrevButton = document.getElementById('fullscreen-prev');
const fullscreenNextButton = document.getElementById('fullscreen-next');
const exitFullscreenButton = document.querySelector('.exit-fullscreen');
const imageNumberFullscreen = document.getElementById('image-number-fullscreen');

galleries.forEach(gallery => {
    currentIndex[gallery.id] = 0;
    const galleryElement = document.getElementById(gallery.id);
    const currentImage = galleryElement.querySelector('.image-container img');
    const imageNumber = galleryElement.querySelector('.image-number');
    const prevButton = galleryElement.querySelector('.nav-button.left');
    const nextButton = galleryElement.querySelector('.nav-button.right');
    const dotsContainer = galleryElement.querySelector('.dots');

    function updateGallery() {
        currentImage.src = gallery.images[currentIndex[gallery.id]];
        imageNumber.textContent = `${currentIndex[gallery.id] + 1}/${gallery.images.length}`;
        updateDots();
        updateNavigationButtons();
    }

    function updateDots() {
        dotsContainer.innerHTML = '';
        gallery.images.forEach((image, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === currentIndex[gallery.id]) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex[gallery.id] = index;
                updateGallery();
            });
            dotsContainer.appendChild(dot);
        });
    }

    function updateNavigationButtons() {
        if (gallery.images.length === 1) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        } else {
            prevButton.style.display = '';
            nextButton.style.display = '';
        }
    }

    prevButton.addEventListener('click', () => {
        currentIndex[gallery.id] = (currentIndex[gallery.id] - 1 + gallery.images.length) % gallery.images.length;
        updateGallery();
    });

    nextButton.addEventListener('click', () => {
        currentIndex[gallery.id] = (currentIndex[gallery.id] + 1) % gallery.images.length;
        updateGallery();
    });

    currentImage.addEventListener('click', () => {
        openFullscreen(gallery, currentIndex[gallery.id]);
    });

    updateGallery();
});

function openFullscreen(gallery, index) {
    fullscreenModal.style.display = 'flex';
    fullscreenImage.src = gallery.images[index];
    fullscreenFootnote.textContent = gallery.footnotes[index];
    imageNumberFullscreen.textContent = `${index + 1}/${gallery.images.length}`;
    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden'; // Disable scrolling of the webpage
    fullscreenPrevButton.onclick = () => navigateFullscreen(gallery, -1);
    fullscreenNextButton.onclick = () => navigateFullscreen(gallery, 1);
    exitFullscreenButton.onclick = closeFullscreen;
    currentIndex.galleryId = gallery.id;
    updateFullscreenNavigationButtons(gallery);
}

function updateFullscreenNavigationButtons(gallery) {
    if (gallery.images.length === 1) {
        fullscreenPrevButton.style.display = 'none';
        fullscreenNextButton.style.display = 'none';
    } else {
        fullscreenPrevButton.style.display = 'block';
        fullscreenNextButton.style.display = 'block';
    }
}

function navigateFullscreen(gallery, direction) {
    currentIndex[gallery.id] = (currentIndex[gallery.id] + direction + gallery.images.length) % gallery.images.length;
    fullscreenImage.src = gallery.images[currentIndex[gallery.id]];
    fullscreenFootnote.textContent = gallery.footnotes[currentIndex[gallery.id]];
    imageNumberFullscreen.textContent = `${currentIndex[gallery.id] + 1}/${gallery.images.length}`;
}

function handleKeydown(event) {
    if (fullscreenModal.style.display === 'flex') {
        if (isZoomedIn) {
            if (event.key === 'ArrowRight') {
                moveImage(-10, 0);
            } else if (event.key === 'ArrowLeft') {
                moveImage(10, 0);
            } else if (event.key === 'ArrowUp') {
                moveImage(0, 10);
            } else if (event.key === 'ArrowDown') {
                moveImage(0, -10);
            }
        } else {
            const gallery = galleries.find(g => g.id === currentIndex.galleryId);
            if (!gallery) return;

            if (event.key === 'ArrowRight') {
                navigateFullscreen(gallery, 1);
            } else if (event.key === 'ArrowLeft') {
                navigateFullscreen(gallery, -1);
            } else if (event.key === 'Escape') {
                closeFullscreen();
            }
        }
    }
}

function closeFullscreen() {
    fullscreenModal.style.display = 'none';
    document.removeEventListener('keydown', handleKeydown);
    document.body.style.overflow = ''; // Enable scrolling of the webpage
    zoomLevel = 1;
    isZoomedIn = false;
    fullscreenImage.style.transform = 'translate(-50%, -50%) scale(1)';
    fullscreenImage.style.left = '50%';
    fullscreenImage.style.top = '50%';
}

// Variable to keep track of last click time for double-click
let lastClickTime = 0;
fullscreenImage.addEventListener('dblclick', (e) => {
    if (zoomLevel === 1) {
        zoomLevel = 2;
        isZoomedIn = true;
        fullscreenImage.style.transform = 'translate(-50%, -50%) scale(2)';
        fullscreenImage.style.cursor = 'grab';
    } else {
        zoomLevel = 1;
        isZoomedIn = false;
        fullscreenImage.style.transform = 'translate(-50%, -50%) scale(1)';
        fullscreenImage.style.cursor = 'zoom-in';
        fullscreenImage.style.left = '50%';
        fullscreenImage.style.top = '50%';
    }
});

fullscreenImage.addEventListener('mousedown', (e) => {
    if (zoomLevel === 2 && e.button === 0) { // Only move image on left mouse button down
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = fullscreenImage.offsetLeft;
        startTop = fullscreenImage.offsetTop;
        fullscreenImage.style.cursor = 'grabbing';
        e.preventDefault(); // Prevent text selection
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        moveImage(deltaX, deltaY);
        startX = e.clientX;
        startY = e.clientY;
    }
});

document.addEventListener('mouseup', (e) => {
    if (e.button === 0) { // Ensure it's the left mouse button
        isDragging = false;
        if (isZoomedIn) {
            fullscreenImage.style.cursor = 'grab';
        }
    }
});

fullscreenModal.addEventListener('click', (event) => {
    if (event.target === fullscreenModal) {
        closeFullscreen();
    }
});

// Mouse wheel event listener for scrolling the zoomed image
fullscreenImage.addEventListener('wheel', (e) => {
    if (isZoomedIn) {
        moveImage(0, e.deltaY);
    }
});

function moveImage(deltaX, deltaY) {
    const imageRect = fullscreenImage.getBoundingClientRect();
    const modalRect = fullscreenModal.getBoundingClientRect();

    let newLeft = fullscreenImage.offsetLeft + deltaX;
    let newTop = fullscreenImage.offsetTop + deltaY;

    const minX = modalRect.width / 2 - (imageRect.width - modalRect.width) / 2;
    const maxX = modalRect.width / 2 + (imageRect.width - modalRect.width) / 2;
    const minY = modalRect.height / 2 - (imageRect.height - modalRect.height) / 2;
    const maxY = modalRect.height / 2 + (imageRect.height - modalRect.height) / 2;

    if (newLeft < minX) newLeft = minX;
    if (newLeft > maxX) newLeft = maxX;
    if (newTop < minY) newTop = minY;
    if (newTop > maxY) newTop = maxY;

    fullscreenImage.style.left = `${newLeft}px`;
    fullscreenImage.style.top = `${newTop}px`;
}
