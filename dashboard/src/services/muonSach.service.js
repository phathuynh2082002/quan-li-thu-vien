import createApiClient from "./api.service";

class MuonSachService {
  constructor(baseUrl = "/api/muonSach") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  async deleteAll() {
    return (await this.api.delete("/")).data;
  }

  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async update(id, data) {
    const Jsondata = {
      maNhanVien : data
    }
    return (await this.api.put(`/${id}`, Jsondata)).data;
  }

  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new MuonSachService();
