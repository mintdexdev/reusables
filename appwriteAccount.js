import { Client, Account, ID } from "appwrite";
import config from "../config/config.js";
import { session } from './index.js'

// all about account
class AccountService {
  client;
  account;
  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteEndpoint) // Appwrite API Endpoint
      .setProject(config.appwriteProjectId); // Appwrite project ID
    this.account = new Account(this.client);
  }

  async createAccount({ name, email, password, }) {
    try {
      const userAccount = await this.account.create(
        ID.unique, // userId
        email, // email
        password, // password
        name // name (optional) 
      )
      if (userAccount) {
        return this.login({ email, password });
      }
      return userAccount;
    } catch (error) {
      console.log(`Appwrite:createAccount: ${error}`);
      return error;
    }
  }

  async getAccount() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(`Appwrite:getAccount: ${error}`);
    }
    return null;
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(
        email,
        password
      );
    } catch (error) {
      console.log(`Appwrite:login: ${error}`);
    }
  }

  async logout({ }) {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log(`Appwrite:logout: ${error}`);
    }
  }

}

const accountService = new AccountService();
export default accountService;