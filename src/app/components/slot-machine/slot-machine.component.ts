import {Component, OnInit} from '@angular/core';
import {SlotMachineService} from '../../services/slot-machine/slot-machine.service';
import {SlotMachineConfig} from '../../models/slot-machine-config';
import {SlotMachineState} from '../../models/slot-machine-state';

@Component({
  selector: 'slot-machine',
  templateUrl: './slot-machine.component.html',
  styleUrls: ['slot-machine.component.sass'],
  providers: [SlotMachineService]
})
export class SlotMachineComponent implements OnInit {
  config: SlotMachineConfig;
  state: SlotMachineState;
  lineBet: number;
  linesCount: number;
  reels: Array<any> = [];

  constructor(private slotMachineService: SlotMachineService) {
    this.lineBet = 0;
    this.linesCount = 1;
  }

  ngOnInit() {
    this.slotMachineService
      .getConfig()
      .subscribe(
        this.processConfig.bind(this));

    // this.slotMachineService
    //   .resetMachine()
    //   .subscribe(this.setState.bind(this));
  }

  spin() {
    this.slotMachineService
      .spin(this.lineBet, this.linesCount)
      .subscribe((state) => {
        this.setState(state);
      });
  }

  increaseLineBet() {
    if (this.lineBet < this.config.maxCoins) {
      this.lineBet++;
    }
  }

  decreaseLineBet() {
    if (this.lineBet > this.config.minCoins) {
      this.lineBet--;
    }
  }

  selectLines() {
    if (this.linesCount < this.config.lines.length) {
      this.linesCount++;
    } else {
      this.linesCount = 1;
    }
  }

  private processConfig(config: SlotMachineConfig) {
    this.config = config;

    if (this.config) {
      this.lineBet = this.config.minCoins;
      for (let i = 0; i < this.config.reels; i++) {
        this.reels.push({});
      }
    }

    this.slotMachineService
      .getState()
      .subscribe(this.setState.bind(this));
  }

  private setState(state) {
    this.state = state;
    for (let i = 0; i < this.reels.length; i++) {
      let reel = this.reels[i];
      let reelSymbols = [];

      for (let symbols of state.symbols) {
        reelSymbols.push(symbols[i]);
      }

      reel.symbols = reelSymbols;
    }
  }
}
