const slider = document.getElementById("slider");
let slides = Array.from(document.querySelectorAll(".slide"));
let currentIndex = 0;
const threshold = 50; // スワイプの距離のしきい値
let startX = 0;
let startY = 0;

// 商品データ（画像パス、商品名、値段）
const products = [
  { image: "./img/slider1.jpg", name: "ローズブーケ", price: "¥3,000" },
  { image: "./img/slider2.jpg", name: "ラベンダー", price: "¥2,200" },
  { image: "./img/slider3.jpg", name: "ガーベラミックス", price: "¥3,500" },
  { image: "./img/slider4.jpg", name: "サンフラワー", price: "¥2,800" },
  { image: "./img/slider5.jpg", name: "チューリップ", price: "¥3,100" },
  { image: "./img/slider6.jpg", name: "カーネーション", price: "¥2,600" },
  { image: "./img/slider7.jpg", name: "アネモネ", price: "¥3,300" }
];

// 商品データをランダムにシャッフル（Fisher-Yatesアルゴリズム）
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(products);

// HTMLをランダム順で再生成
slider.innerHTML = ""; // 一度リセット
products.forEach((product) => {
  const slide = document.createElement("div");
  slide.classList.add("slide");
  slide.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="product-info">
      <p class="name">${product.name}</p>
      <p class="price">${product.price}</p>
    </div>
  `;
  slider.appendChild(slide);
});

// 再取得（入れ直した後のスライドを取得）
slides = Array.from(document.querySelectorAll(".slide"));

// 現在のスライドだけ表示
function updateSlides() {
  slides.forEach((slide, index) => {
    slide.style.display = index === currentIndex ? "block" : "none";
  });
}

updateSlides();

// タッチ/マウスの開始位置取得
function handleTouchStart(event) {
  startY = event.touches ? event.touches[0].clientY : event.clientY;
  startX = event.touches ? event.touches[0].clientX : event.clientX;
}

// スワイプ完了時の処理
function handleTouchEnd(event) {
  const endY = event.changedTouches ? event.changedTouches[0].clientY : event.clientY;
  const endX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;

  const diffY = endY - startY;
  const diffX = endX - startX;

  if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > threshold) {
    // 縦スワイプ
    if (diffY < 0) {
      // 上にスワイプ → 次の画像（ループ）
      currentIndex = (currentIndex + 1) % slides.length;
    } else {
      // 下にスワイプ → 前の画像（ループ）
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }
    updateSlides();
  } else if (Math.abs(diffX) > threshold) {
    // 横スワイプ → 詳細ページ（仮アラート）
    alert("詳細ページに遷移します（仮）");
  }
}

// イベント登録（スマホ＋PC）
slider.addEventListener("touchstart", handleTouchStart);
slider.addEventListener("touchend", handleTouchEnd);
slider.addEventListener("mousedown", handleTouchStart);
slider.addEventListener("mouseup", handleTouchEnd);
