// error dasar aplikasi: membawa code, status, dan penanda boleh di-retry
class AppError extends Error {
  constructor(message, { code = "APP_ERROR", status = 500, retryable = false, cause } = {}) {
    super(message, { cause });
    this.name = "AppError";
    this.code = code;
    this.status = status;
    this.retryable = retryable;
  }
}

// error input yang salah, tidak ada gunanya diulang
class ValidasiError extends AppError {
  constructor(message, options = {}) {
    super(message, { code: "VALIDASI", status: 400, retryable: false, ...options });
    this.name = "ValidasiError";
  }
}

// tunggu ms milidetik
const tidur = (ms) => new Promise((selesai) => setTimeout(selesai, ms));

// ulangi fn hanya untuk error retryable, maksimal maxAttempts kali
async function withRetry(fn, { maxAttempts = 3, delayMs = 20 } = {}) {
  for (let percobaan = 1; ; percobaan++) {
    try {
      return await fn();
    } catch (error) {
      // retryable undefined dianggap false, jadi langsung dilempar
      if (!error.retryable) throw error;

      console.log(`Percobaan ${percobaan} gagal: ${error.code}`);
      if (percobaan >= maxAttempts) throw error;

      await tidur(delayMs);
    }
  }
}

async function main() {
  // gagal dua kali, percobaan ketiga berhasil
  let gagal = 0;
  const prosesPembayaran = async () => {
    if (gagal < 2) {
      gagal++;
      throw new AppError("Gateway timeout", {
        code: "GATEWAY_TIMEOUT",
        status: 503,
        retryable: true,
      });
    }
    return 60000;
  };

  const nominal = await withRetry(prosesPembayaran);
  console.log(`Pembayaran berhasil: Rp${nominal}`);

  // error validasi tidak di-retry
  try {
    await withRetry(() => {
      throw new ValidasiError("Nominal tidak valid");
    });
  } catch (error) {
    console.log(`Kode error: ${error.code}`);
  }
}

main();