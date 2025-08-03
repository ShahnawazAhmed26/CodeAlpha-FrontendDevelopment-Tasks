let currentIndex = 0;
const images = [
  "https://picsum.photos/id/1015/1200/800",
  "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
  "https://picsum.photos/id/1025/1200/800",
  "https://picsum.photos/id/1003/1200/800",
  "https://picsum.photos/id/1012/1200/800",
  "https://picsum.photos/id/1024/1200/800"
];

function openLightbox(index) {
  currentIndex = index;
  document.getElementById('lightbox-img').src = images[currentIndex];
  document.getElementById('lightbox').style.display = "flex";
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = "none";
}

function changeSlide(direction) {
  const img = document.getElementById("lightbox-img");

  img.style.opacity = 0;

  setTimeout(() => {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    img.src = images[currentIndex];

    img.onload = () => {
      img.style.opacity = 1;
    };
  }, 300);
}


function filterImages(category) {
  const boxes = document.querySelectorAll('.image-box');
  boxes.forEach(box => {
    if (category === 'all') {
      box.style.display = 'block';
    } else {
      box.classList.contains(category)
        ? box.style.display = 'block'
        : box.style.display = 'none';
    }
  });
}
