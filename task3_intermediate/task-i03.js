const menu = [
  { nama: "Espresso", kategori: "Minuman", harga: 18000, tersedia: true },
  { nama: "Latte", kategori: "Minuman", harga: 24000, tersedia: true },
  { nama: "Kopi Susu", kategori: "Minuman", harga: 22000, tersedia: false },
  { nama: "Croissant", kategori: "Makanan", harga: 25000, tersedia: true },
  { nama: "Roti Bakar", kategori: "Makanan", harga: 20000, tersedia: false },
];

const pesanan = [
  { id: "KS-001", items: [{ nama: "Espresso", qty: 2 }, { nama: "Latte", qty: 1 }] },
  { id: "KS-002", items: [{ nama: "Croissant", qty: 1 }, { nama: "Roti Bakar", qty: 2 }] },
];

// kelompokkan menu berdasarkan nilai kategori
function kelompokkanKategori(menu) {
  return menu.reduce((hasil, item) => {
    hasil[item.kategori] = [...(hasil[item.kategori] ?? []), item];
    return hasil;
  }, {});
}

// true kalau semua menu punya harga lebih dari 0
function semuaPunyaHarga(menu) {
  return menu.every((item) => item.harga > 0);
}

// true kalau ada minimal satu menu yang habis
function adaYangHabis(menu) {
  return menu.some((item) => item.tersedia === false);
}

// gabungkan item dari semua pesanan jadi satu array datar
function rincianSemuaPesanan(pesanan) {
  return pesanan.flatMap((p) => p.items);
}

// cari menu dengan harga tertinggi, kembalikan objek utuh
function menuTermahal(menu) {
  return menu.reduce((termahal, item) =>
    item.harga > termahal.harga ? item : termahal
  );
}

// jumlahkan harga semua menu per kategori
function rekapNilaiKategori(menu) {
  return menu.reduce((hasil, item) => {
    hasil[item.kategori] = (hasil[item.kategori] ?? 0) + item.harga;
    return hasil;
  }, {});
}

// cari menu yang namanya mengandung kata kunci, abaikan besar kecil huruf
function cariMenu(menu, kataKunci) {
  const kunci = kataKunci.toLowerCase();
  return menu.filter((item) => item.nama.toLowerCase().includes(kunci));
}

// ambil n menu termahal, salin dulu supaya urutan asli aman
function topN(menu, n) {
  return [...menu].sort((a, b) => b.harga - a.harga).slice(0, n);
}

const kelompok = kelompokkanKategori(menu);
const ringkasan = Object.entries(kelompok)
  .map(([kategori, daftar]) => `${kategori}=${daftar.length}`)
  .join(", ");

console.log(`Kategori: ${ringkasan}`);
console.log(`Semua punya harga: ${semuaPunyaHarga(menu)}`);
console.log(`Ada yang habis: ${adaYangHabis(menu)}`);
console.log(`Total baris pesanan: ${rincianSemuaPesanan(pesanan).length}`);
console.log(`Termahal: ${menuTermahal(menu).nama}`);
console.log(rekapNilaiKategori(menu)); 
console.log(cariMenu(menu, "KOPI").map((m) => m.nama)); 
console.log(cariMenu(menu, "ro").map((m) => m.nama)); 
console.log(topN(menu, 2).map((m) => m.nama)); 
console.log(menu[0].nama); 