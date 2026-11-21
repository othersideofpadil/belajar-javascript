const { buatApiClient } = require("./client");

async function main() {
  const api = buatApiClient("http://localhost:3000");

  const halaman = await api.getMenu({ page: 1, limit: 2 });
  console.log("Halaman 1:", halaman.data.map((m) => m.nama).join(", "));
  console.log("Total:", halaman.total);

  const menu = await api.getMenuById(2);
  console.log(`Menu 2: ${menu.nama} - Rp${menu.harga}`);

  try {
    await api.getMenuById(999);
  } catch (err) {
    console.log(`Error ${err.status}: ${err.message}`);
  }
}

main();