// Wait for the HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {

    const slideshow = document.getElementById('hero-slideshow');
    // Only proceed if the slideshow container exists on the page
    if (!slideshow) {
        // console.log("Hero slideshow element not found on this page.");
        return;
    }

    const slides = slideshow.querySelectorAll('.slide');
    const dots = slideshow.querySelectorAll('.dot');
    const prevArrow = slideshow.querySelector('.prev');
    const nextArrow = slideshow.querySelector('.next');

    // Exit if essential elements are missing (e.g., no slides)
    if (!slides || slides.length === 0 || !dots || !prevArrow || !nextArrow) {
         console.error("Slideshow is missing required elements (slides, dots, or arrows).");
         return;
    }

    let currentSlideIndex = 0;
    let slideInterval;
    const slideDuration = 5000; // Time in ms for each slide (5 seconds)

    // --- Function to display a specific slide ---
    function showSlide(index) {
        // Ensure slides and dots exist before proceeding
         if (!slides || slides.length === 0) return;

        // Wrap index around if it goes out of bounds
        const slideCount = slides.length;
        if (index >= slideCount) {
            index = 0;
        } else if (index < 0) {
            index = slideCount - 1;
        }

        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        // Check if dots exist before trying to modify them
        if (dots.length === slideCount) {
             dots.forEach(dot => dot.classList.remove('active'));
             dots[index].classList.add('active'); // Add active class to the target dot
        }


        // Add active class to the target slide
        slides[index].classList.add('active');

        // Update the current slide index
        currentSlideIndex = index;
    }

    // --- Function to show the next slide ---
    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }

    // --- Function to show the previous slide ---
    function prevSlide() {
        showSlide(currentSlideIndex - 1);
    }

    // --- Start automatic slide transition ---
    function startSlideShow() {
        // Clear any existing interval before starting a new one
        stopSlideShow();
        // Only start if there's more than one slide
        if (slides.length > 1) {
             slideInterval = setInterval(nextSlide, slideDuration);
        }
    }

    // --- Stop automatic slide transition ---
    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // --- Event Listeners ---

    // Next Arrow
    nextArrow.addEventListener('click', () => {
        nextSlide();
        startSlideShow(); // Restart timer when manually changed
    });

    // Previous Arrow
    prevArrow.addEventListener('click', () => {
        prevSlide();
        startSlideShow(); // Restart timer when manually changed
    });

    // Indicator Dots
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
             // Use currentTarget to ensure we get the element the listener was attached to
            const index = parseInt(e.currentTarget.getAttribute('data-slide-index'), 10);
             if (!isNaN(index)) { // Check if the index is a valid number
                 showSlide(index);
                 startSlideShow(); // Restart timer when manually changed
             }
        });
    });

    // Optional: Pause slideshow on hover
    slideshow.addEventListener('mouseenter', stopSlideShow);
    slideshow.addEventListener('mouseleave', startSlideShow);


    // --- Initial Setup ---
    // Ensure the first slide is shown initially
    showSlide(0);
    // Start the automatic slideshow
    startSlideShow();

}); // End DOMContentLoaded