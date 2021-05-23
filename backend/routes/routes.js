const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId

const Employee = require('../models/employee.js');

// Api
// Base Path: http://localhost:3000/employees


// Get employees
router.get('/', (req, res) => {
    Employee.find( (err, doc) => {
        if(err){
            console.log("Error..occured "+ err);
        }else{
            res.send(doc);
        }
    })
})

// Get single employee
router.get('/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)){
        Employee.findById(req.params.id, (err, doc) => {
            if(err){
                console.log("Error..occured "+ err);
            }else{
                res.send(doc);
            }
        })
    }else{
        res.status(400).send("No user found");
    }
})


// Add employee
router.post('/', (req, res) => {
    let emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        dept: req.body.dept
    });

    emp.save( (err, doc) => {
        if(err){
            console.log("Error..occured "+ err);
        }else{
            res.send(doc);
        }
    })
})


// update employee
router.put('/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)){

        let emp = {
            name: req.body.name,
            position: req.body.position,
            dept: req.body.dept  
        };

        Employee.findByIdAndUpdate(req.params.id, {$set: emp}, {new: true}, (err, doc) => {
            if(err){
                console.log("Error..occured "+ err);
            }else{
                res.send(doc);
            }
        })
    }else{
        res.status(400).send("No user found");
    }
})


// delete employee
router.delete('/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)){
        Employee.findByIdAndRemove(req.params.id, (err, doc) => {
            if(err){
                console.log("Error..occured "+ err);
            }else{
                res.send(doc);
            }
        })
    }else{
        res.status(400).send("No user found");
    }
})

module.exports = router;