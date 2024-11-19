import createApiClient from "./api.service";

class PublisherService {
    constructor (baseUrl = "/api/theodoimuonsach"){
        this.api = createApiClient(baseUrl);
    }
    async getAll(){
        return (await this.api.get("/")).data;
    }
    async create(data){
        return (await this.api.post("/", data)).data;
    }
    async deleteAll(){
        return (await this.api.delete("/")).data;
    }
    async get(id){
        return (await this.api.get(`/${id}`)).data;
    }
    async getByUser(MaDocGia){
        return (await this.api.get(`/findByUser/${MaDocGia}`)).data;
    }
    async update(id, data){
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id){
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new PublisherService();