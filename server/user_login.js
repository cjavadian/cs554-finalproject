const redis = require("redis");
const client = redis.createClient();
const bluebird = require("bluebird");
const express = require("express");
const router = express.Router();
const userData = require("./data/user");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


async function getUsers() {

    let userArr = await client.smembersAsync("userNames");
    userNameArr = new Array;
    let userInfo;
    for(let i=0; i< userArr.length; i++) {
        try {
            userInfo = await userData.getUserByEmail(userArr[i]);
            if(userInfo) {
                userNameArr.push(userInfo.user_name);
            }
      }catch(e) {
          console.log(e);
      }  
    }

    return userNameArr;
}

async function pushUser(username) {
    await client.saddAsync("userNames", username);
    return getUsers();
}

async function popUser(username) {
    await client.sremAsync("userNames", username);
    return getUsers();
}

router.post("/userin", async (req, res) => {
    let username = req.body;
    const userList = await pushUser(username.username);
    res.json(userList);
});

router.post("/userout", async (req, res) => {
    let username = req.body;
    const userList = await popUser(username.username);
    res.json(userList);
});

router.get("/userlog", async (req, res) => {
    const userList = await getUsers();
    res.json(userList);
});

module.exports = router;