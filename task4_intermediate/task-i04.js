const pelanggan = {
  nama: "Nadia",
  telepon: null,
  alamat: { jalan: "Jl. Merdeka 10", kota: "Bandung" },
  preferensi: undefined,
};

// ambil field yang dibutuhkan, isi "-" kalau kosong (null/undefined)
function normalisasiPelanggan(data) {
  const field = {
    nama: data?.nama,
    telepon: data?.telepon,
    kota: data?.alamat?.kota,
    preferensi: data?.preferensi,
  };

  return Object.fromEntries(
    Object.entries(field).map(([kunci, nilai]) => [kunci, nilai ?? "-"])
  );
}

// gabungkan jalan dan kota, atau beri pesan kalau alamat kosong
function formatAlamat(data) {
  const bagian = [data?.alamat?.jalan, data?.alamat?.kota].filter(Boolean);
  return bagian.length ? bagian.join(", ") : "Alamat belum diisi";
}

// hitung properti top-level
function hitungProperti(data) {
  return Object.keys(data ?? {}).length;
}

// ambil key yang nilainya bukan null/undefined
function propertiTerisi(data) {
  return Object.entries(data ?? {})
    .filter(([, nilai]) => nilai !== null && nilai !== undefined)
    .map(([kunci]) => kunci);
}

const hasil = normalisasiPelanggan(pelanggan);

console.log(`Nama: ${hasil.nama}`);
console.log(`Telepon: ${hasil.telepon}`);
console.log(`Kota: ${hasil.kota}`);
console.log(`Preferensi: ${hasil.preferensi}`);
console.log(`Jumlah properti: ${hitungProperti(pelanggan)}`);
console.log(`Alamat: ${formatAlamat(pelanggan)}`);
console.log(`Properti terisi: ${propertiTerisi(pelanggan).join(", ")}`);