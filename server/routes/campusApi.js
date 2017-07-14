/**
 * Created by kieranderfus on 7/13/17.
 */
'use strict';
const api = require('express').Router();
const db = require('../../db/index');
const { Campus } = require('../../db/models/index');

// CAMPUSES
api.param('id', function (req, res, next, id) {
    Campus.findById(id)
        .then(function (campus) {
            if (!campus) throw HttpError(404);
            req.requestedCampus = campus;
            next();
            return null;
        })
        .catch(next);
});

api.get('/campuses', (req, res) => {
    Campus.findAll()
        .then(_array => {
            res.json(_array);
        });
});

api.post('/campuses', (req, res) => {
    Campus.create(req.body)
        .then(_campus => {
            res.status(200).json({
                message: "Created Successfully",
                campus: _campus
            });
        })
        .catch(err => {
            res.sendStatus(500, err);
        })
});

api.put('/campuses/:id', function (req, res, next) {
    req.requestedCampus.update(req.body)
        .then(function (campus) {
            res.json(campus);
        })
        .catch(next);
});

api.delete('/campuses/:id', function (req, res, next) {
    req.requestedCampus.destroy()
        .then(function () {
            res.status(204).end();
        })
        .catch(next);
});

module.exports = api;