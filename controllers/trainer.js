"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store.js");
const memberStore = require("../models/member-store.js");
const trainerStore = require("../models/trainer-store.js");
const analytics = require('../utils/analytics');

const uuid = require("uuid");

const trainerdashboard = {

  indexTrainer(request,response){
    logger.info("trainerdashboard rendering");
    const viewData = {
      title:"Trainer Dashboard",
      assessments: assessmentStore.getAllAssessments(),
      members:memberStore.getAllMembers(),
    };
    response.render("trainerdashboard",viewData);
  },

  trainerView(request,response){
    logger.info("rendering trainer member dashboard");
    const loggedInTrainer=accounts.getCurrentTrainer(request);
    const member=request.params.id;
    const assessments=assessmentStore.getMemberAssessments(member);
    const viewData={
      title: "Trainer Dashboard",
      trainer: loggedInTrainer,
      member: member,
      name: memberStore.getMemberById(member).name,
      assessments: assessments.reverse(),
      bmi: analytics.calculateBMI(member),
      bmiCategory: analytics.determineBMICategory(member),
      idealWeight: analytics.idealBodyWeight(member)
    }
    response.render("trainerview",viewData);
  
  },

  deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member `);
    memberStore.removeMember(memberId);
    response.redirect("/trainerdashboard");
  },

  comment (request, response){
    const memberId=request.params.id;
    const member= memberStore.getMemberById(memberId);
    const assessmentId=request.params.assessmentid;
    const assessment=assessmentStore.getAssessment(assessmentId);

    const comment={
      comment: request.body.comment
    };
    assessmentStore.comment(assessment,comment);
    response.redirect("/trainerdashboard/"+ member.id+ "/trainerview")

  }


}

module.exports = trainerdashboard;