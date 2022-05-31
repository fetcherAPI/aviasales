class APIService {
  base = "https://aviasales-test-api.kata.academy";

  endURL(endpoint, params = "") {
    return `${this.base}${endpoint}?${params}`;
  }

  async sendRequest(url, method = "get", value = null) {
    const data = {};
    if (method === "post") {
      data.method = "POST";
      data.headers = { "Content-Type": "application/json;charset=utf-8" };
      data.body = JSON.stringify(value);
    }
    if (method === "delete") {
      data.method = "DELETE";
    }
    const res = await fetch(url, data);
    return res;
  }

  getSearchId = async () => {
    const url = this.endURL("/search");
    const res = await this.sendRequest(url);
    if (!res.ok) {
      return this.getSearchId();
    }
    const data = await res.json();
    return data.searchId;
  };

  getTickets = async (searchId) => {
    const url = this.endURL("/tickets", `searchId=${searchId}`);
    try {
      const res = await this.sendRequest(url);
      const data = await res.json();
      return data;
    } catch (err) {
      return -1;
    }
  };
}

const api = new APIService();
export default api;
