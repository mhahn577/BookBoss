const connectionString:string = 'mongodb://MichaelH:987db1789@ds041150.mlab.com:41150/mhahn577database1';

import * as mongodb from 'mongodb';

export default class Database {
  public static db:mongodb.Db;

  public static connect() {
    return mongodb.MongoClient.connect(connectionString).then((db) => {
        console.log('Successful DB connect!');
        this.db = db;
    }).catch((err) => {
        console.error(err);
    });
  }
}
