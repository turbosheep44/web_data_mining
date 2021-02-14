export const PROPERTIES = [
  {
    name: 'Apartment',
    description: 'Central location \n100 m²',
    isRent: true,
    transportCostModifier: 0.5,
    happiness: 0.1,
    price: 0,
  },
  {
    name: 'Penthouse',
    description: 'Central location\n250 m²',
    isRent: true,
    transportCostModifier: 0.4,
    happiness: 0.2,
    price: 0,
  },
  {
    name: 'Apartment',
    description: 'Suburban neighbourhood\n130 m²',
    isRent: true,
    transportCostModifier: 1,
    happiness: 0.15,
    price: 0,
  },
  {
    name: 'Apartment',
    description: 'Quiet neighbourhood\n100 m²',
    isRent: false,
    transportCostModifier: 1,
    happiness: 0.16,
    price: 0,
  },
  {
    name: 'House',
    description: 'Quiet location\n250 m²',
    isRent: false,
    transportCostModifier: 1,
    happiness: 0.1,
    price: 0,
  },
  {
    name: 'Mansion',
    description: 'Beautiful scenery\nFar from town\n500 m²',
    isRent: false,
    transportCostModifier: 1.4,
    happiness: 0.1,
    price: 0,
  },
]

export const LUXURIES = [
  {
    name: 'Television',
    description: 'Watching some good old telly is never boring!',
    tier: 0,
    baseHappiness: 5,
    currentHappiness: 0,
    multiplier: 4,
    basePrice: 0,
  },
  {
    name: 'Pool',
    description: "Who doesn't like to go swimming?",
    tier: 0,
    baseHappiness: 5,
    currentHappiness: 0,
    multiplier: 3,
    basePrice: 0,
  },
  {
    name: 'Computer',
    description: 'These days a personal computer is a necessity.',
    tier: 0,
    baseHappiness: 5,
    currentHappiness: 0,
    multiplier: 2,
    basePrice: 0,
  },
  {
    name: 'Air Conditioning',
    description: 'Nobody likes to feel colder or hotter than usual...',
    tier: 0,
    baseHappiness: 5,
    currentHappiness: 0,
    multiplier: 8,
    basePrice: 0,
  },
  {
    name: 'Coffee Machine',
    description: 'To better wake you up in the morning.',
    tier: 0,
    baseHappiness: 5,
    currentHappiness: 0,
    multiplier: 4,
    basePrice: 0,
  },
]

export const TRANSPORTS = [
  {
    name: 'Walk',
    description: 'Healthy, free way to get to work but takes a lot of time.',
    purchased: true,
    price: 0,
    upkeep: 0,
    time: 1.5,
  },
  {
    name: 'Bicycle',
    description: 'Healthy, fast way to get to work for a small upfront cost.',
    purchased: false,
    price: 100,
    upkeep: 0,
    time: 1,
  },
  {
    name: 'Bus',
    description: 'Faster than using a bike but without the upfront cost of a car.',
    purchased: true,
    price: 0,
    upkeep: 10,
    time: 0.75,
  },
  {
    name: 'Car',
    description: 'Fastest way to get to work but with significant upkeep costs.',
    purchased: false,
    price: 100000,
    upkeep: 100,
    time: 0.5,
  },
]

export const STOCKS = [
  {
    risk: 'Low',
    value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    owned: 0,
    visible: true,
    invested: 0,
  },
  {
    risk: 'Medium',
    value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    owned: 0,
    visible: false,
    invested: 0,
  },
  {
    risk: 'High',
    value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    owned: 0,
    visible: false,
    invested: 0,
  },
]
