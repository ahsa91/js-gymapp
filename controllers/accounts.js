"use strict";

const memberStore = require('../models/member-store');
const trainerStore = require('../models/trainer-store');
const assessmentStore = require('../models/assessment-store');
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup"
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie("member", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const member = request.body;
    member.id = uuid.v1();
    memberStore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect("/");
  },

  authenticate(request, response) {

    // Attempt to login a member. If not found, try trainer
    const member = memberStore.getMemberByEmail(request.body.email.toLowerCase());
    if (member && request.body.password === member.password) {
      logger.info(`logging in ${member.email}`);
      response.cookie('memberid', member.email);

      response.redirect('/dashboard');
    }
    else {
      const trainer = trainerStore.getTrainerByEmail(request.body.email.toLowerCase());
      if (trainer && request.body.password === trainer.password) {
        logger.info(`logging in ${trainer.email}`);
        response.cookie('trainerid', trainer.email);
        response.redirect('/trainerdashboard');
      }
      else {

        response.redirect('/login');
      }
    }
  },

  getCurrentMember(request) {

    const memberEmail = request.cookies.memberid;
    const member = memberStore.getMemberByEmail(memberEmail);
    return member;
  },
  getCurrentTrainer(request) {
    const trainerEmail = request.cookies.trainer;
    return trainerStore.getTrainerByEmail(trainerEmail);
  }
};

module.exports = accounts;