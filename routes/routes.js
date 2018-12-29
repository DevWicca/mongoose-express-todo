const router = require('express').Router();
const Todo = require('../models/todo');
const mongoose = require('mongoose');




router.get('/',(req ,res ,next)=>{
    Todo.find({}).then((result)=>{
        let todos = result.filter((todo) => {
            return !todo.done;
        });

        let doneTodos = result.filter((todo) => {
            return todo.done;
        });

        res.render('index',{todos : todos ,doneTodos:doneTodos})
        // res.status(200).json({
        //     result:result
        // })
     
    })
});


router.post('/todos',(req ,res ,next)=>{
   const newTodo = new Todo({
    _id: new mongoose.Types.ObjectId(),
    description: req.body.description
    })
    newTodo.save()
    .then((result)=>{ 
        console.log(result)
    })
    .catch(err => {
        res.status(500).json({
            message : 'to do is required',
            error:err
        })
    })
    res.redirect('/')
});


router.post('/todos/:id/completed',(req ,res ,next)=>{
    const id =req.params.id
    Todo.findById(id)
    .exec()
    .then(result => {
        result.done = !result.done;
        return result.save()
    })
     res.redirect('/')
 });





 /////////////this for postman
router.delete('/:tods', (req, res, next) => {
    const id = req.params.tods;
    Todo.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'todo deleted',
            
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err})
    })
});




router.get('/all',(req ,res ,next)=>{
    Todo.find({})
    .exec()
    .then(result => {
        res.status(200).json({
            result: result
            
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err})
    })
});
module.exports = router;