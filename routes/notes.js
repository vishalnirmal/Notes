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
            res.json(err);
        }
        else{
            res.sendStatus(200);
        }
    });
});

router.delete('/deleteNote/:note_id', auth, (req, res)=>{
    Note.findByIdAndDelete(req.params.note_id, (err, notes)=>{
        if (err){
            res.json(err);
        }
        else{
            res.sendStatus(200);
        }
    });
});

router.get('/allNotes', auth, (req, res)=>{
    Note.find({user_id: req.user.id}, (err, notes)=>{
        res.json(notes);
    });
});

module.exports = router;