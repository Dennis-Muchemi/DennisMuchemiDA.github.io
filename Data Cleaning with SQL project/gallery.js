const galleries = [
    {
        id: 'gallery1',
        images: [
            'data_cleaning_sql_project_photos/create_database_2.png',
            'data_cleaning_sql_project_photos/importing_data_4.png'
        ],
        footnotes: [
            'Creating a new Database for the Data Cleaning project',
            'Importing data from an excel sheet to our database'
        ]
    },
    {
        id: 'gallery2',
        images: [
            'data_cleaning_sql_project_photos/overview_1.png',
            'data_cleaning_sql_project_photos/overview_2.png'
        ],
        footnotes: [
            'First page of our Data',
            'Last page of our Data'
        ]
    },
    {
        id: 'gallery3',
        images: [
            'data_cleaning_sql_project_photos/date_time_to_date_convert.png',
            'data_cleaning_sql_project_photos/add_sale_date_converted_column.png',
            'data_cleaning_sql_project_photos/update_sale_date_converted.png',
            'data_cleaning_sql_project_photos/sale_date_converted_column_view.png'
        ],
        footnotes: [
            'converting the date time format in SaleDate column to a date format',
            'Adding a new column sale_date_converted',
            'Filling the new column with the converted sale date column',
            'Final updated column'
        ]
    },
    {
        id: 'gallery4',
        images: [
            'data_cleaning_sql_project_photos/null_property_address.png',
            'data_cleaning_sql_project_photos/update_null_property_address.png',
            'data_cleaning_sql_project_photos/property_address_null_afterview.png'
        ],
        footnotes: [
            'Viewing the null values in the Property Address Column',
            'Updating and filling the null values',
            'Checking to see if there are any null values left'
        ]
    },
    {
        id: 'gallery5',
        images: [
            'data_cleaning_sql_project_photos/property_address_view_before.png',
            'data_cleaning_sql_project_photos/property_address_split.png',
            'data_cleaning_sql_project_photos/property_split_address_create.png',
            'data_cleaning_sql_project_photos/property_split_address_update.png',
            'data_cleaning_sql_project_photos/property_split_city_create.png',
            'data_cleaning_sql_project_photos/property_split_city_update.png',
            'data_cleaning_sql_project_photos/property_address_after.png'
        ],
        footnotes: [
            'view of the property address before splitting',
            'Splitting the property address into property address and property city',
            'Creating a new column for the new property address',
            'Updating the new property address column',
            'Creating a new column Property City',
            'Updating the new Property City column',
            'Overview of the new Property Address and Property City created'
        ]
    },
    {
        id: 'gallery6',
        images: [
            'data_cleaning_sql_project_photos/owner_address_view_before.png',
            'data_cleaning_sql_project_photos/owner_address_split.png',
            'data_cleaning_sql_project_photos/owner_split_address_create.png',
            'data_cleaning_sql_project_photos/owner_split_address_update.png',
            'data_cleaning_sql_project_photos/owner_split_city_create.png',
            'data_cleaning_sql_project_photos/owner_split_city_update.png',
            'data_cleaning_sql_project_photos/owner_split_state_create.png',
            'data_cleaning_sql_project_photos/owner_split_state_update.png',
            'data_cleaning_sql_project_photos/owner_address_after.png'
        ],
        footnotes: [
            'Overview of the Owner Address Column before splitting it into address, City and State',
            'Splitting the Owner Address Column',
            'Creating a new column owner_split_address for the properties owners addresses',
            'Updating the new column Owner_split_address',
            'Creating a new column owner_split_city for the cities where the owners live',
            'Updating the new column owner_split_city',
            'Creating a new column owner_split_state for the states where the owners live',
            'Updating the new column owner_split_state',
            'A view of the new created columns'
        ]
    },
    {
        id: 'gallery7',
        images: [
            'data_cleaning_sql_project_photos/Y_N_Yes_No_view.png',
            'data_cleaning_sql_project_photos/Y_N_Yes_No_count.png',
            'data_cleaning_sql_project_photos/Y_N_replace.png',
            'data_cleaning_sql_project_photos/Y_N_update.png',
            'data_cleaning_sql_project_photos/Yes_No_after_count.png'
        ],
        footnotes: [
            'A distinct view of the entries found the column',
            'A aggregated count of each of the entries in the column',
            'Replacing Y with Yes and N with No',
            'Updating the column SoldAsVacant Column, Y with Yes and N with No',
            'Checking to see if they have been updated'
        ]
    },
    {
        id: 'gallery8',
        images: [
           'data_cleaning_sql_project_photos/duplicates_select.png',
           'data_cleaning_sql_project_photos/duplicates_delete.png',
           'data_cleaning_sql_project_photos/duplicates_after.png'
        ],
        footnotes: [
            'A view of the duplicates. There is a total of 104 duplicates in the data',
            'Deleting the duplicate rows',
            'Confirming to check whether the duplicates have been removed and they have'
        ]
    },
    {
        id: 'gallery9',
        images: [
            'data_cleaning_sql_project_photos/columns_drop.png'
        ],
        footnotes: [
            'Dropping unused columns'
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
