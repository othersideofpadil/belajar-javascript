import { formatRupiah } from "../utils/index.js";

// cetak rincian harga per baris pesanan
export function cetakLaporan(pesanan) {
  console.log("--- laporan ---");

  pesanan.items.forEach((item) => {
    console.log(`${item.nama} x${item.qty} = ${formatRupiah(item.harga * item.qty)}`);
  });
}