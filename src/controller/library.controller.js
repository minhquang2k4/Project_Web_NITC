const Account = require('../model/account.model.js');
const Library = require('../model/library.model.js');
const Word = require('../model/word.model.js');
const mongoose = require('mongoose');


module.exports.index = async (req, res) => {
    // get all libraries of the account
    const libraries = await Library.find({ _id: { $in: res.locals.user.library } });
    res.render('your-library', { libraries: libraries });
}

module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const library = await Library.findOne({ _id: id });
    const words = await Word.find({ _id: { $in: library.word } });
    res.render('library-detail', { library: library, words: words });
}

module.exports.create = (req, res) => {
    res.render('create');
}

module.exports.flashcard = async (req, res) => {
    const id = req.params.id;
    const library = await Library.findOne({ _id: id });
    const words = await Word.find({ _id: { $in: library.word } });

    res.render('flashcard', { library: library, words: words });
}

module.exports.quizze = async (req, res) => {
    const id = req.params.id;
    const library = await Library.findOne({ _id: id });
    const words = await Word.find({ _id: { $in: library.word } });

    res.render('quizze', { library: library, words: words } );
}

module.exports.createLibrary = async (req, res) => {
    // Create a new library
    const library = new Library({
        title: req.body.name,
        description: req.body.description,
        word: []
    });

    // Save the library
    const libraryObject = await library.save();

    // Find the account
    const account = await Account.findOne({ token: req.cookies.token });

    // Add the library to the account
    account.library.push(libraryObject._id);
    await account.save();

    // Redirect to the library
    res.redirect('/library');
}


module.exports.createWord = async (req, res) => {
    // Find the library
    const id = req.params?.id;
    const library = await Library.findOne({ _id: id });

    // Create a new word
    const word = new Word({
        word: req.body.word,
        meaning: req.body.meaning,
        image: req.body.imageUrl
    });

    // Save the word
    const wordObject = await word.save();

    // Add the word to the library
    library.word.push(wordObject._id);
    await library.save();

    // Redirect to the library
    res.redirect('/library/detail/' + id);
}



module.exports.deleteLibrary = async (req, res) => {
    // Get the library ID from the request parameters
    const id = req.params.id;

    // Find the library
    const library = await Library.findOne({ _id: id });

    // Delete all words that belong to the library
    await Word.deleteMany({ _id: { $in: library.word } });

    // Remove the library ID from the account
    const account = await Account.updateOne({ 
        _id: res.locals.user._id
     },{
        $pull: { library: id }
     });

    // Delete the library
    await Library.deleteOne({ _id: id });

    // Redirect to the library page
    res.redirect('/library');
}

module.exports.deleteWord = async (req, res) => {
    // get id
    const libID = req.params.libID;
    const wordID = req.params.wordID;

    // Find the library
    const library = await Library.findOne({ _id: libID });

    // Remove the word ID from the library
    await Library.updateOne({ 
        _id: libID
     },{
        $pull: { word: wordID }
     });

    // Delete the word
    await Word.deleteOne({ _id: wordID });

    // Redirect to the library page
    res.redirect('/library/detail/' + libID);
}