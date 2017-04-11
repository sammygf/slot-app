import {Injectable, EventEmitter} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {SlotMachineConfig} from '../../models/slot-machine-config';
import {SlotMachineState} from '../../models/slot-machine-state';
import {BackEndService} from '../back-end/back-end.service';
import {BetInfo} from '../../models/bet-info';


@Injectable()
export class SlotMachineService {
  config: SlotMachineConfig;
  state: SlotMachineState;
  betInfo: BetInfo = new BetInfo();
  stateChangeEmitter: EventEmitter<SlotMachineState> = new EventEmitter;
  betInfoChangeEmitter: EventEmitter<BetInfo> = new EventEmitter;

  constructor(private backEndService: BackEndService) {
    this.getConfig().then(this.getState.bind(this));
  }

  getState() {
    return new Promise<SlotMachineState>((resolve, reject) => {
      this.backEndService.getState().subscribe((state) => {
        this.state = state;
        this.stateChangeEmitter.emit(state);
        this.betInfoChangeEmitter.emit(this.betInfo);
        resolve(state);
      }, reject);
    });
  }

  getConfig() {
    return new Promise<SlotMachineConfig>((resolve, reject) => {
      this.backEndService.getConfig().subscribe((config) => {
        this.config = config;
        this.betInfo.lineBet = this.config.minCoins;
        resolve(config);
      }, reject);
    });
  }

  resetMachine() {
    this.backEndService
      .resetMachine()
      .subscribe(this.updateState.bind(this));
  }

  spin() {
    const bet = 1 / this.config.coinValue * this.betInfo.lineBet;
    this.backEndService
      .spin(bet, this.betInfo.linesCount)
      .subscribe(this.updateState.bind(this));
  }

  selectLines() {
    if (this.betInfo.linesCount < this.config.lines.length) {
      this.betInfo.linesCount++;
    } else {
      this.betInfo.linesCount = 1;
    }

    this.betInfoChangeEmitter.emit(this.betInfo);
  }

  betMax() {
    this.betInfo.linesCount = this.config.lines.length;
    this.makeBet(this.config.maxCoins);
  }

  increaseLineBet() {
    this.makeBet(this.betInfo.lineBet + 1);
  }

  decreaseLineBet() {
    this.makeBet(this.betInfo.lineBet - 1);
  }

  stateChanged() {
    return this.stateChangeEmitter;
  }

  betInfoChanged() {
    return this.betInfoChangeEmitter;
  }

  private updateState(state) {
    this.state = state;
    this.stateChangeEmitter.emit(state);
  }

  private makeBet(newBet) {
    if (newBet >= this.config.minCoins && newBet <= this.config.maxCoins) {
      this.betInfo.lineBet = newBet;
    }

    this.betInfoChangeEmitter.emit(this.betInfo);
  }
}
