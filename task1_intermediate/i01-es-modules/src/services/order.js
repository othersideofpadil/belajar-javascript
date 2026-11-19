// jumlahkan harga x qty dari semua item
export function hitungSubtotal(items) {
  return items.reduce((total, item) => total + item.harga * item.qty, 0);
}

// susun data pesanan lengkap dari daftar item
export function buatPesanan(items) {
  return {
    items,
    subtotal: hitungSubtotal(items),
    totalItem: items.reduce((total, item) => total + item.qty, 0),
    rincian: items.map((item) => `${item.qty}x ${item.nama}`).join(", "),
  };
}

export default buatPesanan;