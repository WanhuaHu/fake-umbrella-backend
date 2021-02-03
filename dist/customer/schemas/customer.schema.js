"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSchema = void 0;
const mongoose = require("mongoose");
exports.CustomerSchema = new mongoose.Schema({
    name: String,
    personOfContact: String,
    telephoneNumber: String,
    location: String,
    numberOfEmployees: Number,
});
exports.CustomerSchema.virtual('customerId').get(function () {
    return this._id;
});
exports.CustomerSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id; delete ret.id; }
});
//# sourceMappingURL=customer.schema.js.map