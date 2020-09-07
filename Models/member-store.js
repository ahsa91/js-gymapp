"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const memberStore={
  store: new JsonStore("./models/member-store.json",{
  }),
  collection:"memberCollection",

  getAllMembers() {
    return this.store.findAll(this.collection);
  },

  getMemberById(id){
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMemberByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },

  addMember(member){
    this.store.add(this.collection, member);
    this.store.save();
  },

  removeMember(id){
  const member=this.getMember(id);
  this.store.remove(this.collection, member);
  this.store.save();
  },

  // removeAllMembers(){
  //   this.store.removeAll(this.collection);
  //   this.store.save();
  // },

  addAssessment(id,assessment){
    const member = this.getMember(id);
    member.assessments.push(assessment);
    this.store.save();
  },


  getAssessment(id,assessmentId){
    const member= this.store.findOneBy(this.collection, { id: id });
    const assessments = member.assessments.filter(assessment => assessment.id == assessmentId);
    return assessments[0];
  },

  updateAssessment(assessment, updatedAssessment){
    assessment.weight= updatedAssessment.weight;
    assessment.chest= updatedAssessment.chest;
    assessment.thigh= updatedAssessment.thigh;
    assessment.upperarm= updatedAssessment.upperarm;
    assessment.waist= updatedAssessment.waist;
    assessment.hips= updatedAssessment.hips;

  },

  updateMember(member,updatedMember){
    member.name = updatedMember.name;
    member.email = updatedMember.email;
    member.password = updatedMember.password;
    member.address = updatedMember.address;
    member.gender = updatedMember.gender;
    member.height = updatedMember.height;
    member.startingWeight = updatedMember.startingWeight;
    this.store.save();
  }


};

module.exports= memberStore;