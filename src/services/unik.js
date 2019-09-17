import { DIDTypes } from '@uns/ts-sdk'
import { ApiService, TransactionService } from '@/services'

class UnikService {
  async findUnikProperties (unikId) {
    const response = await ApiService.get(`uniks/${unikId}/properties`)
    return response.data
  }

  /*
      Get property value of a UNIK token
      If property does not exist, returns undefined
  */
  async findUnikProperty (unikId, unikProperty) {
    let ret
    try {
      const response = await ApiService.get(`uniks/${unikId}/properties/${unikProperty}`)
      ret = response.data
    } catch (e) {}
    return ret
  }

  async find (id) {
    const response = await ApiService.get(`uniks/${id}`)
    const unik = response.data
    unik.properties = await this.findUnikProperties(id).then(this.formatProperties)
    unik.type = await this.findUnikProperty(unik.id, 'type').then(type => DIDTypes[type])
    unik.creation = await this.extractUnikCreationUnixTimestamp(unik)
    return unik
  }

  async supply () {
    const response = await ApiService.get('uniks')
    return response.meta.totalCount
  }

  extractTypeFromProperties (unik) {
    const typeProperty = unik.properties.find(property => !!property['type'])
    return typeProperty['type']
  }

  async extractUnikCreationUnixTimestamp (unik) {
    return (await TransactionService.find(unik.transactions.first.id)).timestamp.unix
  }

  /*
    Transforms property into an object with 2 properties 'key' and 'value'
    Removes type property
  */
  formatProperties (properties) {
    return properties
      .map(property => {
        const entry = Object.entries(property)[0]
        return {
          key: entry[0],
          value: entry[1]
        }
      })
      .filter(property => property.key !== 'type')
  }
}

export default new UnikService()
