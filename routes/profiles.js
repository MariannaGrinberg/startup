const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.uid)
    return res.render('profile', user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error while loading profile!', error })
  }
})

router.get('/results', async (req, res) => {
  try {
    const user = await User.findById(req.user.uid).exec()
    return res.json({ message: 'Success', results: user.quizResults })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error while saving quiz results!', error })
  }
})

router.post('/finishQuiz', async (req, res) => {
  const result = req.body
  console.table(req.body)

  try {
    await User.findByIdAndUpdate(req.user.uid,
      { $push: { quizResults: result } }).exec()
    return res.json({ message: 'Quiz result saved!' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error while saving quiz results!', error })
  }
})

module.exports = router;