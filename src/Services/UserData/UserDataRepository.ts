import Datastore = require("nedb-promises");
import { Service } from "typedi";
import Client from "../../Domain/Models/Client";
import { api } from "../TaonBackend/services/api";
import LoginData from "../../Domain/Models/LoginData";
import BranchData from "../../Domain/Models/BranchData";

const { sessionData, userData } = require('./config');

@Service()
export default class UserDataRepository {
  sessionData : Datastore
  userData : Datastore

  constructor() {
    this.sessionData = sessionData;
    this.userData = userData;
  }

  async SaveLoginData(data : LoginData) : Promise<void> {
    await this.sessionData.insert(data);
  }

  async Destroy() {
    await this.sessionData.remove({}, { multi: true });
  }

  async GetLoginData() : Promise<LoginData> {
    const data = await this.sessionData.findOne({});
    return data;
  }

  async SaveUserData(userData : BranchData) : Promise<any> {
    await this.userData.insert(userData);
  }
}

