const http = require("node:http");

const menu = [
  { id: 1, nama: "Espresso", harga: 18000 },
  { id: 2, nama: "Latte", harga: 24000 },
  { id: 3, nama: "Kopi Susu", harga: 22000 },
  { id: 4, nama: "Croissant", harga: 25000 },
];

// kirim body sebagai JSON dengan status tertentu
function kirim(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/api/menu") {
    // nilai tidak valid jatuh ke default
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 2;
    const data = menu.slice((page - 1) * limit, page * limit);
    return kirim(res, 200, { data, page, limit, total: menu.length });
  }

  const cocok = url.pathname.match(/^\/api\/menu\/(\d+)$/);
  if (cocok) {
    const item = menu.find((m) => m.id === Number(cocok[1]));
    return item
      ? kirim(res, 200, item)
      : kirim(res, 404, { error: "Menu tidak ditemukan" });
  }

  if (url.pathname === "/api/error") {
    return kirim(res, 500, { error: "Kesalahan server" });
  }

  kirim(res, 404, { error: "Endpoint tidak ditemukan" });
});

server.listen(3000, () => console.log("Server jalan di http://localhost:3000"));