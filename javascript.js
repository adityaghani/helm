// --- Bagian 1: Carousel (Kode Asli dari HTML Anda) ---
(function(){
  const slides = document.querySelector('.slides');
  // Pengecekan jika elemen ada
  if (slides) {
    const total = document.querySelectorAll('.slide').length;
    let idx = 0;
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');

    function show(i){
      if (total === 0) return; // Hindari error jika tidak ada slide
      idx = (i + total) % total;
      slides.style.transform = `translateX(${ -idx * 100 }%)`;
    }

    // Pengecekan jika tombol ada
    if (prev && next) {
      prev.addEventListener('click', ()=>show(idx-1));
      next.addEventListener('click', ()=>show(idx+1));
    }
    
    // Hanya jalankan interval jika ada slide
    if (total > 0) {
        setInterval(()=>show(idx+1),5000);
    }
  }
})();

// --------------------------------------------------
// --- Bagian 2: Logika Toko dan Keranjang ---
// --------------------------------------------------

// Data Produk (dari konteks sebelumnya)
const products = [
  {title:'Spartan Helmet',price:'Rp 480.000.000',img:'https://w7.pngwing.com/pngs/492/828/png-transparent-leonidas-i-spartan-warrior-helmet-film-knight-helmet-sports-equipment-300-spartans-300-thumbnail.png'},
  {title:'Airsoft Helmet',price:'Rp 200.000',img:'https://img.lazcdn.com/g/p/66848aced7ccc068ae925b3623a74bed.jpg_720x720q80.jpg'},
  {title:'K6 S',price:'$299',img:'https://images.unsplash.com/photo-1526178619770-41f1b3b8f703?auto=format&fit=crop&w=800&q=60'},
  {title:'AX9',price:'$259',img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=60'},
  {title:'Tourmodular',price:'$349',img:'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=60'},
  {title:'Visor Iridium',price:'$146',img:'https://images.unsplash.com/photo-1532634896-26909d0d4f14?auto=format&fit=crop&w=800&q=60'},
];

// Variabel global untuk menyimpan keranjang
let cart = [];

// Seleksi Elemen-elemen Penting dari HTML
const grid = document.getElementById('products');
const cartButton = document.getElementById('cartButton');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsList = document.getElementById('cartItemsList');
const toast = document.getElementById('toastNotification');

/**
 * Menampilkan notifikasi toast di bagian bawah layar.
 * @param {string} message - Pesan yang akan ditampilkan.
 */
function showToast(message) {
  if (!toast) return; // Berhenti jika elemen toast tidak ada
  
  toast.textContent = message;
  toast.style.display = 'block'; // Tampilkan notifikasi
  
  // Sembunyikan notifikasi setelah 3 detik
  setTimeout(() => {
    toast.style.display = 'none'; // Sembunyikan lagi
    toast.textContent = ''; // Kosongkan teks
  }, 3000);
}

/**
 * Menambahkan produk ke array 'cart' dan memperbarui tampilan.
 * @param {object} product - Objek produk yang akan ditambahkan.
 */
function addToCart(product) {
  cart.push(product);
  updateCartDisplay();
  
  // Tampilkan notifikasi dalam Bahasa Inggris (sesuai permintaan)
  showToast(`${product.title} has been added to cart.`);
}

/**
 * Memperbarui tampilan keranjang (modal dan counter di header).
 */
function updateCartDisplay() {
  // Update hitungan di header
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
  
  // Update list item di dalam modal
  if (cartItemsList) {
    cartItemsList.innerHTML = ''; // Kosongkan list
    
    if (cart.length === 0) {
      cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
      return;
    }
    
    // Tambahkan setiap item dari array 'cart' ke list
    cart.forEach(item => {
      const li = document.createElement('li');
      // Style inline untuk gambar agar rapi
      li.innerHTML = `
        <img src="${item.img}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 15px; border-radius: 4px;">
        <div>
          <strong>${item.title}</strong>
          <div style="font-size: 14px; color: #555;">${item.price}</div>
        </div>
      `;
      cartItemsList.appendChild(li);
    });
  }
}

// --- Event Listeners untuk Modal Keranjang ---

// Tampilkan modal saat tombol 'Cart' di header diklik
if (cartButton && cartModal) {
  cartButton.addEventListener('click', () => {
    updateCartDisplay(); // Update isi keranjang sebelum ditampilkan
    cartModal.style.display = 'block'; // Tampilkan modal
  });
}

// Sembunyikan modal saat tombol 'X' (close) diklik
if (closeCartBtn && cartModal) {
  closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none'; // Sembunyikan modal
  });
}

// Sembunyikan modal saat mengklik di luar area konten modal
window.addEventListener('click', (event) => {
  if (event.target == cartModal) {
    cartModal.style.display = 'none'; // Sembunyikan modal
  }
});


// --- Bagian 3: Render Produk (Modifikasi) ---
// Ini akan mengisi div #products
if (grid) {
  products.forEach(p => {
    const el = document.createElement('article');
    // Asumsi Anda punya class 'card' di style.css
    el.className = 'card'; 
    
    el.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h4>${p.title}</h4>
      <div style="flex:1"></div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="price">${p.price}</div>
        <button class="btn btn-add-cart">Add to cart</button>
      </div>
    `;
    
    // --- MODIFIKASI UTAMA DI SINI ---
    // 1. Cari tombol 'Add to cart' yang baru saja kita buat
    const addButton = el.querySelector('.btn-add-cart');
    
    // 2. Tambahkan event listener ke tombol 'Add' tersebut
    if (addButton) {
      addButton.addEventListener('click', () => {
        addToCart(p); // Panggil fungsi addToCart dengan data produk 'p'
      });
    }
    // --- AKHIR MODIFIKASI ---
    
    grid.appendChild(el);
  });
}

// Inisialisasi tampilan keranjang (untuk menampilkan '0' saat halaman dimuat)
updateCartDisplay();
