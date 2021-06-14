const Users = require('../models/users')

// Global variables
const mainBanner = '/images/banners/Banner MMM-home.png'
const sessionID = '1138596383' // Fake sessionID for now
const heartIcon = '/images/icons/white heart.png'

// get user profiles from database
const usersIndex = (req, res) => {
  Users.find({}).lean()
    .then((result) => {
      if (result === undefined) {
        res.render('home', {
          heartIcon,
          banner: mainBanner
        })
      } else {
        const myProfile = result.find((profile) => profile.id.includes(sessionID))
        const userProfiles = result.filter(
          (user) => !myProfile.likes.includes(user.id) && !myProfile.dislikes.includes(user.id)
        )
        res.render('home', {
          heartIcon,
          banner: mainBanner,
          userProfile: userProfiles[0]
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

// update session user in database
const likeAndMatch = (req, res) => {
  Users.find({}).lean()
    .then(result => {
      if (result === undefined) {
        res.redirect('/')
      } else {
        const myProfile = result.find((profile) => profile.id.includes(sessionID))
        const filtertUserProfiles = result.filter((user) => !myProfile.likes.includes(user.id) && !myProfile.dislikes.includes(user.id))
        const match = filtertUserProfiles[0].likes.includes(sessionID)
        console.log(match)

        if (req.body.like === 'true' && match) {
          Users.updateOne(
            { id: sessionID },
            {
              $push: {
                matches: filtertUserProfiles[0].id,
                likes: filtertUserProfiles[0].id
              }
            })
            .then(
              res.render('newMatch', {
                heartIcon,
                userProfile: filtertUserProfiles[1],
                newMatch: filtertUserProfiles[0],
                banner: mainBanner
              }))
        } else if (req.body.like === 'true') {
          Users.updateOne(
            { id: sessionID },
            {
              $push: {
                likes: filtertUserProfiles[0].id
              }
            })
            .then(res.redirect('/'))
        } else {
          Users.updateOne(
            { id: sessionID },
            {
              $push: {
                dislikes: filtertUserProfiles[0].id
              }
            })
            .then(res.redirect('/'))
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  usersIndex,
  likeAndMatch
}
