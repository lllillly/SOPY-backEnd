import User from "../../../model/User";
import Video from "../../../model/Video";
import mongoose from "mongoose";

export default {
  Mutation: {
    uploadVideo: async (_, args) => {
      const { title, description, videoPath, loginEmail } = args;

      console.log(title);
      console.log(description);
      console.log(videoPath);

      // 데이터를 Video 라는 스키마에 추가
      try {
        const uploaded = await Video.create({
          title,
          description,
          videoPath,
          hit: parseInt(0),
          createdAt: new Date().toString(),
        });

        const newObId = mongoose.Types.ObjectId(uploaded._id);

        const user = await User.findOne({ email: loginEmail });
        user.videos.push(newObId);
        user.save();

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }

      // 추가된 비디오의 _id 값을 사용자의 videos 안에 넣어주어야 함

      return true;
    },
  },
};
