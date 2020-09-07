"use strict";

const logger = require("../utils/logger");
const memberStore = require('../models/member-store');
const accounts = require ('./accounts');
const uuid = require("uuid");
const assessmentStore = require("../models/assessment-store.js");
const analytics = require('../utils/analytics');



const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInMember=accounts.getCurrentMember(request);
    const viewData = {
      title: "Member Dashboard",
      member:memberStore.getMemberById(loggedInMember.id),
      assessments:assessmentStore.getMemberAssessments(loggedInMember.id).reverse(),
      bmi: analytics.calculateBMI(loggedInMember.id),
      bmiCategory: analytics.determineBMICategory(loggedInMember.id),
      idealBodyWeight:analytics.idealBodyWeight(loggedInMember.id)


    };
    logger.info("Rendering member dashboard by id");
    response.render("dashboard", viewData);
  },

  indexTrainer(request,response){
    logger.info("trainerdashboard rendering");
    const viewData = {
      title:"Trainer Dashboard",
      assessments: assessmentStore.getAllAssessments(),
      members:memberStore.getAllMembers(),
    };
    response.render("trainerdashboard",viewData);
  },

  updateMember(request,response){
    logger.info("Rendering profile view");
    response.render("profile");

  },

  editMember(request, response){
    const memberId = request.params.id;
    const member = accounts.getCurrentMember(memberId);

    const updatedMember={
      name: request.body.name,
      email: request.body.email,
      address: request.body.address,
      gender: request.body.gender,
      password: request.body.password,
      height: request.body.height,
      startingWeight: request.body.startingWeight

    }
    logger.info("updating member");
    memberStore.updateMember(member, updatedMember);
    response.redirect("/dashboard");
  }




};

module.exports = dashboard;
