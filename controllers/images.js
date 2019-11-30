const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '1cb617479d8b457b92e624d7f77818c4'
})

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(400).json('unable to work with API')
        })
}

const handleImages = (req, res, db) => {
    const {
        id
    } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => {
            res.status(400).json('unable to get entries')
        })
}

module.exports = {
    handleImages: handleImages,
    handleApiCall: handleApiCall
}