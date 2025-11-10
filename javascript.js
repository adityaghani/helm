// Carousel
(function() {
  const slides = document.querySelector('.slides');
  if (slides) {
    const total = document.querySelectorAll('.slide').length;
    let idx = 0;
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');

    function show(i) {
      if (total === 0) return; // Hindari error jika tidak ada slide
      idx = (i + total) % total;
      slides.style.transform = `translateX(${ -idx * 100 }%)`;
    }

    if (prev && next) {
      prev.addEventListener('click', () => show(idx - 1));
      next.addEventListener('click', () => show(idx + 1));
    }

    // Pastikan total > 0 sebelum menjalankan interval
    if (total > 0) {
      setInterval(() => show(idx + 1), 3500);
    }
  }
})();

// Data Produk
const products = [
   {title:'Airsoft Helmet',price:'Rp 200.000',img:'https://img.lazcdn.com/g/p/66848aced7ccc068ae925b3623a74bed.jpg_720x720q80.jpg'},
  {title:'Helm Lpg',price:'Rp 400.000',img:'https://cf.shopee.co.id/file/id-11134201-7r98p-lr2tvsj1atjmc2'},
  {title:'Safety Helmet',price:'Rp 100.000',img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1tXUYkXoE_So70Qdq2MSaggpy4jnMZoulqg&s'},
  {title:'Scuba Helmet',price:'Rp 6.000.000',img:'https://m.media-amazon.com/images/I/81AO+fr9oUL._AC_SX679_.jpg'},
  {title:'Scuba Helmet',price:'Rp 6.000.000',img:'https://i.ebayimg.com/images/g/Eo4AAOSw4v1mSI1L/s-l1600.webp'},
  {title:'Spartan Helmet',price:'Rp 480.000.000',img:'https://w7.pngwing.com/pngs/492/828/png-transparent-leonidas-i-spartan-warrior-helmet-film-knight-helmet-sports-equipment-300-spartans-300-thumbnail.png'},
  {title:'Airsoft Helmet',price:'Rp 200.000',img:'https://img.lazcdn.com/g/p/66848aced7ccc068ae925b3623a74bed.jpg_720x720q80.jpg'},
  {title:'Helm Lpg',price:'Rp 400.000',img:'https://cf.shopee.co.id/file/id-11134201-7r98p-lr2tvsj1atjmc2'},
  {title:'Safety Helmet',price:'Rp 100.000',img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1tXUYkXoE_So70Qdq2MSaggpy4jnMZoulqg&s'},
  {title:'Scuba Helmet',price:'Rp 6.000.000',img:'https://i.ebayimg.com/images/g/Eo4AAOSw4v1mSI1L/s-l1600.webp'},
];

//1. Variabel untuk menyimpan status keranjang
let cart = [];

//2. Ambil elemen-elemen HTML yang kita perlukan
// Pastikan ini merujuk ke elemen yang benar di HTML Anda
const grid = document.querySelector('.grid-container'); 

const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsList = document.getElementById('cartItemsList');
const cartCount = document.getElementById('cartCount');

const toast = document.getElementById('toastNotification');

function showToast(message) {
  if (!toast) {
    console.warn("Elemen toast notifikasi tidak ditemukan.");
    return;
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// 3. Fungsi untuk menambahkan produk ke keranjang
function addToCart(product) {
  cart.push(product);
  showToast(`${product.title} has been added to cart.`);
  updateCartDisplay();
}

// Fungsi untuk HAPUS (Delete) item dari keranjang ---
function removeFromCart(index) {
  cart.splice(index, 1);
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
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
      cartItemsList.innerHTML = '<li>Keranjang Anda masih kosong.</li>';
      return;
    }

    cart.forEach((item, index) => {
      const li = document.createElement('li');

      // Menambahkan tombol "Remove" (Delete)
      li.innerHTML = `
        <img src="${item.img}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
        <strong style="flex: 1;">${item.title}</strong> 
        <span style="margin-right: 10px;">${item.price}</span>
        <button class="btn cart-remove" data-index="${index}">Remove</button>
      `;
      // Menambahkan style agar item di keranjang rapi
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.justifyContent = 'space-between';
      li.style.marginBottom = '10px';
      li.style.borderBottom = '1px solid #eee';
      li.style.paddingBottom = '5px';

      cartItemsList.appendChild(li);
    });

    // Tambahkan Event Listener untuk semua tombol "Remove"
    cartItemsList.querySelectorAll('.cart-remove').forEach(button => {
      button.addEventListener('click', (e) => {
        const indexToRemove = e.target.dataset.index;
        removeFromCart(indexToRemove);
      });
    });
  }
}

// 5. Event Listeners untuk Modal Keranjang
if (cartButton && cartModal) {
  cartButton.addEventListener('click', () => {
    cartModal.style.display = 'block';
    updateCartDisplay(); // Selalu update saat dibuka
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

// 6. Kode untuk Merender/Menampilkan Produk ke Halaman
if (grid) {
  products.forEach(p => {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h4>${p.title}</h4>
      
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div class="price">${p.price}</div>
          <button class="btn btn-add">Add</button> 
        </div>
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
