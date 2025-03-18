const thumbnails = document.querySelectorAll('.thumbnail');

const largeImage = document.getElementById('largeImage');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        largeImage.src = thumbnail.getAttribute('data-large');
    });
});
