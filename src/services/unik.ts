import { DIDTypes, UNSClient } from "@uns/ts-sdk";
import { ApiService, TransactionService } from "@/services";
import { IUnik } from "@/interfaces";
import { getPropertyValueFromUnik } from "@/utils/unik-utils";

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

  /*
      Get property value of a UNIK token
      If property does not exist, returns undefined
  */
  public async findUnikProperty(unikId, unikProperty) {
    let ret;
    const response = await ApiService.get(`uniks/${unikId}/properties/${unikProperty}`);
    ret = response.data;
    return ret;
  }

  public async find(id): Promise<IUnik> {
    const response = await ApiService.get(`uniks/${id}`);
    const unik = response.data;
    unik.properties = await this.findUnikProperties(id).then(this.formatProperties);
    unik.defaultExplicitValue = getPropertyValueFromUnik(unik, "explicitValues");
    unik.type = await this.findUnikProperty(unik.id, "type").then(type => DIDTypes[type]);
    unik.creation = await this.extractUnikCreationUnixTimestamp(unik);
    return unik;
  }

  public async supply(): Promise<number> {
    const response = await ApiService.get("uniks?limit=1");
    return response.meta.totalCount;
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
