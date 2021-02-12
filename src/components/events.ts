import { Store, Event } from '@/store'

const CRASH_CAR = new Event({
  text: 'You have crashed your car and will need to pay your insurance excess of €250 or use a different mode of transport.',
  actions: [
    { text: 'Pay Excess', callback: () => console.log('pay excess') },
    { text: 'Use Bus', callback: () => console.log('use bus') },
  ],
  effects: { happiness: -5, money: 150 },
  isBarrierDismissable: false,
})

const FIRED = new Event({
  text: 'The compnay you were working for has declared bankrupcy so you have lost your job!',
  effects: { happiness: -10 },
  isBarrierDismissable: true,
})

const EVENTS = [CRASH_CAR, FIRED]

export function randomEvent($store: Store) {
  // console.log('random event time')
  // console.log($store.income)

  const abc = EVENTS[0].text + $store.country // THIS IS GARBAGE JUST TO MAKE THE COMPILER STOP COMPLAINING
  if (abc == '') console.log('bnanana')
}
