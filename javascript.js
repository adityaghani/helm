document.addEventListener("DOMContentLoaded", () => {
    
    // --- DATABASE (No DB) ---
    // (Database produk Anda tetap sama)
    const products = [
        {
            id: 1,
            name: "Helm R10 SOLID BLACK REDBULL ",
            brand: "KYT",
            price: 500000,
            image: "gambar/helm fullface.jpg",
            description: "Helm full-face dengan desain futuristik. Ringan dan memiliki standar keamanan tertinggi.",
            modelSrc: "",
            iosSrc: ""
        },
        {
            id: 2,
            name: "Helm Retro Classic",
            brand: "Vintago",
            price: 850000,
            image: "gambar/retro classic.jpg",
            description: "Helm half-face dengan gaya klasik. Sempurna untuk berkendara santai di dalam kota.",
            modelSrc: "",
            iosSrc: ""
        },
        {
            id: 3,
            name: "Helm KYT Aquarium",
            brand: "KYT",
            price: 500000,
            image: "gambar/kyt R 10.jpg",
            description: "Helm aerodinamis yang dirancang untuk kecepatan tinggi. Digunakan oleh para profesional.",
            modelSrc: "https://modelviewer.dev/shared-assets/models/damaged-helmet/DamagedHelmet.glb",
            iosSrc: ""
        },
        {
            id: 4,
            name: "Helm Modular Urban",
            brand: "CityRide",
            price: 1300000,
            image: "gambar/modular.jpg",
            description: "Helm modular yang fleksibel, dapat diubah dari full-face menjadi half-face.",
            modelSrc: "",
            iosSrc: ""
        },
        {
            id: 5,
            name: "Helm Motocross V-2",
            brand: "MTR-X",
            price: 1250000,
            image: "gambar/motorcross.jpg",
            description: "Helm tahan banting untuk petualangan off-road dan motocross.",
            modelSrc: "",
            iosSrc: ""
        },
        {
            id: 6,
            name: "Helm Sepeda Aerio",
            brand: "Rido",
            price: 680000,
            image: "gambar/helm sepeda.jpg",
            description: "Helm sepeda yang sangat ringan dengan ventilasi udara yang baik.",
            modelSrc: "",
            iosSrc: ""
        }
    ];

    // --- Elemen DOM ---
    const productGrid = document.getElementById("productGrid");
    const searchInput = document.getElementById("searchInput");
    
    // Modal Produk
    const productModal = document.getElementById("productModal");
    const modalBody = document.getElementById("modalBody");
    const closeModalButtons = document.querySelectorAll(".close-button");

    // Modal Keranjang
    const cartToggle = document.getElementById("cartToggle");
    const cartModal = document.getElementById("cartModal");
    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    // --- BARU: Elemen untuk Notifikasi Toast ---
    const toast = document.getElementById("toastNotification");

    // --- State Aplikasi (Menggunakan LocalStorage) ---
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // --- Fungsi Bantuan ---
    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(number);
    };

    // --- BARU: Fungsi untuk Notifikasi Profesional ---
    /**
     * Menampilkan notifikasi toast dengan pesan kustom.
     * @param {string} message - Pesan yang akan ditampilkan.
     */
    const showToast = (message) => {
        if (!toast) return; // Hentikan jika elemen toast tidak ada
        toast.textContent = message;
        toast.classList.add("show");
        
        // Sembunyikan notifikasi setelah 3 detik
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    };

    // --- FITUR 1: Render Produk ---
    const displayProducts = (filteredProducts) => {
        productGrid.innerHTML = ""; // Kosongkan grid
        const productsToShow = filteredProducts || products; // Tampilkan produk yang difilter atau semua produk

        if (productsToShow.length === 0) {
            productGrid.innerHTML = "<p>Produk tidak ditemukan.</p>";
            return;
        }

        productsToShow.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.brand}</p>
                    <p class="price">${formatRupiah(product.price)}</p>
                </div>
            `;
            card.addEventListener("click", () => showProductDetail(product.id));
            productGrid.appendChild(card);
        });
    };

    // --- FITUR 2: Detail Produk dengan 3D/AR Viewer ---
    const showProductDetail = (productId) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        // Konten untuk 3D Viewer (Tidak berubah)
        let modelViewerHTML = "";
        if (product.modelSrc) {
            modelViewerHTML = `
                <model-viewer 
                    src="${product.modelSrc}" 
                    ios-src="${product.iosSrc}"
                    ar 
                    ar-modes="webxr scene-viewer quick-look"
                    camera-controls 
                    auto-rotate
                    enable-pan
                    shadow-intensity="1">
                    <div class="progress-bar hide" slot="progress-bar">
                        <div class="update-bar"></div>
                    </div>
                </model-viewer>
            `;
        } else {
            modelViewerHTML = `<img src="${product.image}" alt="${product.name}" style="width:100%; height: 400px; object-fit: contain;">`;
        }
        
        modalBody.innerHTML = `
            <div class="modal-layout">
                <div class="modal-3d">
                    ${modelViewerHTML}
                </div>
                <div class="modal-details">
                    <h2>${product.name}</h2>
                    <p>${product.brand}</p>
                    <p>${product.description}</p>
                    <p class="price">${formatRupiah(product.price)}</p>
                    <button class="add-to-cart-button" data-id="${product.id}">Tambah ke Keranjang</button>
                </div>
            </div>
        `;

        // --- DIMODIFIKASI: Mengganti alert() dengan showToast() ---
        modalBody.querySelector(".add-to-cart-button").addEventListener("click", (e) => {
            addToCart(product.id);
            // Menggunakan notifikasi profesional (dalam Bahasa Inggris)
            showToast(`${product.name} has been added to cart.`); 
        });

        productModal.style.display = "block";
    };

    // --- FITUR 3: Instant Search (Pencarian Real-time) ---
    searchInput.addEventListener("keyup", (e) => {
        const query = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) || 
            product.brand.toLowerCase().includes(query)
        );
        displayProducts(filteredProducts);
    });

    // --- FITUR 4: Persistent Shopping Cart (Keranjang Belanja) ---
    
    // Fungsi untuk menambahkan item ke keranjang (Tidak berubah)
    const addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        saveCart();
        updateCartUI();
    };

    // Fungsi untuk mengubah kuantitas (Tidak berubah)
    const changeQuantity = (productId, action) => {
        const item = cart.find(item => item.id === productId);
        if (!item) return;

        if (action === 'increase') {
            item.quantity++;
        } else if (action === 'decrease') {
            item.quantity--;
            if (item.quantity <= 0) {
                // Hapus item jika kuantitas 0 (logika ini tetap ada)
                cart = cart.filter(i => i.id !== productId);
            }
        }
        
        saveCart();
        updateCartUI();
    };

    // --- BARU: Fungsi untuk menghapus item langsung ---
    /**
     * Menghapus item dari keranjang berdasarkan ID, terlepas dari kuantitas.
     * @param {number} productId - ID produk yang akan dihapus.
     */
    const removeFromCart = (productId) => {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartUI();
    };

    // Fungsi untuk menyimpan keranjang ke localStorage (Tidak berubah)
    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // --- DIMODIFIKASI: Memperbarui UI Keranjang ---
    const updateCartUI = () => {
        // Update Cart Count (di header)
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Update Cart Modal
        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Keranjang Anda kosong.</p>";
            cartTotal.textContent = formatRupiah(0);
            return;
        }

        cartItems.innerHTML = "";
        let totalHarga = 0;

        cart.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.className = "cart-item";
            
            // --- MODIFIKASI HTML: Menambahkan tombol "Remove" ---
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <strong>${item.name}</strong>
                        <p>${formatRupiah(item.price)}</p>
                        <button class="cart-remove" data-id="${item.id}">Remove</button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button class="cart-decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="cart-increase" data-id="${item.id}">+</button>
                </div>
            `;
            cartItems.appendChild(itemElement);
            totalHarga += item.price * item.quantity;
        });

        cartTotal.textContent = formatRupiah(totalHarga);

        // Event listener untuk tombol +/- (Tidak berubah)
        cartItems.querySelectorAll('.cart-decrease').forEach(button => {
            button.addEventListener('click', (e) => changeQuantity(Number(e.target.dataset.id), 'decrease'));
        });
        cartItems.querySelectorAll('.cart-increase').forEach(button => {
            button.addEventListener('click', (e) => changeQuantity(Number(e.target.dataset.id), 'increase'));
        });

        // --- BARU: Event listener untuk tombol "Remove" ---
        cartItems.querySelectorAll('.cart-remove').forEach(button => {
            button.addEventListener('click', (e) => removeFromCart(Number(e.target.dataset.id)));
        });
    };

    // --- Event Listener Global (Modal) ---
    
    // Tampilkan modal keranjang
    cartToggle.addEventListener("click", () => {
        updateCartUI();
        cartModal.style.display = "block";
    });

    // Tutup modal (untuk semua modal)
    closeModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            productModal.style.display = "none";
            cartModal.style.display = "none";
        });
    });

    // Tutup modal jika klik di luar area modal
    window.addEventListener("click", (e) => {
        if (e.target === productModal) {
            productModal.style.display = "none";
        }
        if (e.target === cartModal) {
            cartModal.style.display = "none";
        }
    });

    // --- Inisialisasi Aplikasi ---
    displayProducts(); // Tampilkan semua produk saat halaman pertama kali dimuat
    updateCartUI(); // Update hitungan keranjang saat halaman dimuat
});
