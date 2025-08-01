import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/userModel";

// const users: any[] = [];

const authResolvers = {
  Query: {
    me: (_: any, context: any) => {
      return context.user;
    },
  },

  Mutation: {
    signup: async (_: any, { name, email, password }: any) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });
      // console.log(token);
      return {
        token,
        user: {
          id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
        },
      };
    },

    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({email});
      if (!user) {
        throw new Error("User not found!");
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Invalid credentials!");
      }

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d",
        }
      );

      return { token, user:{
        id:user._id,
        name:user.name,
        email:user.email,
      } 
    };
    },
  },
};

export default authResolvers;
