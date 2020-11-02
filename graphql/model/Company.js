import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Comapny = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    snackList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Snack`,
      },
    ],
  },

  { versionKey: false }
);

export default mongoose.model(`Company`, Comapny, `Company`);
