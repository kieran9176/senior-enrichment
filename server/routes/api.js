// 'use strict';
// const api = require('express').Router();
// const db = require('../../db/index');
// const { Campus, Student } = require('../../db/models/index');
//
// // If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
// 	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
// 	// Ideally you would have something to handle this, so if you have time try that out!
// // api.get('/hello', (req, res) => res.send({hello: 'world'}));
//
// // CAMPUSES
// api.param('id', function (req, res, next, id) {
//     Campus.findById(id)
//         .then(function (campus) {
//             if (!campus) throw HttpError(404);
//             req.requestedCampus = campus;
//             next();
//             return null;
//         })
//         .catch(next);
// });
//
// api.get('/campuses', (req, res) => {
//     Campus.findAll()
//         .then(_array => {
//             res.json(_array);
//         });
// });
//
// api.post('/campuses', (req, res) => {
//     Campus.create(req.body)
//         .then(_campus => {
//             res.status(200).json({
//                 message: "Created Successfully",
//                 campus: _campus
//             });
//         })
//         .catch(err => {
//             res.sendStatus(500, err);
//         })
// });
//
// api.put('/campuses/:id', (req, res) => {
//     Campus.findById(req.params.id)
//         .then(_campus => {
//             return _campus.update(req.body, { where: { id: req.params.id }, plain: true })
//         })
//         .then(_campus => {
//             res.status(200).json({
//                 message: "Updated Successfully",
//                 campus: _campus
//             });
//         })
//         .catch(err => {
//             res.sendStatus(500, err);
//         })
// });
//
// api.delete('/campuses/:id', function (req, res, next) {
//     req.requestedCampus.destroy()
//         .then(function () {
//             res.status(204).end();
//         })
//         .catch(next);
// });
//
// // STUDENTS
// api.param('id', function (req, res, next, id) {
//     Student.findById(id)
//         .then(function (student) {
//             if (!student) throw HttpError(404);
//             req.requestedStudent = student;
//             next();
//             return null;
//         })
//         .catch(next);
// });
//
// api.get('/students', (req, res) => {
//     Student.findAll({})
//         .then(_array => {
//             res.json(_array);
//         });
// });
//
// api.post('/students', (req, res) => {
//     Student.create(req.body)
//         .then(_student => {
//             res.status(200).json({
//                 message: "Created Successfully",
//                 student: _student
//             });
//         })
//         .catch(err => {
//             res.sendStatus(500, err);
//         })
// });
//
// api.put('/students/:id', (req, res) => {
//     Student.findById(req.params.id)
//         .then(_student => {
//             return _student.update(req.body, { where: { id: req.params.id }, plain: true })
//         })
//         .then(_student => {
//             res.status(200).json({
//                 message: "Updated Successfully",
//                 student: _student
//             });
//         })
//         .catch(err => {
//             res.sendStatus(500, err);
//         })
// });
//
// api.delete('/students/:id', (req, res) => {
//     Student.destroy({ where: { id: req.params.id }})
//         .then(_student => {
//             res.status(200).json({
//                 message: "Deleted Successfully",
//                 student: _student
//             });
//         })
//         .catch(err => {
//             res.sendStatus(500, err);
//         })
// });
//
// module.exports = api;