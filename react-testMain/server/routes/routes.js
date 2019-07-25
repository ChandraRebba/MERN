var express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const KData = require('C:/Users/c.rebbapragada/Documents/Project/react-kellogg/react-kellogg/server/model/kdatas');

router.get('/api/kdatas',(req,res) =>{
  KData.find(
    {
      enabled: true
    },
    (err,kdatas)=>{
      if(err){
        res.send(error);
      }
      res.json(kdatas);
    })
    .sort( { updatedAt: -1 });
});

router.post('/api/findKData',function(req,res){
  KData.findOne(
    {
      _id:req.query.idChecked
    }, (err,kdatas)=>{
      if(err){
        res.send(err);
      }
      res.json(kdatas)
    }
  );
});

router.put('/api/kdatas',function(req,res){
  KData.create(
    {
      InterfaceName: req.body.InterfaceName,
      Structure: req.body.Structure,
      ErrorFound: req.body.ErrorFound,
      Analysis: req.body.Analysis,
      ProblemCandidate: req.body.ProblemCandidate,
      enabled: true
    },(err,kdatas)=>{
      if(err){
      res.send(error);
    }
    res.send(kdatas);
  });
});

router.post('/api/deleteKData',function(req,res){
  console.log("POST:"+req.body.InterfaceName);
  KData.updateMany({
    _id :{$in: req.body.InterfaceName}},
    {
      enabled:false
    },
    (err,kdatas)=>{
      if(err){
        res.send(err)
      }
      res.send('success');

  });
});

router.post('/api/updateKData',function(req,res){
  KData.updateOne(
    {_id :{$in: req.body._id}},
    {
      InterfaceName: req.body.InterfaceName,
      Structure: req.body.Structure,
      ErrorFound: req.body.ErrorFound,
      Analysis: req.body.Analysis,
      ProblemCandidate: req.body.ProblemCandidate,
      updatedAt: Date.now()
    },
    {
    upsert: false
  },
        (err,kdatas)=>{
            if( err ){
                res.send(err);
            }
            res.send('success');
        }
    );
});

router.get('/', function(req, res){
    res.render('index')
});
module.exports = router;
