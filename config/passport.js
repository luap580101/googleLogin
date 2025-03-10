const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user-model");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  console.log("Serialize使用者。。。");
  done(null, user._id); // 將mongoDB的id，存在session， 存入Cookie
});

passport.deserializeUser(async (_id, done) => {
  console.log(
    "Deserialize使用者。。。使用serializeUser儲存的id，去找到資料庫內的資料"
  );
  let foundUser = await User.findOne({ _id });
  done(null, foundUser); // 將req.user這個屬性設定為foundUser
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("Google strategy");
      // console.log("Google profile:", profile);
      console.log("=====================");
      const foundUser = await User.findOne({ googleID: profile.id }).exec();
      if (foundUser) {
        console.log("已註冊");
        done(null, foundUser);
      } else {
        console.log("新用戶，需寫入資料庫");
        const newUser = new User({
          name: profile.displayName,
          googleID: profile.id,
          thumbnail: profile.photos[0].value,
          email: profile.emails[0].value,
        });
        const savedUser = await newUser.save();
        // console.log("建立成功");
        done(null, savedUser);
      }
    }
  )
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    let foundUser = await User.findOne({ email: username });
    if (foundUser) {
      let result = await bcrypt.compare(password, foundUser.password);
      if (result) {
        done(null, foundUser);
      } else {
        done(null, false);
      }
    } else {
      done(null, false);
    }
  })
);
