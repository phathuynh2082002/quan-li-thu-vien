import createApiClient from "./api.service";

class NhanVienService {
  constructor(baseUrl = "/api/nhanVien") {
    this.api = createApiClient(baseUrl);
  }

  async login(soDienThoai, password) {
    const data = { soDienThoai, password };
    return (await this.api.post("/login", data)).data;
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
    return (await this.api.put(`/${id}`, data)).data;
  }

  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new NhanVienService();
