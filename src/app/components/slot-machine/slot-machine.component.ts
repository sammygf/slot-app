import {Component, OnInit} from '@angular/core';
import {SlotMachineService} from '../../services/slot-machine/slot-machine.service';
import {SlotMachineConfig} from '../../models/slot-machine-config';
import {SlotMachineState} from '../../models/slot-machine-state';
import {BetInfo} from '../../models/bet-info';

@Component({
  selector: 'slot-machine',
  templateUrl: './slot-machine.component.html',
  styleUrls: ['slot-machine.component.sass'],
  providers: [SlotMachineService]
})
export class SlotMachineComponent implements OnInit {
  config: SlotMachineConfig;
  state: SlotMachineState;
  betInfo: BetInfo;
  reels: Array<any> = [];

  constructor(private slotMachineService: SlotMachineService) {
    this.slotMachineService.stateChanged().subscribe(this.updateState.bind(this));
    this.slotMachineService.betInfoChanged().subscribe(this.updateBetInfo.bind(this));
  }

  ngOnInit() {
    this.slotMachineService
      .getConfig()
      .then(this.processConfig.bind(this));
  }

  betMax() {
    this.slotMachineService.betMax();
  }

  spin() {
    this.slotMachineService.spin();
  }

  increaseLineBet() {
    this.slotMachineService.increaseLineBet();
  }

  decreaseLineBet() {
    this.slotMachineService.decreaseLineBet();
  }

  selectLines() {
    this.slotMachineService.selectLines();
  }

  private processConfig(config: SlotMachineConfig) {
    this.config = config;

    if (this.config) {
      for (let i = 0; i < this.config.reels; i++) {
        this.reels.push({});
      }
    }
  }

  private updateBetInfo(betInfo: BetInfo) {
    this.betInfo = betInfo;
  }

  private updateState(state: SlotMachineState) {
    this.state = state;

    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      const reelSymbols = [];

      for (const symbols of state.symbols) {
        reelSymbols.push(symbols[i]);
      }

      reel.symbols = reelSymbols;
    }
  }
}
