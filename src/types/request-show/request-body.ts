export interface RequestBody {
  hash_sum: string
  transaction: string
  amount: number
  description: string
  api_key: string
  email: string
  custom_data: CustomData
}

export interface CustomData {
  initiatorName: string
  duesTitle: string
}