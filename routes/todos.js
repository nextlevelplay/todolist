const { Router } = require('express')
const router = Router()
const Todo = require('../models/Todo')

router.get('/', async (req, res) => {
    const todos = await Todo.find({}).lean()
    
    res.render('index', {
    title: 'Tasks list page...',
    isIndex: true,
    todos
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
    title: 'Create a new task page...',
    isCreate: true
    })
})

router.post('/create', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    })
    await todo.save()
    res.redirect('/')
})

router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)

    todo.completed = !!req.body.completed
    await todo.save()

    res.redirect('/')
})

router.post('/delete', async (req, res) => {
    
    const todo = await Todo.findByIdAndDelete(req.body.id)

    res.redirect('/')
})


module.exports = router