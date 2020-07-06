const Customers = require('../models').Customers;
const bcrypt   = require('bcrypt')
const jwt      = require('jsonwebtoken');

process.env.SECRET_KEY = 'secret',

module.exports = {
    list(req, res) {
         Customers
          .findAll({
            include: [],
            order: [
              ['createdAt', 'ASC'],
            ],
          })
          .then((cust) => { 
              if(cust.length!==0) {
                res.status(200).json({'status': 'success','data':cust})
             }
              else {
                res.json({'status':'EmptyData'})
            }}
        ).catch((error) => { res.status(400).json(error); });
      },

    add(req, res) {
        const custData = {
            id: req.body.id,
            cust_id: req.body.cust_id,
            name: req.body.name,
            password: req.body.password,
            email:req.body.email
        }
        Customers.findOne({
            where:{
                email:req.body.email 
            }
        }).then((cust)=>{
            if(!cust){
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    custData.password = hash 
                    Customers.create(custData)
                    .then(cust=>{
                        res.json({status:cust.email + 'registered'})
                        .catch(err=>{
                            res.send('error'+ err)
                        })
                    })
                })
            } else {
                res.json({'status':'user already registered'})
            }
        }).catch(err=>{
            res.send(err)
        })
    }, 
    
    update(req, res) {
        return Customers
          .findByPk(req.body.id)      
          .then(cust => {
            if (!cust) {
              return res.status(404).send({
                message: 'Customer Not Found',
              });

            }
            return cust
              .update({
                id:req.body.id || cust.id,
                cust_id: req.body.cust_id || cust.cust_id,
                name: req.body.name || cust.name,
                password: req.body.password ||cust.password,
                email:req.body.email|| cust.email
                
              })
              .then(() => res.status(200).send(cust),)
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
    delete(req, res) {
        return Customers
          .findByPk(req.params.id)
          .then(cust => {
            if (!cust) {
              return res.status(400).send({
                message: 'Customer Not Found', 
              });
            }
            return cust
              .destroy()
              .then(() => res.status(204).send({
                message:'Customer has been deleted'
              }))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },

    login(req,res) {
        Customers.findOne({
            where:{
                email:req.body.email
            }
        }).then((cust=>{
            if(cust){
                if(bcrypt.compareSync(req.body.password, cust.password)){
                    let token = jwt.sign(cust.dataValues, process.env.SECRET_KEY,{
                        expiresIn:1
                    })
                    res.send(token)
                }
            }
            else{
                res.status(400).json({"status":"cust doesnt exist"})
            }
        })).catch(err=>{
            res.status(err).json({"status":"error"})
        })
    }
}
    

