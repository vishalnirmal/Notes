const router = require('express').Router();
const auth = require('../middleware/middleware');
const Note = require('../models/notes');

router.post('/addNote', auth, (req, res)=>{
    const {
        title,
        message
    } = req.body;
    const note = new Note({
        user_id: req.user.id,
        title,
        message
    });
    note.save(err=>{
        if (err){
            res.status(400).json(err);
        }
        else{
            res.json({
                message: "Saved"
            });
        }
    });
});

router.delete('/deleteNote', auth, (req, res)=>{
    Note.findByIdAndDelete(req.body.id, (err, notes)=>{
        if (err){
            res.status(400).json(err);
        }
        else{
            res.json({
                message: "Deleted"
            });
        }
    });
});

router.get('/allNotes', auth, (req, res)=>{
    Note.find({user_id: req.user.id}, (err, notes)=>{ 
        res.json(notes);
    });
});

module.exports = router;