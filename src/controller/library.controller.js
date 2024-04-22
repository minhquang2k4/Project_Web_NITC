module.exports.index = (req, res) => {
    res.render('your-library');
}

module.exports.detail = (req, res) => {
    res.render('library-detail');
}

module.exports.create = (req, res) => {
    res.render('create');
}

module.exports.flashcard = (req, res) => {
    res.render('flashcard');
}

module.exports.quizze = (req, res) => {
    res.render('quizze');
}