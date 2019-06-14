import ApiService from '@/services/api'

class UnikService {
  async find (id) {
    const response = await ApiService.get(`nfts/${id}`)
    return response.data
  }
}

export default new UnikService()
