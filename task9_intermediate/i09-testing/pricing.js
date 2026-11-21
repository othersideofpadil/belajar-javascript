// aturan voucher: batas belanja minimal dan persen diskon
const ATURAN = new Map([
  ["SENJA10", { minBelanja: 50000, persen: 10 }],
  ["SENJA20", { minBelanja: 100000, persen: 20 }],
]);

// hitung nominal diskon, 0 kalau voucher tidak dikenal atau belum memenuhi syarat
function hitungDiskon(subtotal, voucher) {
  if (subtotal < 0) throw new RangeError("Subtotal tidak boleh negatif");

  const aturan = ATURAN.get(voucher);
  if (!aturan || subtotal < aturan.minBelanja) return 0;

  return Math.round((subtotal * aturan.persen) / 100);
}

// total bayar: subtotal dikurangi diskon, lalu ditambah pajak 11%
function hitungTotal(subtotal, voucher) {
  const setelahDiskon = subtotal - hitungDiskon(subtotal, voucher);
  const pajak = Math.round((setelahDiskon * 11) / 100);

  return setelahDiskon + pajak;
}

module.exports = { hitungDiskon, hitungTotal };