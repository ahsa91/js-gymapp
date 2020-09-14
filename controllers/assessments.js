"use strict";

const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = require('./accounts');
const assessmentStore = require('../models/assessment-store');
const memberStore = require('../models/member-store');
const analytics = require('../utils/analytics');


const assessment = {

  addAssessment(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);

    const newAssessment = {
      id: loggedInMember.id,
      memberId: uuid.v1(),
      date: new Date().toUTCString(),
      weight: Number(request.body.weight),
      chest: Number(request.body.chest),
      thigh: Number(request.body.thigh),
      upperArm: Number(request.body.upperArm),
      waist: Number(request.body.waist),
      hips: Number(request.body.hips)
    };
    logger.debug("Adding  Assessment", newAssessment);
    assessmentStore.addAssessment(newAssessment);
    response.redirect("/dashboard");
  },

  deleteAssessment(request, response) {

    const assessmentId=request.params.id;
    logger.debug(`Deleting Assessment `);
    assessmentStore.removeAssessment(assessmentId);
    response.redirect("/dashboard");
  },


  editComment(request, response) {

    const comment = request.body;
    comment.id = request.params.id;
    assessmentStore.editComment(comment);
    response.redirect('/dashboard')

  },


};

module.exports = assessment;