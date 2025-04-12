let currentImageIndex = 0;
const images = document.querySelectorAll('.carousel-image');
const dynamicTitle = document.getElementById('dynamic-title');
const dynamicDescription = document.getElementById('dynamic-description');

// Array of text content for each image
const imageTexts = [
    {
        title: "About Us",
        description: "We specialize in designing adaptive websites that look great on every screen size. Our mission is to ensure a seamless user experience across all devices."
    },
    {
        title: "Our Vision",
        description: "Our vision is to empower businesses with top-notch web solutions that adapt to the ever-changing digital landscape."
    }
];

function showImage(index) {
    // Ensure the index is within bounds
    if (index < 0) {
        currentImageIndex = images.length - 1;
    } else if (index >= images.length) {
        currentImageIndex = 0;
    } else {
        currentImageIndex = index;
    }

    // Update active class for images
    images.forEach((img, i) => {
        img.classList.remove('active');
        if (i === currentImageIndex) {
            img.classList.add('active');
        }
    });

    // Update the text content
    dynamicTitle.textContent = imageTexts[currentImageIndex].title;
    dynamicDescription.textContent = imageTexts[currentImageIndex].description;
}

function prevImage() {
    showImage(currentImageIndex - 1);
}

function nextImage() {
    showImage(currentImageIndex + 1);
}

// Background Music Control and Time Update
document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const timeDisplay = document.getElementById('utcTime');
    let isPlaying = true; // Set to true for auto-play

    // Function to update UTC time
    function updateUTCTime() {
        const now = new Date();
        const utcString = now.toISOString().replace('T', ' ').slice(0, 19);
        timeDisplay.textContent = `UTC Time: ${utcString}`;
    }

    // Update time initially and every second
    updateUTCTime();
    setInterval(updateUTCTime, 1000);

    // Function to handle music toggle
    function toggleMusic() {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.classList.add('muted');
            musicToggle.querySelector('.music-icon').textContent = '🔈';
        } else {
            const playPromise = bgMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicToggle.classList.remove('muted');
                    musicToggle.querySelector('.music-icon').textContent = '🔊';
                }).catch(error => {
                    console.log("Auto-play was prevented:", error);
                    isPlaying = false;
                    musicToggle.classList.add('muted');
                    musicToggle.querySelector('.music-icon').textContent = '🔈';
                });
            }
        }
        isPlaying = !isPlaying;
    }

    // Event listener for the music toggle button
    musicToggle.addEventListener('click', toggleMusic);

    // Auto-play setup
    bgMusic.volume = 0.5; // Set volume to 50%
    
    // Try to auto-play
    const autoPlayPromise = bgMusic.play();
    if (autoPlayPromise !== undefined) {
        autoPlayPromise.then(() => {
            // Auto-play started successfully
            musicToggle.classList.remove('muted');
            musicToggle.querySelector('.music-icon').textContent = '🔊';
        }).catch(error => {
            // Auto-play was prevented
            console.log("Auto-play was prevented:", error);
            isPlaying = false;
            musicToggle.classList.add('muted');
            musicToggle.querySelector('.music-icon').textContent = '🔈';
        });
    }

    // Handle page visibility change
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isPlaying) {
            bgMusic.pause();
        } else if (!document.hidden && isPlaying) {
            const playPromise = bgMusic.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Play was prevented:", error);
                });
            }
        }
    });

    // Handle user interaction to enable audio
    const enableAudio = () => {
        if (!isPlaying) {
            const playPromise = bgMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    musicToggle.classList.remove('muted');
                    musicToggle.querySelector('.music-icon').textContent = '🔊';
                    // Remove the event listeners once audio is enabled
                    document.removeEventListener('click', enableAudio);
                    document.removeEventListener('touchstart', enableAudio);
                    document.removeEventListener('keydown', enableAudio);
                }).catch(error => {
                    console.log("Play was prevented:", error);
                });
            }
        }
    };

    // Add event listeners for user interaction
    document.addEventListener('click', enableAudio);
    document.addEventListener('touchstart', enableAudio);
    document.addEventListener('keydown', enableAudio);
});