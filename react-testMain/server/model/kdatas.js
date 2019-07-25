var mongoose=require('mongoose');

var KDataSchema= new mongoose.Schema({
  InterfaceName: String,
  Structure: String,
  ErrorFound: String,
  Analysis: String,
  ProblemCandidate: String,
  enabled: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
});

module.exports=mongoose.model('kdatas',KDataSchema,'kdatas');
