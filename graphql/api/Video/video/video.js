import User from "../../../model/User";
import Video from "../../../model/Video";
import mongoose from "mongoose";

export default {
  Query: {
    seeAllVideos: async (_, args) => {
      try {
        const result = await Video.find().populate({
          path: `author`,
          model: User,
        });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    seeDetailVideo: async (_, args) => {
      const { id } = args;

      try {
        const result = await Video.findOne({ _id: id }).populate({
          path: `author`,
          model: User,
        });

        return result;
      } catch (e) {
        console.log(e);
        return {};
      }
    },
    seeVideosByUSer: async (_, args) => {
      const { id } = args;

      try {
        const result = await User.findOne({ _id: id }).populate({
          path: `videos`,
          model: Video,
        });

        return result;
      } catch (e) {
        console.log(e);
        return {};
      }
    },
    searchVideoByTitle: async (_, args) => {
      const { sTitle } = args;

      try {
        const result = await Video.find({
          title: { $regex: `.*${sTitle}.*` },
        }).populate({
          path: `author`,
          model: User,
        });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    uploadVideo: async (_, args) => {
      const { title, description, videoPath, loginEmail, thumbnailPath } = args;

      console.log(title);
      console.log(description);
      console.log(videoPath);

      // 데이터를 Video 라는 스키마에 추가
      // 추가된 비디오의 _id 값을 사용자의 videos 안에 넣어주어야 함

      try {
        const user = await User.findOne({ email: loginEmail });

        const author = mongoose.Types.ObjectId(user._id);

        const uploaded = await Video.create({
          thumbnailPath,
          title,
          description,
          videoPath,
          author,
          hit: parseInt(0),
          createdAt: new Date().toString(),
        });

        const newObId = mongoose.Types.ObjectId(uploaded._id);

        user.videos.push(newObId);
        user.save();

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }

      return true;
    },
  },
};
