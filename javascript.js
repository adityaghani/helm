// Carousel (Kode asli Anda, dengan sedikit pengaman)
(function(){
  const slides = document.querySelector('.slides');
  // Pastikan .slides ada sebelum melanjutkan
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

    if (prev && next) {
      prev.addEventListener('click', ()=>show(idx-1));
      next.addEventListener('click', ()=>show(idx+1));
    }
    
    // Pastikan total > 0 sebelum menjalankan interval
    if (total > 0) {
        setInterval(()=>show(idx+1),5000);
    }
  }
})();

// --------------------------------------------------
// --- Logika Produk dan Keranjang (Dimodifikasi) ---
// --------------------------------------------------

// Data Produk (Data Anda)
const products = [
  {title:'Spartan Helmet',price:'Rp 480.000.000',img:'https://w7.pngwing.com/pngs/492/828/png-transparent-leonidas-i-spartan-warrior-helmet-film-knight-helmet-sports-equipment-300-spartans-300-thumbnail.png'},
  {title:'Airsoft Helmet',price:'Rp 200.000',img:'https://img.lazcdn.com/g/p/66848aced7ccc068ae925b3623a74bed.jpg_720x720q80.jpg'},
  {title:'K6 S',price:'$299',img:'https://images.unsplash.com/photo-1526178619770-41f1b3b8f703?auto=format&fit=crop&w=800&q=60'},
  {title:'AX9',price:'$259',img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=60'},
  {title:'Tourmodular',price:'$349',img:'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=60'},
  {title:'Visor Iridium',price:'$146',img:'https://images.unsplash.com/photo-1532634896-26909d0d4f14?auto=format&fit=crop&w=800&q=60'},
];

// --- Bagian Baru: Logika Keranjang ---

// 1. Variabel untuk menyimpan status keranjang
let cart = [];

// 2. Ambil elemen-elemen HTML yang kita perlukan
const grid = document.getElementById('products');
const viewCartBtn = document.getElementById('viewCartBtn');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsList = document.getElementById('cartItemsList');
const cartCount = document.getElementById('cartCount');

// --- BARU: Ambil elemen Notifikasi Toast ---
const toast = document.getElementById('toastNotification');

// --- BARU: Fungsi untuk Notifikasi Profesional ---
function showToast(message) {
  if (!toast) return; // Hentikan jika elemen toast tidak ada
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// 3. Fungsi untuk menambahkan produk ke keranjang
function addToCart(product) {
  // Menambahkan produk yang dipilih ke array 'cart'
  cart.push(product);
  
  // --- DIMODIFIKASI: Mengganti alert() dengan showToast() ---
  // (Menggunakan Bahasa Inggris seperti yang diminta sebelumnya)
  showToast(`${product.title} has been added to cart.`);
  
  // Perbarui tampilan keranjang
  updateCartDisplay();
}

// --- BARU: Fungsi untuk HAPUS (Delete) item dari keranjang ---
function removeFromCart(index) {
  // Hapus 1 item dari array 'cart' pada 'index' yang dipilih
  cart.splice(index, 1);
  
  // Perbarui lagi tampilan keranjangnya
  updateCartDisplay();
}

// 4. Fungsi untuk memperbarui tampilan keranjang (di modal dan tombol)
function updateCartDisplay() {
  // Update hitungan di tombol 'Lihat Keranjang'
  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  // Pastikan elemen list keranjang ada
  if (cartItemsList) {
    // Kosongkan daftar di modal
    cartItemsList.innerHTML = '';

    // Jika keranjang kosong, tampilkan pesan
    if (cart.length === 0) {
      cartItemsList.innerHTML = '<li>Keranjang Anda masih kosong.</li>';
      return;
    }

    // --- DIMODIFIKASI: Loop dengan 'index' untuk tombol delete ---
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      
      // --- DIMODIFIKASI: Menambahkan tombol "Remove" (Delete) ---
      li.innerHTML = `
        <img src="${item.img}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
        <strong style="flex: 1;">${item.title}</strong> 
        <span style="margin-right: 10px;">${item.price}</span>
        <button class="cart-remove" data-index="${index}">Remove</button>
      `;
      cartItemsList.appendChild(li);
    });

    // --- BARU: Tambahkan Event Listener untuk semua tombol "Remove" ---
    cartItemsList.querySelectorAll('.cart-remove').forEach(button => {
      button.addEventListener('click', (e) => {
        // Ambil 'index' dari data-atribut tombol yang diklik
        const indexToRemove = e.target.dataset.index;
        removeFromCart(indexToRemove);
      });
    });
  }
}

// 5. Event Listeners untuk Modal Keranjang (Kode asli Anda)
if (viewCartBtn && cartModal) {
  viewCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
    updateCartDisplay();
  });
}

if (closeCartBtn && cartModal) {
  closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });
}

window.addEventListener('click', (event) => {
  if (event.target == cartModal) {
    cartModal.style.display = 'none';
  }
});

// --- Modifikasi Kode Rendering Produk Anda ---
// (Kode asli Anda, tidak diubah)
if (grid) {
  products.forEach(p => {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h4>${p.title}</h4>
      <div style="flex:1"></div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="price">${p.price}</div>
        <button class="btn btn-add">Add</button> 
      </div>
    `;

    const addButton = el.querySelector('.btn-add');
    
    addButton.addEventListener('click', () => {
      addToCart(p);
    });

    grid.appendChild(el);
  });
}

// Panggil sekali di awal untuk memastikan hitungan keranjang 0
updateCartDisplay();
