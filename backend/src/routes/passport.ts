// import passport from "passport";
// import User from "../models/User";
// const GitHubStrategy = require("passport-github").Strategy;
//
// passport.serializeUser(async (user, done) => {
//     done(null, user);
// });
//
// passport.deserializeUser(async (id, done) => {
//     const user = await User.findOne({_id: id})
//     return done(null, user)
// });
//
// passport.use(
//     new GitHubStrategy( //GitHub strategy implementation
//         {
//             clientID: "f0bb48553c39a2d19844",
//             clientSecret: "a8718689d2ebfedf377ccc7f86776540f0a778a2",
//             callbackURL: "/auth/github/callback",
//         },
//         async (accessToken:any, refreshToken:any, profile:any, done:any) => {
//             const newUser = {
//                 displayName: profile.username
//             }
//             let user = await User.findOne({githubId: profile.id});
//             if (user) return done(null, user);
//             else {
//                 user = await User.create(newUser); //create user if not exists
//                 return done(null, user);
//             }
//
//         }
//     )
// );
//
// module.exports = passport;