import { menu } from "./data/index.js";
import { formatRupiah } from "./utils/index.js";
import buatPesanan from "./services/index.js";

// cari menu berdasarkan nama, lalu tambahkan qty
function pilihMenu(nama, qty) {
  const item = menu.find((m) => m.nama === nama);

  // gagal cepat kalau nama menu salah
  if (!item) {
    throw new Error(`Menu "${nama}" tidak ditemukan`);
  }

  return { ...item, qty };
}

const pesanan = buatPesanan([
  pilihMenu("Espresso", 2),
  pilihMenu("Latte", 1),
]);

// cetak hasil pesanan
console.log(`Subtotal: ${formatRupiah(pesanan.subtotal)}`);
console.log(`Total item: ${pesanan.totalItem}`);
console.log(`Rincian: ${pesanan.rincian}`);

// muat modul laporan hanya kalau diminta lewat flag
if (process.argv.includes("--laporan")) {
  const { cetakLaporan } = await import("./services/laporan.js");
  cetakLaporan(pesanan);
}