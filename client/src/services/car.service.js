import createApiClient from "./api.service";
class CarService {
    constructor(baseUrl = "/api/cars") {
    this.api = createApiClient(baseUrl);
    }
    async getAll() {
    return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post('/', data,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })).data;
    }
    // async getDayBS(id) {
    //     return (await this.api.get(`/getbs/${id}`)).data;
    // }
    async get(id) {
    return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })).data;
    }
    async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
    }
}
export default new CarService();
