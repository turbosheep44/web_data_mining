import { Store, Event } from '@/store'

const CRASH_CAR = new Event({
  text: 'You have crashed your car and will need to pay your insurance excess of €250 or use a different mode of transport.',
  checkPrerequisites: ($store: Store) => {
    // must own a car and be using it
    return $store.transport == 3 && $store.transports[3].purchased
  },
  actions: [
    {
      text: 'Pay Excess',
      tooltip: 'Pay 10% the value of your car to repair it.',
      callback: ($store: Store) => {
        // pay 10% of the value of the car as excess
        $store.money -= Math.ceil($store.transports[3].price / 10)
      },
    },
    {
      text: 'Use Other Transport',
      tooltip: 'If you own a bicycle then you will use it, otherwise you will walk to work.',
      callback: ($store: Store) => {
        if ($store.transports[1].purchased) $store.transport = 1
        else $store.transport = 0
      },
    },
  ],
  effects: { happiness: -5 },
  isBarrierDismissable: false,
})

const FIRED = new Event({
  text: 'The company you were working for has declared bankrupcy so you have lost your job!',
  checkPrerequisites: ($store: Store) => $store.isEmployed(), // must be employed
  effects: { happiness: -10 },
  callback($store: Store) {
    $store.job = { title: 'Unemployed', wage: 0, hours: 0 }
    const workActivity = $store.activities.findIndex(act => act.name == 'Work')
    $store.activities.splice(workActivity, 1)
  },
  isBarrierDismissable: true,
})

const RELATIVE_DIED = new Event({
  text: 'A relative has died and you were mentioned in the will.',
  effects: { money: 100 * (Math.floor(Math.random() * 10) + 1) },
  isBarrierDismissable: true,
})

const WEDDING = new Event({
  text: "You have been invited to a friend's wedding. The event will be fun but you will need to buy a gift and a new suit.",
  effects: { money: -10 * (Math.floor(Math.random() * 40) + 10), happiness: 10 },
  isBarrierDismissable: true,
})

const STOCK_MARKET_CRASH = new Event({
  text: 'The stock market has crashed and your shares are now worthless!',
  effects: {},
  callback: ($store: Store) => {
    $store.stocks.forEach(stock => {
      stock.owned = 0
      stock.invested = 0
    })
  },
  isBarrierDismissable: true,
  checkPrerequisites: ($store: Store) => {
    // must own at least one stock for this to matter
    return $store.stocks.findIndex(stock => stock.owned != 0) != -1
  },
})

const ONLINE_SCAM = new Event({
  text:
    'Your credit card details were leaked online and someone used your card without you knowing. You can accept the loss or try to file a claim with your credit card company to get your money back.',
  effects: { money: -800, happiness: -3 },
  isBarrierDismissable: false,
  actions: [
    { text: 'Do Nothing', tooltip: 'Accept the loss and move on.' },
    {
      text: 'File a Claim',
      tooltip: 'Pay a fee of €100 to file a claim with your credit card company. If you succeed you will get your money back.',
      callback: ($store: Store) => {
        $store.money -= 100
        if (Math.random() > 0.5)
          $store.events.$emit(
            'event',
            new Event({ text: 'Claim successful! You are reimbursed with the stolen money.', effects: { money: 800 }, isBarrierDismissable: true })
          )
        else
          $store.events.$emit(
            'event',
            new Event({ text: 'Claim unsuccessful! You are frustrated by customer service officials.', effects: { happiness: -2 }, isBarrierDismissable: true })
          )
      },
    },
  ],
})

const EVENTS = [CRASH_CAR, FIRED, RELATIVE_DIED, WEDDING, STOCK_MARKET_CRASH, ONLINE_SCAM]

export function randomEvent($store: Store, chance: number = 12) {
  // most months there is no random event
  if (Math.floor(Math.random() * chance) != 0) return

  // choose a random event and emit it
  const valid = () => true
  const VALID_EVENTS = EVENTS.filter(e => (e.checkPrerequisites || valid)($store))

  if (VALID_EVENTS.length == 0) {
    console.log('no valid events')
    return
  }

  $store.events.$emit('event', VALID_EVENTS[Math.floor(Math.random() * VALID_EVENTS.length)])
}
