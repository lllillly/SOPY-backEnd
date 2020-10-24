import Student from "../../../model/Students";

export default {
  Query: {
    getAllStudents: async (_, args) => {
      try {
        const result = await Student.find({}, {});

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },
};
