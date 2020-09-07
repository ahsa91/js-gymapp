'use strict';
const logger = require("../utils/logger");
const uuid = require("uuid");
const assessmentStore = require('../models/assessment-store');
const memberStore = require('../models/member-store');

const INCHES_IN_METER = 39.37;
const KILOS_PER_INCH = 2.3;
const HEIGHT_LIMIT = 60;
const TOLERANCE = 0.2;

const analytics = {
  calculateBMI(id) {
    const member = memberStore.getMemberById(id);
    const assessments = assessmentStore.getMemberAssessments(id);
    if(assessments.length===0){
      const bmi= member.startingWeight/((member.height)*(member.height));
      return Math.round(bmi);
    }
    else {
      const bmi = assessments[assessments.length - 1].weight / ((member.height ) * (member.height));
      return Math.round(bmi);
    }
    },

  determineBMICategory(id) {
    const member = memberStore.getMemberById(id);
    const assessments = assessmentStore.getMemberAssessments(id);
    const bmi = this.calculateBMI(id);

    if (bmi < 16) {
      return "SEVERELY UNDERWEIGHT";
    }
    if (bmi >= 16 && bmi < 18.5) {
      return "UNDERWEIGHT";
    }
    if (bmi >= 18.5 && bmi < 25.0) {
      return "NORMAL";
    }
    if (bmi >= 25.0 && bmi < 30.0) {
      return "OVERWEIGHT";
    }
    if (bmi >= 30.0 && bmi < 35.0) {
      return "MODERATELY OBESE";
    }
    if (bmi >= 35.0) {
      return "SEVERELY OBESE";
    }
    return "NORMAL";
  },

  idealBodyWeight(id) {
    const member = memberStore.getMemberById(id);
    const assessments = assessmentStore.getMemberAssessments(id);

    let idealWeight =60;
    let idealBodyWeight="";

    if (member.gender === (("Male") || ("male") || ("m"))) {
      idealWeight = 70;
    } else {
      idealWeight=50;
    }
    if (assessments.length === 0) {
      idealBodyWeight = (member.startingWeight <= (idealWeight+0.2)) && (member.startingWeight >= (idealWeight-0.2));
    }
    else {
      idealBodyWeight = (assessments[assessments.length-1].weight <= (idealWeight+0.2)) && (assessments[assessments.length-1].weight >= (idealWeight-0.2));
    }
    return idealBodyWeight;

  }

   ,

  trend(id){
    const member=memberStore.getMemberById(id);
    const assessments=assessmentStore.getMemberAssessments(id);
    let assessmentTrend="";
    if(assessments.length>1){
      assessmentTrend=assessments[assessments.length-1].weight<assessments[assessments.length-2].weight;
    }
    return assessmentTrend;


  }

}

module.exports = analytics;
