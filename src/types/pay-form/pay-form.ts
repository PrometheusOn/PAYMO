export interface PayForm {
  cardNumber: string
  expirationDate: string
  cvv: string
  amount: number | null
  senderName: string
  description: string
  transaction: string
}