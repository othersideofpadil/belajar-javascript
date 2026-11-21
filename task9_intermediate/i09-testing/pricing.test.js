const test = require("node:test");
const assert = require("node:assert/strict");
const { hitungDiskon, hitungTotal } = require("./pricing");

test("tanpa voucher menghasilkan diskon 0", () => {
  assert.equal(hitungDiskon(100000), 0);
  assert.equal(hitungDiskon(100000, ""), 0);
});

test("voucher tidak dikenal atau salah huruf besar/kecil menghasilkan diskon 0", () => {
  assert.equal(hitungDiskon(100000, "PROMO99"), 0);
  assert.equal(hitungDiskon(100000, "senja10"), 0);
});

// satu baris tabel = satu test
const kasusDiskon = [
  { subtotal: 49999, voucher: "SENJA10", harapan: 0 },
  { subtotal: 50000, voucher: "SENJA10", harapan: 5000 },
  { subtotal: 60000, voucher: "SENJA10", harapan: 6000 },
  { subtotal: 100000, voucher: "SENJA20", harapan: 20000 },
];

for (const { subtotal, voucher, harapan } of kasusDiskon) {
  test(`diskon ${voucher} untuk ${subtotal} menghasilkan ${harapan}`, () => {
    assert.equal(hitungDiskon(subtotal, voucher), harapan);
  });
}

test("SENJA20 di bawah batas 100000 menghasilkan diskon 0", () => {
  assert.equal(hitungDiskon(99999, "SENJA20"), 0);
});

test("subtotal negatif melempar RangeError", () => {
  assert.throws(() => hitungDiskon(-1, "SENJA10"), {
    name: "RangeError",
    message: "Subtotal tidak boleh negatif",
  });
});

test("total 60000 dengan SENJA10 adalah 59940", () => {
  assert.equal(hitungTotal(60000, "SENJA10"), 59940);
});

test("total tanpa voucher menghitung pajak 11% dengan pembulatan", () => {
  assert.equal(hitungTotal(100000), 111000);
  assert.equal(hitungTotal(12345), 13703); // pajak 1357.95 dibulatkan ke 1358
  assert.equal(hitungTotal(0), 0);
});