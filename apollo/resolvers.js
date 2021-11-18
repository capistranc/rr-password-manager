import { AuthenticationError, UserInputError } from "apollo-server-micro";
import {
  createUser,
  findUser,
  getUserById,
  validatePassword,
} from "../lib/user";
import {
  addAccount,
  updateAccount,
  deleteAccount,
  getAccounts,
} from "../lib/accounts";
import { setLoginSession, getLoginSession } from "../lib/auth";
import { removeTokenCookie } from "../lib/auth-cookies";

/**
 * IMPORT!!!!
 * You must add the schema/typeDef for the resolver before adding it or you will receive an
 * extremely nebulous "Unexpected token < in JSON at position 0" Error.
 */
export const resolvers = {
  Query: {
    async viewer(_parent, _args, context, _info) {
      try {
        const session = await getLoginSession(context.req);

        if (session) {
          return findUser({ email: session.email });
        }
      } catch (error) {
        throw new AuthenticationError(
          "Authentication token is invalid, please log in",
        );
      }
    },
    async user(_parent, args, _context, _info) {
      try {
        const user = await getUserById({ userId: args.userId });
        return user;
      } catch (error) {
        console.log("resolver", error);
      }
    },

    /* For Security Reasons I would like to  grab userID from their token rather than explicitly 
     passing in the userID. (User's shouldn't be allowed to access each others accounts)
     But for the sake of QA and testing through graphQL, I'm passing in the userID explicitly
     */
    async accounts(_parent, args, context, _info) {
      try {
        // const { userId } = await getLoginSession(context.req);

        const accounts = await getAccounts({ userId: args.userId });

        return accounts;
      } catch (error) {
        console.log("resolver", error);
      }
    },
  },
  Mutation: {
    async addAccount(_parent, args, _context, _info) {
      try {
        console.log("resolver args", args.input);
        const account = await addAccount({ ...args.input });

        console.log("resolvers/addAccount/", account);
        return account;
      } catch (e) {
        console.log("RESOLVER ERROR", e);
        throw new UserInputError("Invalid Field", e);
      }
    },
    async updateAccount(_parent, args, _context, _info) {
      try {
        console.log("resolver args", args.input);
        const result = await updateAccount(args.input);

        return result;
      } catch (e) {
        console.log("RESOLVER ERROR", e);
        throw new UserInputError("Invalid Field", e);
      }
    },
    async deleteAccount(_parent, args, _context, _info) {
      try {
        console.log("resolver args", args.input);
        const account = await deleteAccount(args.input);

        console.log("resolvers/deleteAccount/", account);
        return account;
      } catch (e) {
        console.log("RESOLVER ERROR", e);
        throw new UserInputError("Invalid Field", e);
      }
    },

    async signUp(_parent, args, _context, _info) {
      try {
        const user = await createUser(args.input);

        console.log("resolvers/SIGN UP/", user);
        return { user };
      } catch (e) {
        console.log("RESOLVER ERROR");
        console.log(e);
        throw new UserInputError("Invalid Field", e);
      }
    },
    async signIn(_parent, args, context, _info) {
      const user = await findUser({ email: args.input.email });

      if (user && (await validatePassword(user, args.input.password))) {
        /* user IV is the private key used for encrypting their passwords
          We pass this along as a sealed token in their session headers

          
        */
        const session = {
          userId: user.userId,
          email: user.email,
          iv: user.iv,
        };

        console.log("resolvers/SIGN IN/", user);
        console.log(session);
        await setLoginSession(context.res, session);

        return { user };
      }

      throw new UserInputError("Invalid email and password combination");
    },
    async signOut(_parent, _args, context, _info) {
      removeTokenCookie(context.res);
      return true;
    },
  },
};
