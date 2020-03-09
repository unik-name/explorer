import { DIDTypes, UNSClient, Unik } from "@uns/ts-sdk";
import { TransactionService } from "@/services";
import { IUnik, IUnikProperties } from "@/interfaces";

export class UnikService {

  public unsClient: UNSClient;

  constructor() {
    this.unsClient = new UNSClient();
    const network = require(`../../networks/${process.env.VUE_APP_EXPLORER_CONFIG}`);
    this.unsClient.init({
          network: network.alias.toLowerCase(),
      });
  }

  public async findUnikProperties(unikId) {
    const response = await this.unsClient.unik.properties(unikId);
    return response.data;
  }

  public async find(id): Promise<IUnik> {
    const response = await this.unsClient.unik.get(id);
    const unik: Unik = response.data;

    return {
      ...unik,
      properties: (await this.findUnikProperties(id).then(this.formatProperties)) as IUnikProperties[],
      type: DIDTypes[unik.type],
      creation: await this.extractUnikCreationUnixTimestamp(unik),
    }
  }

  public async getUniks(unikIds: string[]): Promise<Unik[]> {
    const uniksResponse = await this.unsClient.unik.getUniks(unikIds);
    return uniksResponse.data;
  }

  public async supply(): Promise<number> {
    return await this.unsClient.unik.totalCount();
  }

  public async extractUnikCreationUnixTimestamp(unik: IUnik): Promise<number> {
    return (await TransactionService.find(unik.transactions.first.id)).timestamp.unix;
  }

  /*
    Transforms property into an object with 2 properties 'key' and 'value'
    Removes type property
  */
  public formatProperties(properties): void {
    return properties
      .map(property => {
        const entry = Object.entries(property)[0];
        return {
          key: entry[0],
          value: entry[1],
        };
      })
      .filter(property => property.key !== "type");
  }

}

export default new UnikService();
