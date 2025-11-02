<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Presensi Mahasiswa UNIKA Semarang</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <div class="card p-4 bg-light text-dark">
    <h3 class="text-center mb-3 fw-bold">Presensi Mahasiswa</h3>

    <form action="simpan_presensi.php" method="POST">
      <div class="mb-3">
        <label class="form-label">Nama Mahasiswa</label>
        <input type="text" name="nama" class="form-control" required>
      </div>

      <div class="mb-3">
        <label class="form-label">NIM</label>
        <input type="text" name="nim" class="form-control" required>
      </div>

      <div class="mb-3">
        <label class="form-label">Keterangan</label>
        <select name="keterangan" class="form-select" required>
          <option value="">-- Pilih --</option>
          <option value="Hadir">Hadir</option>
          <option value="Izin">Izin</option>
          <option value="Alpa">Alpa</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary w-100">Simpan Presensi</button>

      <div class="counter mt-2">
        📋 Total Data Presensi: <?= $jumlah_data ?>
      </div>

      ...
  <div class="text-center mt-3">
    <a href="data_presensi.php" class="text-decoration-none">Lihat Data Presensi →</a>
  </div>
</form>
</div>

<!-- JS EXTERNAL -->
<script src="assets/script.js"></script>

</body>
</html>

