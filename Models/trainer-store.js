"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");
const memberStore= require("./member-store");



const trainerStore = {
  store: new JsonStore("./models/trainer-store.json", { users: [] }),
  collection: "trainers",

  getAllTrainers() {
    return this.store.findAll(this.collection);
  },

  addTrainer(trainer) {
    this.store.add(this.collection, trainer);
    this.store.save();
  },

  getTrainerById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getTrainerByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },

  comment(member, comment) {
    member.comment = comment;
    this.store.save();
  }
};

module.exports = trainerStore;
