import mongodb from "mongodb";
import mongoose from "mongoose";

export class MongoClientHelper {
    portListen: any;
    mongoURL: any;
    app: any;

    constructor(portListen: any, mongoURL: any, app: any) {
        this.portListen = portListen
        this.mongoURL = mongoURL
        this.app = app
    }

    mongoClient() {
        const mongoClient = mongodb.MongoClient;
        const port = this.portListen || 8000;

        mongoClient.connect(this.mongoURL, {
            poolSize: 50,
            wtimeout: 2500,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .catch((err) => {
                console.error(err.stack);
                process.exit(1);
            })
            .then(async (client) => {
                this.app.listen(port, () => {
                    console.log(`listening on port ${port}`);
                });
            })
        
        
    }
}