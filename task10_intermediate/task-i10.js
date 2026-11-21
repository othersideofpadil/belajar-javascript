const waktu = new Date("2026-11-11T07:30:00Z");

// tanggal panjang bahasa Indonesia di zona waktu tertentu
function formatTanggal(date, timeZone) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "long", timeZone }).format(date);
}

// jam dua digit format 24 jam di zona waktu tertentu
function formatJam(date, timeZone) {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  }).format(date);
}

// format mata uang, spasi non-breaking diganti spasi biasa supaya output stabil
function formatUang(amount, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "IDR" ? 0 : 2,
  })
    .format(amount)
    .replace(/\u00a0/g, " ");
}

// selisih dalam menit, dibulatkan jadi angka bulat
function durasiMenit(mulai, selesai) {
  return Math.round((selesai - mulai) / 60000);
}

// ubah menit jadi "X jam Y menit", bagian yang 0 dihilangkan
function formatDurasi(menit) {
  const jam = Math.floor(menit / 60);
  const sisa = menit % 60;

  return [jam && `${jam} jam`, sisa && `${sisa} menit`].filter(Boolean).join(" ") || "0 menit";
}

console.log("Jakarta:", formatTanggal(waktu, "Asia/Jakarta") + ", " + formatJam(waktu, "Asia/Jakarta"));
console.log("New York:", formatTanggal(waktu, "America/New_York") + ", " + formatJam(waktu, "America/New_York"));
console.log("IDR:", formatUang(60000, "id-ID", "IDR"));
console.log("USD:", formatUang(4, "en-US", "USD"));
console.log("Durasi:", formatDurasi(durasiMenit(new Date("2026-11-11T08:00:00Z"), new Date("2026-11-11T10:30:00Z"))));