import User from "../../../model/User";
import { generateSecretCode } from "../../../../src/words";
import nodemailer from "nodemailer";
import smtpPool from "nodemailer-smtp-pool";

export default {
  Mutation: {
    createUser: async (_, args) => {
      const { email, name, mobile } = args; /* 구조분해할당 */

      try {
        const result = await User.create({
          email,
          name,
          mobile,
          secretCode: "",
          createdAt: new Date().toString(),
        });

        console.log("Congraturation!");
        console.log(result);

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    loginUser: async (_, args) => {
      const { email } = args;

      try {
        const result = await User.findOne({ email });

        if (!result) {
          return false;
        } else {
          // secretCode 생성
          const secret = generateSecretCode();

          const smtpTransport = nodemailer.createTransport(
            smtpPool({
              service: "Gmail",
              host: "localhost",
              port: "465",
              tls: {
                rejectUnauthorize: false,
              },

              auth: {
                user: "4leaf.ysh@gmail.com",
                pass: "nvpdqofovkebects",
              },
              maxConnections: 5,
              maxMessages: 10,
            })
          );
          // secretCode를 사용자 이메일로 전송

          let mailOpt = {
            from: "4leaf@software.com",
            to: result.email,
            subject: `🔐 Your Secret Code In SOFY Application`,
            html: `<h2> Welcome! Login To SOPY App! </h2> <p> Your SecretCodes are <strong>[${secret}]</strong>. </p> <p> To Do Copy And Paste In SOPY App! </p>`,
          };

          await smtpTransport.sendMail(mailOpt, function (err, info) {
            if (err) {
              console.error("Send Mail error : ", err);
              //smtpTransport.close();
            } else {
              console.log("Message sent : ", info);
              //smtpTransport.close();
            }
          });

          // secretCode를 현재 검색 된 사용자 DB에 추가
          const final = await User.updateOne(
            { email },
            {
              $set: {
                secretCode: secret,
              },
            }
          );

          return true;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    comfirmSecret: async (_, args) => {
      const { secret, email } = args;

      try {
        const loginUser = await User.findOne({
          email,
          secretCode: secret,
        });

        if (!loginUser) {
          throw new Error("Failed To Login!");
        } else {
          await User.updateOne(
            { email },
            {
              $set: {
                secretCode: "",
              },
            }
          );
          return loginUser;
        }
      } catch (e) {
        console.log(e);
        return {};
      }
    },
  },
};
