const Account = require('../model/account.model.js');
const Library = require('../model/library.model.js');
const Word = require('../model/word.model.js');
const Chat = require('../model/chat.model.js');


module.exports.index = async (req, res) => {
    try {
        const libraries = await Library.find({ _id: { $in: res.locals.user.library } });
        res.render('your-library', { libraries: libraries });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Error' });
    }
}

module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;
        const library = await Library.findOne({ _id: id });
        const words = await Word.find({ _id: { $in: library.word } });
        res.render('library-detail', { library: library, words: words });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Error' });
    }
}

module.exports.create = (req, res) => {
    res.render('create');
}

module.exports.flashcard = async (req, res) => {
    try {
        const id = req.params.id;
        const library = await Library.findOne({ _id: id });
        const words = await Word.find({ _id: { $in: library.word } });
    
        res.render('flashcard', { library: library, words: words });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Error' });
    }

}

module.exports.quizze = async (req, res) => {
    try{
        const id = req.params.id;
        const library = await Library.findOne({ _id: id });
        const words = await Word.find({ _id: { $in: library.word } });
        res.render('quizze', { library: library, words: words } );
    }
    catch(err){
        console.log(err);
        res.status(400).json({ message: 'Error' });
    }
}

module.exports.createLibrary = async (req, res) => {
    try {
        const library = new Library({
            title: req.body.name,
            description: req.body.description,
            word: []
        });

        const libraryObject = await library.save();
        const account = await Account.findOne({ token: req.cookies.token });

        account.library.push(libraryObject._id);
        await account.save();
        res.redirect('/library');
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Error' });
    }
   
}


module.exports.createWord = async (req, res) => {
    try{
        const id = req.params?.id;
        const library = await Library.findOne({ _id: id });

        const word = new Word({
            word: req.body.word,
            meaning: req.body.meaning,
            image: req.body.imageUrl
        });

        const wordObject = await word.save();

        library.word.push(wordObject._id);
        await library.save();

        res.redirect('/library/detail/' + id);
    }
    catch(err){
        console.log(err);
        res.status(400).json({ message: 'Error' });
    }
}



module.exports.deleteLibrary = async (req, res) => {
    try{
        const id = req.params.id;
        const library = await Library.findOne({ _id: id });

        await Word.deleteMany({ _id: { $in: library.word } });

        const account = await Account.updateOne({ 
            _id: res.locals.user._id
        },{
            $pull: { library: id }
        });

        await Chat.deleteOne({ _id: library.chatId });
        await Library.deleteOne({ _id: id });
        res.redirect('/library');
    }
    catch(err){
        console.log(err);
        res.status(400).json({ message: 'Error' });
    }
}

module.exports.deleteWord = async (req, res) => {
    try{
        const libID = req.params.libID;
        const wordID = req.params.wordID;
        const library = await Library.findOne({ _id: libID });

        await Library.updateOne({ 
            _id: libID
        },{
            $pull: { word: wordID }
        });

        await Word.deleteOne({ _id: wordID });

        res.redirect('/library/detail/' + libID);
    }
    catch(err){
        console.log(err);
        res.status(400).json({ message: 'Error' });
    }
}