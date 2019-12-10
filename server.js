const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/accounts', (req, res) => {
    db.select('*').from('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.get('/accounts/:id', (req, res) => {
    const {id} = req.params
  
    db('accounts').where({ id })
    .then(accounts => {
      if (accounts.length) {
        res.status(200).json(accounts)
      } 
      else {
        res.status(404).json({ message: 'Could not find account with given id.' })
      }
     })
    .catch (err => {
      res.status(500).json({ message: 'Failed to get account' });
    });
  });
  

server.post('/accounts', (req, res) => {
    db('accounts').insert(req.body)
    .then(accounts => {
        res.status(201).json(req.body)
    })
    .catch(err => {
        res.status(500).json({message: 'Unable to create account'})
    })

})

server.put('/accounts/:id', (req, res) => {
    const {id} = req.params
    const {name, budget} = req.body
  
    db('accounts').where({ id })
    .update({name, budget})
    .then(accounts => {
        res.status(201).json(accounts)
     })
    .catch (err => {
      res.status(500).json({ message: 'Failed to get account' })
    })
  })


server.delete('/accounts/:id', (req, res) => {
    const {id} = req.params

    db('accounts').where({id}).del()
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        res.status(500).json({errorMessage: "Could not delete account"})
    })

})

module.exports = server;