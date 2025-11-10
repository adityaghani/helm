// Carousel (Kode asli Anda, dengan sedikit pengaman)
(function(){
// Carousel
(function() {
const slides = document.querySelector('.slides');
  // Pastikan .slides ada sebelum melanjutkan
if (slides) {
const total = document.querySelectorAll('.slide').length;
let idx = 0;
const prev = document.getElementById('prev');
const next = document.getElementById('next');

    function show(i){
    function show(i) {
if (total === 0) return; // Hindari error jika tidak ada slide
idx = (i + total) % total;
slides.style.transform = `translateX(${ -idx * 100 }%)`;
}

if (prev && next) {
      prev.addEventListener('click', ()=>show(idx-1));
      next.addEventListener('click', ()=>show(idx+1));
      prev.addEventListener('click', () => show(idx - 1));
      next.addEventListener('click', () => show(idx + 1));
}
    

// Pastikan total > 0 sebelum menjalankan interval
if (total > 0) {
        setInterval(()=>show(idx+1),3500);
      setInterval(() => show(idx + 1), 3500);
}
}
})();

// --------------------------------------------------
// --- Logika Produk dan Keranjang (Dimodifikasi) ---
// --------------------------------------------------

// Data Produk (Data Anda)
// Data Produk
const products = [
{title:'Helm Fullface',price:'Rp 500.000',img:'https://blog.mofe.co.id/wp-content/uploads/2024/02/1-9-1536x864.jpg'},
{title:'Helm Halfface',price:'Rp 200.000',img:'https://blog.mofe.co.id/wp-content/uploads/2024/02/2-9-1536x864.jpg'},
@@ -44,28 +39,24 @@ const products = [
{title:'Scuba Helmet',price:'Rp 6.000.000',img:'https://i.ebayimg.com/images/g/Eo4AAOSw4v1mSI1L/s-l1600.webp'},
];

// --- Bagian Baru: Logika Keranjang ---

// 1. Variabel untuk menyimpan status keranjang
//1. Variabel untuk menyimpan status keranjang
let cart = [];

// 2. Ambil elemen-elemen HTML yang kita perlukan
//2. Ambil elemen-elemen HTML yang kita perlukan
const grid = document.getElementById('products');

// --- PERBAIKAN DI SINI ---
// Mengganti 'viewCartBtn' menjadi 'cartButton' agar cocok dengan HTML
const cartButton = document.getElementById('cartButton'); 
// --- PERBAIKAN ---
// Tanda hubung '-' di akhir baris ini telah dihapus
const cartButton = document.getElementById('cartButton');
// --- AKHIR PERBAIKAN ---

const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsList = document.getElementById('cartItemsList');
const cartCount = document.getElementById('cartCount');

// --- BARU: Ambil elemen Notifikasi Toast ---
const toast = document.getElementById('toastNotification');

// --- BARU: Fungsi untuk Notifikasi Profesional ---
function showToast(message) {
if (!toast) {
console.warn("Elemen toast notifikasi tidak ditemukan.");
@@ -81,14 +72,14 @@ function showToast(message) {
// 3. Fungsi untuk menambahkan produk ke keranjang
function addToCart(product) {
cart.push(product);
  

// --- DIMODIFIKASI: Mengganti alert() dengan showToast() ---
showToast(`${product.title} has been added to cart.`);
  

updateCartDisplay();
}

// --- BARU: Fungsi untuk HAPUS (Delete) item dari keranjang ---
//  Fungsi untuk HAPUS (Delete) item dari keranjang ---
function removeFromCart(index) {
cart.splice(index, 1);
updateCartDisplay();
@@ -112,7 +103,7 @@ function updateCartDisplay() {

cart.forEach((item, index) => {
const li = document.createElement('li');
      

// Menambahkan tombol "Remove" (Delete)
li.innerHTML = `
       <img src="${item.img}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
@@ -127,7 +118,7 @@ function updateCartDisplay() {
li.style.marginBottom = '10px';
li.style.borderBottom = '1px solid #eee';
li.style.paddingBottom = '5px';
      

cartItemsList.appendChild(li);
});

@@ -141,16 +132,13 @@ function updateCartDisplay() {
}
}

// 5. Event Listeners untuk Modal Keranjang (Kode asli Anda)
// --- PERBAIKAN DI SINI ---
// Mengganti 'viewCartBtn' menjadi 'cartButton'
// 5. Event Listeners untuk Modal Keranjang
if (cartButton && cartModal) {
cartButton.addEventListener('click', () => {
cartModal.style.display = 'block';
updateCartDisplay(); // Selalu update saat dibuka
});
}
// --- AKHIR PERBAIKAN ---

if (closeCartBtn && cartModal) {
closeCartBtn.addEventListener('click', () => {
@@ -181,7 +169,7 @@ if (grid) {
   `;

const addButton = el.querySelector('.btn-add');
    

addButton.addEventListener('click', () => {
addToCart(p);
});
