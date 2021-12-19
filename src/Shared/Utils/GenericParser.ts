
interface params {
  decimal? : boolean
  price : number
}

export default class GenericParser {
  public static FormatPrice = (
    {
      price,
      decimal = false 
    } : params
  ) => {
    if (decimal) return `R$ ${Number(price).toFixed(2)}`
    return `R$ ${Number(price)}`
  }
  
  
}