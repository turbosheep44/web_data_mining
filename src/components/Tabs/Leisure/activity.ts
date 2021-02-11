export interface Activity {
  name: string
  cost: number
  time: number
  happiness: number

  relocationKey?: string
  priceMultiplier?: number
}
