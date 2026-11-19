import { menu } from "./data/menu.js";
import { formatRupiah } from "./utils/format.js";
import buatPesanan from "./services/order.js";

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