import ApiService from '@/services/api'

class UnikService {
  async find (id) {
    const response = await ApiService.get(`nfts/${id}`)
    return response.data
  }

  async supply () {
    const response = await ApiService.get('nfts')
    return response.meta.totalCount
  }
}

export default new UnikService()
