import { niftyFifty } from "./nifty0-100.js";
import { niftyMidCap } from "./niftyMidCap0-100.js";

export const sortedData = [...niftyFifty, ...niftyMidCap].sort((a, b) => {
  return a.name.localeCompare(b.name);
});

export const data = [...niftyFifty, ...niftyMidCap];
