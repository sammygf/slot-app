import {SlotMachineLine} from './slot-machine-line';

export class SlotMachineConfig {
  coinValue: number;
  lines: Array<SlotMachineLine>;
  maxCoins: number;
  minCoins: number;
  reels: number;
  rows: number;

  constructor(coinValue: number, maxCoins: number, minCoins: number, reels: number, rows: number, lines: Array<SlotMachineLine>) {
    this.coinValue = coinValue;
    this.maxCoins = maxCoins;
    this.minCoins = minCoins;
    this.reels = reels;
    this.rows = rows;
    this.lines = lines;
  }
}
