const fetchN = require('node-fetch')
const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/getQuote', async function(req, res, next) {
    const body = req.body

    const params = {
        method: 'getQuote'
    }

    if (body.format !== undefined) {
        params.format = body.format
    }

    if (body.key !== undefined) {
        params.key = body.key
    }

    try {
        const response = await fetchN('http://api.forismatic.com/api/1.0/', {
            method: 'POST',
            body: new URLSearchParams(params),
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        })

        if (!response.ok) {
            console.log(response)
            return res.status(400).send({error: 'Не удалось получить цитату'})
        }

        if (response.headers.has('content-type')) {
            const contentType = response.headers.get('content-type')
            res.set('content-type', contentType)
        }

        const body = await response.text()

        res.send(body)
    } catch (err) {
        console.error(err)
        return res.status(405).send({error: 'Не удалось получить цитату'})
    }
});

module.exports = router;