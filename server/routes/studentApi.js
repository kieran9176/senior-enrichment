/**
 * Created by kieranderfus on 7/13/17.
 */
'use strict';
const api = require('express').Router();
const db = require('../../db/index');
const { Student } = require('../../db/models/index');

// STUDENTS
api.param('id', function (req, res, next, id) {
    Student.findById(id)
        .then(function (student) {
            if (!student) throw HttpError(404);
            req.requestedStudent = student;
            next();
            return null;
        })
        .catch(next);
});

api.get('/students', (req, res) => {
    Student.findAll({})
        .then(_array => {
            res.json(_array);
        });
});

api.post('/students', (req, res) => {
    Student.create(req.body)
        .then(_student => {
            res.status(200).json({
                message: "Created Successfully",
                student: _student
            });
        })
        .catch(err => {
            res.sendStatus(500, err);
        })
});

api.put('/students/:id', function (req, res, next) {
    req.requestedStudent.update(req.body)
        .then(function (student) {
            res.json(student);
        })
        .catch(next);
});

api.delete('/students/:id', function (req, res, next) {
    req.requestedStudent.destroy()
        .then(function () {
            res.status(204).end();
        })
        .catch(next);
});

module.exports = api;