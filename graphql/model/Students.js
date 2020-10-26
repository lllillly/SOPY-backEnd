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
    mobile: {
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
    lecture: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Lecture`,
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`Student`, Student, `Student`);
