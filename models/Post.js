var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  postDate:{
    type: Date,
    default: Date.now
  }
})



module.exports = mongoose.model('Post',PostSchema);
