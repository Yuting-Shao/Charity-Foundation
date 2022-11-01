import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
//Yuting Shao
function MyMongoDB() {
  const myDB = {};
  const url = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const DB_NAME = "charityFoundation";
  const USER_COLLECTION = "user";

  async function getCollection(colName) {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(DB_NAME);
    return [client, db.collection(colName)];
  }

  //function that authenticates users
  myDB.authenticate = async (user) => {
    let client, col;
    try {
      // client = new MongoClient(url);
      [client, col] = await getCollection(USER_COLLECTION);
      console.log("searching for", user);
      const res = await col.findOne({ user: user.user });

      console.log("res", res);
      console.log(
        "result: ",
        res !== null && bcrypt.compareSync(user.password, res.password)
      );

      return res !== null && bcrypt.compareSync(user.password, res.password);
    } finally {
      console.log("closing the connection");
      await client.close();
    }
  };

  //function that creates users
  myDB.createUser = async (user) => {
    let client, col;
    try {
      [client, col] = await getCollection(USER_COLLECTION);
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
      return await col.insertOne(user);
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  //function that gets user info by email
  myDB.getUser = async (_email) => {
    let client;
    try {
      client = new MongoClient(url);
      const db = client.db(DB_NAME);
      const usersCol = db.collection(USER_COLLECTION);
      const options = { projection: { password: 0, "confirm-password": 0 } };
      console.log(`getting user with email ID of ${_email}`);
      const res = await usersCol.findOne({ email: _email }, options);
      console.log("Got user", res);
      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  // //function that creates/updates user profile by email or updates when profile is changed
  // myDB.updateProfile = async (_email, _profile) => {
  //   let client;
  //   try {
  //     client = new MongoClient(url);
  //     const db = client.db(DB_NAME);
  //     const usersCol = db.collection(USER_COLLECTION);
  //     console.log(
  //       `getting user with email ID of ${_email} and updating profile`
  //     );
  //     const res = await usersCol.updateOne(
  //       { email: _email },
  //       { $set: { profile: _profile } }
  //     );
  //     console.log("Profile updated DB 82", res);
  //     return res;
  //   } finally {
  //     console.log("Closing the connection");
  //     client.close();
  //   }
  // };

  // //function that gets user profile
  // myDB.getUserProfile = async (_email) => {
  //   let client;
  //   try {
  //     client = new MongoClient(url);
  //     const db = client.db(DB_NAME);
  //     const usersCol = db.collection(USER_COLLECTION);
  //     const options = {
  //       projection: {
  //         profile: 1,
  //       },
  //     };
  //     console.log(`getting user with email ID of ${_email}`);
  //     const res = await usersCol.findOne({ email: _email }, options);
  //     console.log("Got user profile", res);
  //     return res;
  //   } finally {
  //     console.log("Closing the connection");
  //     client.close();
  //   }
  // };
  //Zihan Xu
  myDB.resetPass = async (newUser) => {
    let client, col;
    try {
      [client, col] = await getCollection(USER_COLLECTION);
      console.log("seraching for", newUser);
      // post request sends a form object that holds a input tag with name of user and a input tag with the name of password
      const res = await col.updateOne(
        { user: newUser.user },
        {
          $set: {
            password: bcrypt.hashSync(newUser.password, bcrypt.genSaltSync())
          }
        }
      );
      console.log("res", res);
    } finally {
      await client.close();
    }
  };

  myDB.deleteUser = async (user) => {
    let client, col;
    try {
      [client, col] = await getCollection(USER_COLLECTION);

      console.log("delete", user);
      await col.deleteOne({ user: user.user });
    } finally {
      await client.close();
    }
  };

  return myDB;
}

export default MyMongoDB();
