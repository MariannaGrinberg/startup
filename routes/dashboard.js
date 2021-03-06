const express = require("express");
const User = require("../models/user");
const Contact = require("../models/contact");
const Quizzes =  require("../models/quiz");
const router = express.Router();

// for all endpoints starting with /api/dashboard/

router.get('/', async (req, res) => {
 
    const Queries = {
        totalMales : await User.find({ gender: 'male' }).countDocuments(),
        totalFemales : await User.find({ gender: 'female' }).countDocuments(),
        totalUsers : await User.find().countDocuments(),
        totalSolvedQuizes : await User.aggregate( [{
               $group: {
                      _id: { quizname: "$quizResults._id" },
                      count: { $sum: 1 }
                          }
                        }
                        ] ),

        contactCounter : await Contact.find().countDocuments(),
        users : await User.find(),
        userPerMonth : await User.aggregate( [{
              $group: {
                 _id: { $month: "$joinDate" },
                 count: { $sum: 1 }
              }
            }
          ] ) ,

          easyQuestions : await Quizzes.aggregate([
            { $group:
                {
                  _id: "easyQuestions",
                  totalAmount: { $sum:"$easyQuestions" },
                  count: { $sum: 1 }
                }
            }]
       ),
          mediumQuestions : await Quizzes.aggregate([
              { $group:
                  {
                    _id: "mediumQuestions",
                    totalAmount: { $sum:"$mediumQuestions" },
                    count: { $sum: 1 }
                  }
              }]
         ),
         hardQuestions : await Quizzes.aggregate([
          { $group:
              {
                _id: "hardQuestions",
                totalAmount: { $sum:"$hardQuestions" },
                count: { $sum: 1 }
              }
          }]
     ),
        
        

        

    }
    res.json(Queries);
})


module.exports = router;
