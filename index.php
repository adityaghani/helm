<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Toko Helm Arya</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header>
    <div class="container topbar">
      <div class="brand"><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36'><rect rx='6' width='36' height='36' fill='%230b5cff'/><text x='50%' y='55%' font-size='18' text-anchor='middle' fill='white' font-family='Arial'>AGV</text></svg>" alt="logo" width="36"><h1>AGV — Demo</h1></div>
      <nav>
        <ul>
          <li><a href="#">Helmets</a></li>
          <li><a href="#">Accessories</a></li>
          <li><a href="#">Collections</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </nav>
      <div class="actions"><button class="btn">Wishlist</button><button class="btn">Cart</button></div>
    </div>
  </header>

  <main class="container">
    <section class="hero">
      <div class="hero-left">
        <h2>Performance. Safety. Style.</h2>
        <p>Toko helm terjosjis</p>
        <div class="hero-card">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <strong>PISTA GP RR LIMITED</strong>
              <div style="color:var(--muted);font-size:14px">Technical excellence and aesthetic research.</div>
            </div>
            <button class="btn">Buy now</button>
          </div>
        </div>
      </div>
      <div class="hero-card" style="padding:0">
        <div class="carousel" aria-label="Hero carousel">
          <div class="slides">
            <div class="slide" style="background-image:url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=60')"></div>
            <div class="slide" style="background-image:url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=60')"></div>
            <div class="slide" style="background-image:url('https://images.unsplash.com/photo-1526178619770-41f1b3b8f703?auto=format&fit=crop&w=1200&q=60')"></div>
          </div>
          <div class="carousel-controls">
            <div class="control" id="prev">‹</div>
            <div class="control" id="next">›</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h3>Spesial Untukmu</h3>
      <div class="grid" id="products">

      </div>
    </section>

    <section class="section">
      <h3>Kategori</h3>
      <div class="categories">
        <div class="pill">Racing</div>
        <div class="pill">Sport</div>
        <div class="pill">Touring</div>
        <div class="pill">Modular</div>
      </div>
    </section>

    <section class="section newsletter">
      <div>
        <h3>Join the community</h3>
        <div>Dapatkan Diskon 15% di Pembelian Berikutnya.</div>
      </div>
      <form id="newsletter" onsubmit="event.preventDefault();alert('Thanks!')">
        <input type="email" placeholder="Email address" required>
        <button class="btn" type="submit">Subscribe</button>
      </form>
    </section>
  </main>

  <footer>
    <div class="container">
      <div class="footer-grid">
        <div>
          <strong>Toko Helm Arya</strong>
          <p style="color:var(--muted)">haloo.</p>
        </div>
        <div>
          <strong>Customer</strong>
          <div style="color:var(--muted);font-size:14px">Contact<br>Track order<br>FAQ</div>
        </div>
        <div>
          <strong>Products</strong>
          <div style="color:var(--muted);font-size:14px">Helmets<br>Visors<br>Accessories</div>
        </div>
        <div>
          <strong>Follow</strong>
          <div class="socials"><span>Facebook</span><span>Instagram</span><span>Youtube</span></div>
        </div>
      </div>
      <div style="margin-top:18px;color:var(--muted);font-size:13px">© Demo — not affiliated with AGV.</div>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>
