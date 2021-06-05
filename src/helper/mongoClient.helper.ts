import mongodb from "mongodb";
import mongoose from "mongoose";
export class MongoClientHelper {
  portListen: any;
  mongoURL: any;
  app: any;

  constructor(portListen: any, mongoURL: any, app: any) {
    this.portListen = portListen;
    this.mongoURL = mongoURL;
    this.app = app;
  }

  mongoClient() {
    const mongoClient = mongodb.MongoClient;
    const port = this.portListen || 8000;

    mongoose
      .connect(this.mongoURL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(async () => {
        this.app.listen(port, () => {
          console.log(`listening on port ${port}`);
        });
      })
      .catch((err) => {
        console.error(err.stack);
        process.exit(1);
      });
  }
}
