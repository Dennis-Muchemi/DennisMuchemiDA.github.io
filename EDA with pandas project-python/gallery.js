const galleries = [
    {
        id: 'gallery1',
        images: [
            'EDA Project Photos/import_libraries.png'
        ],
        footnotes: [
            'Importing the relevant libraries'
        ]
    },
    {
        id: 'gallery2',
        images: [
            'EDA Project Photos/import_data.png'
        ],
        footnotes: [
            'We define the path where the folder with the data is located, import it and assign it to a data frame'
        ]
    },
    {
        id: 'gallery3',
        images: [
            'EDA Project Photos/2 decimal places.png'
        ],
        footnotes: [
            'Decimal places standardization'
        ]
    },
    {
        id: 'gallery4',
        images: [
            'EDA Project Photos/data_info.png'
        ],
        footnotes: [
            'Basic analysis of the data'
        ]
    },
    {
        id: 'gallery5',
        images: [
            'EDA Project Photos/data_stat_summary.png'
        ],
        footnotes: [
            'Summary statistics'
        ]
    },
    {
        id: 'gallery6',
        images: [
            'EDA Project Photos/null_values.png'
        ],
        footnotes: [
            'Null Values'
        ]
    },
    {
        id: 'gallery7',
        images: [
            'EDA Project Photos/unique_values.png'
        ],
        footnotes: [
            'Unique values'
        ]
    },
    {
        id: 'gallery8',
        images: [
            'EDA Project Photos/highest_population.png'
        ],
        footnotes: [
            'Top five countries with the highest Populations as of 2022'
        ]
    },
    {
        id: 'gallery9',
        images: [
            'EDA Project Photos/correlation.png',
            'EDA Project Photos/correlation_2.png'
        ],
        footnotes: [
            'Correlation coefficients',
            'Correlation coefficients last page'
        ]
    },
    {
        id: 'gallery10',
        images: [
            'EDA Project Photos/average_summary_continent.png',
            'EDA Project Photos/average_summary_continent_2022.png'
        ],
        footnotes: [
            'Average numeric attributes across different continents',
            'Focus on 2022 Population data'
        ]
    },
    {
        id: 'gallery11',
        images: [
            'EDA Project Photos/oceania.png'
        ],
        footnotes: [
            'Oceania Continent analysis'
        ]
    },
    {
        id: 'gallery12',
        images: [
            'EDA Project Photos/population_change.png',
            'EDA Project Photos/transpose.png',
            'EDA Project Photos/columns_describe.png',
            'EDA Project Photos/line_graph.png'
        ],
        footnotes: [
            'Population change for the different continents over the years',
            'Transposing it for ploting later',
            'Columns in our new data frame',
            'Line graph'
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
