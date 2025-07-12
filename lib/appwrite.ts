import { CreateUserParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  Query,
} from "react-native-appwrite";
import { ID } from "./../node_modules/react-native-appwrite/src/id";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID, // Replace with your Appwrite project ID
  platform: "com.jsm.foodordering", // Optional: Set the locale for your Appwrite instance
  databaseId: "686af08c0009c1ef20d4",
  userCollectionId: "686af22d0028bac7af87",
};

export const appwriteClient = new Client();

appwriteClient
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(appwriteClient);
export const database = new Databases(appwriteClient);
const avatars = new Avatars(appwriteClient);

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    await SignIn({ email, password });
    // Create a user
    return await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: user.$id,
        name: name,
        email: email,
        avatar: await avatars.getInitialsURL(name, 128),
      }
    );
  } catch (error) {
    throw error;
  }
};

export const AppSignIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error as string;
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    if (!user) {
      throw new Error("User not found");
    }
    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", user.$id)]
    );
    if (!currentUser) {
      throw new Error("User document not found");
    }
    return currentUser.documents[0];
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error as string;
  }
};
