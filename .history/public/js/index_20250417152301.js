const slider = document.getElementById("slider");
const slides = Array.from(document.querySelectorAll(".slide"));
let currentIndex = 0;
let startX = 0;
let startY = 0;
let isSwiping = false;

console.log(slider,slides);


function updateSlidePosition() {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateY(${(index - currentIndex) * 100}vh)`;
  });
}

updateSlidePosition();

slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  isSwiping = true;
});

slider.addEventListener("touchmove", (e) => {
  if (!isSwiping) return;

  const diffX = e.touches[0].clientX - startX;
  const diffY = e.touches[0].clientY - startY;

  // 横スワイプ（詳細画面へ）
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    isSwiping = false;
    alert(`詳細画面へ: ${currentIndex + 1}番目の画像`);
  }

  // 縦スワイプ（画像切り替え）
  if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
    if (diffY > 0 && currentIndex > 0) {
      currentIndex--;
    } else if (diffY < 0 && currentIndex < slides.length - 1) {
      currentIndex++;
    }
    updateSlidePosition();
    isSwiping = false;
  }
});
