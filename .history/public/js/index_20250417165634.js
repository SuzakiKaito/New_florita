// スライダーのDOM要素を取得
const slider = document.getElementById("slider");
let slides = Array.from(document.querySelectorAll(".slide"));
let currentIndex = 0;
const threshold = 70; // スワイプとして認識する最小距離
let startX = 0;
let startY = 0;

// 画像＋商品情報を定義（画像パス・商品名・価格）
const products = [
  { image: "./img/slider1.jpg", name: "ワンピースA", price: "¥3,000" },
  { image: "./img/slider2.jpg", name: "スニーカー", price: "¥2,200" },
  { image: "./img/slider3.jpg", name: "口紅", price: "¥3,500" },
  { image: "./img/slider4.jpg", name: "ワンピースB", price: "¥2,800" },
  { image: "./img/slider5.jpg", name: "ハイヒール", price: "¥3,100" },
  { image: "./img/slider6.jpg", name: "ワンピースC", price: "¥2,600" },
  { image: "./img/slider7.jpg", name: "ショルダーバッグ", price: "¥3,300" }
];

// 商品リストをランダムに並び替える関数（Fisher-Yatesアルゴリズム）
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // 要素をスワップ
  }
}

// ランダム化
shuffleArray(products);

// ランダム順にスライドHTMLを再生成
slider.innerHTML = ""; // 一旦空にする
products.forEach((product) => {
  const slide = document.createElement("div");
  slide.classList.add("slide");

  // スライドに画像＋商品情報を埋め込む
  slide.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="product-info">
      <p class="name">${product.name}</p>
      <p class="price">${product.price}</p>
      <button class="bookmark">♡</button>
    </div>
  `;
  slider.appendChild(slide);
});

// HTMLに追加した後、slide要素を取得し直す
slides = Array.from(document.querySelectorAll(".slide"));

// 表示スライドを更新する関数
function updateSlides() {
  slides.forEach((slide, index) => {
    // 今のスライドだけ表示、それ以外は非表示
    slide.style.display = index === currentIndex ? "block" : "none";
  });
}

updateSlides(); // 初期表示を設定

// タッチ（またはマウス）開始位置を記録
function handleTouchStart(event) {
  startY = event.touches ? event.touches[0].clientY : event.clientY;
  startX = event.touches ? event.touches[0].clientX : event.clientX;
}

// タッチ（またはマウス）終了時にスワイプ方向を判定
function handleTouchEnd(event) {
  const endY = event.changedTouches ? event.changedTouches[0].clientY : event.clientY;
  const endX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;

  const diffY = endY - startY;
  const diffX = endX - startX;

  // 縦方向のスワイプ
  if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > threshold) {
    if (diffY < 0) {
      // 上スワイプ → 次の画像へ
      currentIndex = (currentIndex + 1) % slides.length;
    } else {
      // 下スワイプ → 前の画像へ（ループも考慮）
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }
    updateSlides();
  } 
  // 横方向のスワイプ
  else if (Math.abs(diffX) > threshold) {
    alert("詳細ページに遷移します（仮）");
  }
}

// スワイプイベントを登録（モバイル＋PC対応）
slider.addEventListener("touchstart", handleTouchStart);
slider.addEventListener("touchend", handleTouchEnd);
slider.addEventListener("mousedown", handleTouchStart);
slider.addEventListener("mouseup", handleTouchEnd);
