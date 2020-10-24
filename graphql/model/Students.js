import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Student = new Schema(
  {
    name: {
      type: String,
      requried: true,
    },
    age: {
      type: Number,
      requried: true,
    },
    moblie: {
      type: String,
      requried: true,
    },
    school: {
      type: String,
      requried: true,
    },
    gender: {
      type: String,
      requried: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`Student`, Student, `Student`);
