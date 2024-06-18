const galleries = [
    {
        id: 'gallery1',
        images: [
            'Data Profession Analysis Project Photos/data_cleaning/blank_columns_view.png',
            'Data Profession Analysis Project Photos/data_cleaning/blank_columns_select.png',
            'Data Profession Analysis Project Photos/data_cleaning/blank_columns_delete.png'
        ],
        footnotes: [
            'Overview of the blank columns',
            'Selecting all the blank columns',
            'Removing the blank columns'
        ]
    },
    {
        id: 'gallery2',
        images: [
            'Data Profession Analysis Project Photos/data_cleaning/job_title_before.png',
            'Data Profession Analysis Project Photos/data_cleaning/job_title_after.png'
        ],
        footnotes: [
            'Entries in the Job Title Column',
            'Entries in the Job Title Column after transformation'
        ]
    },
    {
        id: 'gallery3',
        images: [
            'Data Profession Analysis Project Photos/data_cleaning/program_lang_before.png',
            'Data Profession Analysis Project Photos/data_cleaning/program_lang_after.png'
        ],
        footnotes: [
            'Entries in the favourite programming language before transformation',
            'Entries in the favourite programming language after transformation'
        ]
    },
    {
        id: 'gallery4',
        images: [
            'Data Profession Analysis Project Photos/data_cleaning/country_before.png',
            'Data Profession Analysis Project Photos/data_cleaning/country_after.png'
        ],
        footnotes: [
            'Entries in the country column. Respondents are from all over the world but we simplify it for easier analysis',
            'Entries in the country column after transformation.'
        ]
    },
    {
        id: 'gallery5',
        images: [
            'Data Profession Analysis Project Photos/data_cleaning/industry_before.png',
            'Data Profession Analysis Project Photos/data_cleaning/industry_after.png'
        ],
        footnotes: [
            'Entries in the industry column before transformation',
            'Entries in the industry column after transformation'
        ]
    },
    {
        id: 'gallery6',
        images: [
            'Data Profession Analysis Project Photos/data_cleaning/avg_income_formula.png',
            'Data Profession Analysis Project Photos/data_cleaning/avg_income.png'
        ],
        footnotes: [
            'After creating two colums with the lower and upper salary bracket for each respondent, We use a formula to find an average salary for each salary.',
            'Average Salary column'
        ]
    },
    {
        id: 'gallery7',
        images: [
            'Data Profession Analysis Project Photos/Count of Respondents.png'
        ],
        footnotes: [
            'Total number of Survey Takers'
        ]
    },
    {
        id: 'gallery8',
        images: [
            'Data Profession Analysis Project Photos/Avg Age of Respondents.png'
        ],
        footnotes: [
            'Average age of survey takers'
        ]
    },
    {
        id: 'gallery9',
        images: [
            'Data Profession Analysis Project Photos/Avg Sal By Job_title.png'
        ],
        footnotes: [
            'Different salaries for different job titles'
        ]
    },
    {
        id: 'gallery10',
        images: [
            'Data Profession Analysis Project Photos/Country of Respondents.png'
        ],
        footnotes: [
            'Major countries the respondents come from'
        ]
    },
    {
        id: 'gallery11',
        images: [
            'Data Profession Analysis Project Photos/Happy with Work_life Bal.png'
        ],
        footnotes: [
            'How happy the professionals in the data field are with work life balance'
        ]
    },
    {
        id: 'gallery12',
        images: [
            'Data Profession Analysis Project Photos/Happy with Sal.png'
        ],
        footnotes: [
            'Happiness with salary earned on a scale of 10'
        ]
    },
    {
        id: 'gallery13',
        images: [
            'Data Profession Analysis Project Photos/Avg Sal by Sex.png'
        ],
        footnotes: [
            'Average salaries by gender analysis'
        ]
    },
    {
        id: 'gallery14',
        images: [
            'Data Profession Analysis Project Photos/Final Dashboard.png'
        ],
        footnotes: [
            'Final Dashboard'
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
