"use strict";

const express = require("express");
const router = express.Router();
const assessments = require('./controllers/assessments.js');

const accounts = require("./controllers/accounts.js");
const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const trainer = require("./controllers/trainer");

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get("/", dashboard.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/trainerabout", about.trainerAbout);

router.get("/trainerdashboard",trainer.indexTrainer);

// router.get('/member/:id', dashboard.trainerdashboard);
// router.get("/trainerdashboard/deletemember/:id", trainer.deleteMember)
router.get('/dashboard/deleteassessment/:id/trainerview', assessments.deleteAssessment);
router.post('/dashboard/addassessment', assessments.addAssessment);
router.get("/trainerdashboard/:id/trainerview", trainer.trainerView);
router.get("/profile", dashboard.updateMember);
router.post("/dashboard/edit", dashboard.editMember);

router.post("/trainerview/:id/comment/:assessmentid", trainer.addComment);


module.exports = router;
