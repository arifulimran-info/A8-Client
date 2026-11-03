import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb://arifulimraninfo_db_user:T8VOEMO2jVcfWevf@ac-ushgd4h-shard-00-00.kelwo2m.mongodb.net:27017,ac-ushgd4h-shard-00-01.kelwo2m.mongodb.net:27017,ac-ushgd4h-shard-00-02.kelwo2m.mongodb.net:27017/?ssl=true&replicaSet=atlas-y28ng4-shard-0&authSource=admin",
);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}
