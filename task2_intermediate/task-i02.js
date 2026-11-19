// buat aturan diskon: minBelanja dan persen disimpan di closure
function buatAturanDiskon({ minBelanja, persen }) {
  return (subtotal) => {
    if (subtotal < minBelanja) return 0;
    return Math.round((subtotal * persen) / 100);
  };
}

// buat penghitung yang naik 1 tiap dipanggil
function buatPenghitung() {
  let hitungan = 0;
  return () => ++hitungan;
}

// simpan hasil fn per kombinasi argument
function memoize(fn) {
  const cache = new Map();

  return (...args) => {
    // JSON.stringify supaya argument jamak dihitung sebagai satu kunci
    const kunci = JSON.stringify(args);

    if (!cache.has(kunci)) {
      cache.set(kunci, fn(...args));
    }

    return cache.get(kunci);
  };
}

const diskon10 = buatAturanDiskon({ minBelanja: 50000, persen: 10 });
const diskon20 = buatAturanDiskon({ minBelanja: 100000, persen: 20 });

console.log("Diskon 10%:", "Rp" + diskon10(60000));
console.log("Diskon 20%:", "Rp" + diskon20(60000));

const hitung = buatPenghitung();
console.log("Penghitung:", hitung() + ", " + hitung() + ", " + hitung());

let panggilan = 0;
const lambat = (n) => {
  panggilan += 1;
  return n * 2;
};
const cepat = memoize(lambat);
console.log(cepat(21), cepat(21));
console.log("Panggilan:", panggilan);