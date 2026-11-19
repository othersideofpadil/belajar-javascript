// class dasar untuk semua item menu
class MenuItem {
  constructor(nama, harga, kategori) {
    this.nama = nama;
    this.harga = harga;
    this.kategori = kategori;
  }

  // harga dengan awalan Rp
  get hargaFormat() {
    return `Rp${this.harga}`;
  }

  // harga ditambah pajak 11%
  get hargaPajak() {
    return Math.round(this.harga * 1.11);
  }

  // teks ringkas: nama | kategori | harga
  label() {
    return `${this.nama} | ${this.kategori} | ${this.hargaFormat}`;
  }

  // data dasar untuk diserialisasi
  toJSON() {
    return { nama: this.nama, harga: this.harga, kategori: this.kategori };
  }
}

// minuman punya ukuran (panas/dingin)
class Minuman extends MenuItem {
  constructor(nama, harga, ukuran) {
    super(nama, harga, "Minuman");
    this.ukuran = ukuran;
  }

  label() {
    return `${super.label()} | ${this.ukuran}`;
  }

  toJSON() {
    return { ...super.toJSON(), ukuran: this.ukuran };
  }

  // buat Minuman dari objek biasa
  static dariJSON({ nama, harga, ukuran }) {
    return new Minuman(nama, harga, ukuran);
  }
}

// makanan punya porsi
class Makanan extends MenuItem {
  constructor(nama, harga, porsi) {
    super(nama, harga, "Makanan");
    this.porsi = porsi;
  }

  label() {
    return `${super.label()} | porsi:${this.porsi}`;
  }

  toJSON() {
    return { ...super.toJSON(), porsi: this.porsi };
  }

  // buat Makanan dari objek biasa
  static dariJSON({ nama, harga, porsi }) {
    return new Makanan(nama, harga, porsi);
  }
}

// pilih class yang sesuai berdasarkan kategori
class MenuFactory {
  static dariJSON(data) {
    switch (data.kategori) {
      case "Minuman":
        return Minuman.dariJSON(data);
      case "Makanan":
        return Makanan.dariJSON(data);
      default:
        throw new Error(`Kategori "${data.kategori}" tidak dikenal`);
    }
  }
}

const menu = [
  new Minuman("Espresso", 18000, "panas"),
  new Minuman("Latte", 24000, "dingin"),
  new Makanan("Croissant", 25000, 1),
];

menu.forEach((item) => console.log(item.label()));
console.log("Jumlah menu:", menu.length);
console.log("Espresso adalah Minuman:", menu[0] instanceof Minuman);

const matcha = Minuman.dariJSON({ nama: "Matcha", harga: 26000, ukuran: "dingin" });
console.log("Dari JSON:", matcha.label());

//console.log(menu[0].hargaPajak); // 19980
//console.log(JSON.stringify(menu[0])); // {"nama":"Espresso","harga":18000,"kategori":"Minuman","ukuran":"panas"}

//const dariFactory = MenuFactory.dariJSON(menu[2].toJSON());
//console.log(dariFactory instanceof Makanan); // true
//console.log(dariFactory.label()); // Croissant | Makanan | Rp25000 | porsi:1