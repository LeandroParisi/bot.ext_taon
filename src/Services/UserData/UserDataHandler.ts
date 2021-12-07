import readline = require('readline');
import { Service } from "typedi";
import MaxLoginReached from '../Abstractions/Errors/MaxLoginReached';
import BackendError from '../Abstractions/Errors/BackendError';
import TaonRepository from '../TaonBackend/TaonRepository';
import UserDataRepository from "./UserDataRepository";

@Service()
export default class UserDataHandler {
  loginRetries : number

  constructor(
    private readonly repository : UserDataRepository,
    private readonly TaonRepository : TaonRepository
  ) {
    this.loginRetries = 0
  }

  async ValidateUser() : Promise<void> {
    const userData = await this.repository.GetLoginData();

    try {
      if (userData) {
        await this.TaonRepository.ValidateSession(userData.token)
        return
      } else {
        const {email, password} = this.GetUserInfo()
    
        const data = await this.TaonRepository.Login(email, password)
    
        await this.repository.SaveLoginData(data);
      }
    } catch (error) {
      if (this.loginRetries >= 3) {
        throw new MaxLoginReached("Max login retries reached, try logging in again", error)
      }
      if (this.IsBackendError(error)) {
        await this.repository.Destroy();
        this.loginRetries += 1
        // TODO adicionar mensagem de retry no console
        await this.ValidateUser();
      } else {
        throw error
      }
    }
  }

  async LoadInitialData(deviceNumber : number) : Promise<void> {
    const userData = await this.repository.GetLoginData();

    // TODO: Tentar tratar este erro, o catch não funcionou aqui para jogar para o handler global do index    
    const data = await this.TaonRepository.GetInitialData(userData.token, deviceNumber)
    await this.repository.SaveUserData(data)

  }

  GetUserInfo() {
    // TODO: Capturar email e password do usuário

    const email = "user@teste.com"
    const password = "123456"

    return { email, password }

  }

  private IsBackendError(error : BackendError) {
    return error?.status === 401
  }

  // GetUserInfo() {
  //   let email = ""
  //   let password = ""

  //   const rl = readline.createInterface({
  //     input: process.stdin,
  //     output: process.stdout
  //   });
    
  //   rl.question('What is your email? ', (answer) => {
  //     email = answer
  //     rl.close();
  //   });

  //   rl.question('What is your password? ', (answer) => {
  //     password = answer
  //     rl.close();
  //   });

  //   return {email, password}
  // }

  // eslint-disable-next-line class-methods-use-this
  async ErrorCatcher(callback: () => any) {
    try {
      const result = await callback();
      return result;
    } catch (error) {
      // No need to treat error since it's already beeing treated
      // on config/database.onError event listener
      return null;
    }
  }
}
