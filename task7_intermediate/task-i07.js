// tunggu ms milidetik
const tidur = (ms) => new Promise((selesai) => setTimeout(selesai, ms));

// jalankan tugas dengan maksimal `batas` yang aktif bersamaan
async function pool(tugas, batas) {
  // !(>=) juga menolak NaN
  if (!(batas >= 1)) throw new Error("Batas minimal 1");

  const promises = [];
  let berikutnya = 0;

  // tiap worker mengambil tugas berikutnya sampai habis
  const worker = async () => {
    while (berikutnya < tugas.length) {
      const i = berikutnya++;
      // async wrapper supaya throw sinkron juga jadi rejection
      promises[i] = (async () => tugas[i]())();
      await promises[i].catch(() => {});
    }
  };

  const jumlahWorker = Math.min(batas, tugas.length);
  await Promise.allSettled(Array.from({ length: jumlahWorker }, worker));

  // allSettled menjaga urutan sesuai input, bukan urutan selesai
  return Promise.allSettled(promises);
}

async function main() {
  const supplier = [
    { nama: "supplier-a", delay: 30, gagal: false },
    { nama: "supplier-b", delay: 10, gagal: false },
    { nama: "supplier-c", delay: 20, gagal: false },
    { nama: "supplier-d", delay: 10, gagal: true },
    { nama: "supplier-e", delay: 5, gagal: false },
  ];

  let aktif = 0;
  let maksAktif = 0;

  const tugas = supplier.map(({ nama, delay, gagal }) => async () => {
    aktif++;
    maksAktif = Math.max(maksAktif, aktif);

    try {
      await tidur(delay);
      if (gagal) throw new Error(`${nama} gagal`);
      return nama;
    } finally {
      aktif--;
    }
  });

  const hasil = await pool(tugas, 2);

  const sukses = hasil.filter((h) => h.status === "fulfilled").map((h) => h.value);
  const gagal = hasil
    .map((h, i) => (h.status === "rejected" ? `${supplier[i].nama} (${h.reason.message})` : null))
    .filter(Boolean);

  console.log(`Maksimal aktif: ${maksAktif}`);
  console.log(`Selesai: ${sukses.join(", ")}`);
  console.log(`Gagal: ${gagal.join(", ")}`);
  console.log(`Sukses: ${sukses.length}, gagal: ${gagal.length}`);
}

main();