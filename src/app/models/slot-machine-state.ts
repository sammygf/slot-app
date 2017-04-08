import {SlotMachineLineResult} from './slot-machine-line-result';

export class SlotMachineState {
  balance: number;
  gameRoundId: number;
  totalBet: number;
  totalWin: number;
  errorCode: string;
  symbols: Array<Array<string>>;
  lineResults: Array<SlotMachineLineResult>;

  constructor(balance: number,
              gameRoundId: number,
              totalBet: number,
              totalWin: number,
              errorCode: string,
              symbols: Array<Array<string>>,
              lineResults: Array<SlotMachineLineResult>) {

    this.balance = balance;
    this.gameRoundId = gameRoundId;
    this.totalBet = totalBet;
    this.totalWin = totalWin;
    this.errorCode = errorCode;
    this.symbols = symbols;
    this.lineResults = lineResults;
  }
}
