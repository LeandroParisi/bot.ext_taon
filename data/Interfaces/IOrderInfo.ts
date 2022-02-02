export default interface IOrderInfo {
  branchId : string
  customerId : string
  addressId? : string
  orderNumber : number
  subTotal : number
  deliveryTypeId? : number
  deliveryFee : number
  paymentMethodId? : number
  discount : number
  totalPrice : number
  status : string
  coupomId : number
  promotionId?: number;
  estimatedDeliveryTime : string
  comments : string
  dispatchTime : Date
  deliveryTime : Date
}