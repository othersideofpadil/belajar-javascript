// error HTTP dengan status dan pesan dari server
class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function buatApiClient(baseUrl) {
  // satu pintu untuk semua request: url, timeout, dan error
  async function request(path, { query, ...options } = {}) {
    const url = new URL(path, baseUrl);
    if (query) url.search = new URLSearchParams(query);

    const response = await fetch(url, {
      ...options,
      signal: AbortSignal.timeout(2000),
    });

    if (!response.ok) {
      // body error bisa bukan JSON, jadi jangan sampai menutupi status aslinya
      const body = await response.json().catch(() => ({}));
      throw new ApiError(body.error ?? response.statusText, response.status);
    }

    return response.json();
  }

  return {
    request,
    getMenu: ({ page = 1, limit = 2 } = {}) =>
      request("/api/menu", { query: { page, limit } }),
    getMenuById: (id) => request(`/api/menu/${encodeURIComponent(id)}`),
  };
}

module.exports = { buatApiClient, ApiError };