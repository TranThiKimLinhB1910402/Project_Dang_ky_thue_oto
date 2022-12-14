const { ObjectId } = require("mongodb");

class DriverService{
    constructor(client){
        this.Driver =client.db().collection("drivers");
        this.Rent = client.db().collection("rents");
    }
    extractDriverData(payload) {
        const driver = {
          _id: payload.phone,
          full_name: payload.full_name,
          address: payload.address,
          email: payload.email,
          phone: payload.phone
        };
         // remove undefined fields
        Object.keys(driver).forEach(
            (key) => driver[key] === undefined && delete driver[key]
        );
        return driver;
    }
    async getDriverDay(){
        const result = await this.Driver.aggregate([
            {
                $lookup: {
                  from: "rents",
                  localField: "full_name",
                  foreignField: "ten_tai_xe",
                  as: "phieudangky",
                },
            },
            
        ])
        return await result.toArray();
    }
    async create(payload) {
        const driver = this.extractDriverData(payload);
        const isExist = await this.Driver.findOne({ _id: driver._id });
        if (!isExist) {
          const result = await this.Driver.insertOne(driver);
          return result.value;
        }
    }
    async find(filter) {
        const cursor = await this.Driver.find(filter);
        return await cursor.toArray();
    }
    async findById(id) {
        return await this.Driver.findOne({
            _id: id,
        });
    }
    async delete(id) {
        const result = await this.Driver.findOneAndDelete({
          _id: id,
        });
        return result.value;
    }
    async update(id, payload){
        const filter = {
            _id: id,
        }
        const update = this.extractDriverData(payload);
        const result = await this.Driver.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after"}
        );
        return result.value;
    }
}
module.exports = DriverService;