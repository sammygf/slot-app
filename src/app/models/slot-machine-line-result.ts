export class SlotMachineLineResult {
  lineId: number;
  bet: number;
  win: number;

  constructor(lineId: number, bet: number, win: number) {
    this.lineId = lineId;
    this.bet = bet;
    this.win = win;
  }
}
