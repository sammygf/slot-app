import {Component, OnChanges, OnInit, Input, SimpleChanges} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {SlotMachineReelState} from './slot-machine-reel-state.enum';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

// There is no possibility to pass param to component 'animations' in current version of angular
const ANIMATION_DURATION = 2;

@Component({
  selector: 'slot-machine-reel',
  templateUrl: './slot-machine-reel.component.html',
  styleUrls: ['./slot-machine-reel.component.sass'],
  animations: [
    trigger('spin-trigger', [
      state(SlotMachineReelState.INITIAL.toString(), style({
        transform: 'rotateX(0)'
      })),
      state(SlotMachineReelState.ROTATED.toString(), style({
        transform: 'rotateX(-360deg)'
      })),
      transition(`${SlotMachineReelState.INITIAL} => ${SlotMachineReelState.ROTATED}`,
        animate(`${ANIMATION_DURATION}s cubic-bezier(0.3, -0.34, 0.1, 1.08)`))
    ])
  ]
})

export class SlotMachineReelComponent implements OnChanges, OnInit {
  @Input()
  height: number;
  @Input()
  rowsCount: number;
  @Input()
  symbols: Array<string>;

  radius: number;
  cells: Array<any>;
  state: SlotMachineReelState;

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.cells = [];
    this.state = SlotMachineReelState.INITIAL;
    this.radius = this.height * 1.15;

    const cellsOnReelCount = this.rowsCount * 7;
    const cellAngle = 360 / cellsOnReelCount;
    const cellHeight = 105 / this.rowsCount;

    for (let i = 0; i < cellsOnReelCount; i++) {
      const angle = cellAngle * i;
      const transform = `rotateX(-${angle}deg) translateZ(${this.radius}px)`;

      this.cells.push({
        value: this.getRandomSymbol(),
        height: this.sanitizer.bypassSecurityTrustStyle(`${cellHeight}%`),
        transform: this.sanitizer.bypassSecurityTrustStyle(transform)
      });
    }

    setTimeout(this.spin.bind(this));
  }

  spinAnimationEnd(event) {
    if (event.toState === SlotMachineReelState.ROTATED.toString()) {
      this.state = SlotMachineReelState.INITIAL;
    }
  }

  private getRandomSymbol() {
    if (this.symbols.length > 0) {
      const index = this.getRandomInt(0, this.symbols.length - 1);
      return this.symbols[index];
    }

    return '-';
  }

  private spin() {
    this.state = SlotMachineReelState.ROTATED;

    setTimeout(() => {
      for (let i = 0; i < this.symbols.length; i++) {
        this.cells[i].value = this.symbols[i];
      }
    }, ANIMATION_DURATION / 2 * 1000);
  }

  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
