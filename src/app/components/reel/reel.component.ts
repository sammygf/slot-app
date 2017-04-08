import {Component, OnChanges, OnInit, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ReelState} from './reel-state.enum';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'reel',
  templateUrl: './reel.component.html',
  styleUrls: ['./reel.component.sass'],
  animations: [
    trigger('spin-trigger', [
      state(ReelState.INITIAL.toString(), style({
        transform: 'rotateX(0)'
      })),
      state(ReelState.ROTATED.toString(), style({
        transform: 'rotateX(-360deg)'
      })),
      transition(`${ReelState.INITIAL} => ${ReelState.ROTATED}`, animate('2s cubic-bezier(0.3, -0.34, 0.1, 1.08)'))
    ])
  ]
})

export class ReelComponent implements OnChanges, OnInit {
  @Input()
  height: number;
  @Input()
  rowsCount: number;
  @Input()
  symbols: Array<string>;

  radius: number;
  cells: Array<any>;
  state: ReelState;

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.cells = [];
    this.state = ReelState.INITIAL;
    this.radius = this.height * 1.15;

    const cellsOnReelCount = this.rowsCount * 7;
    const cellAngle = 360 / cellsOnReelCount;
    const cellHeight = 105 / this.rowsCount;

    for (let i = 0; i < cellsOnReelCount; i++) {
      const angle = cellAngle * i;
      let transform = `rotateX(-${angle}deg) translateZ(${this.radius}px)`;

      this.cells.push({
        value: this.getRandomInt(0, 2) ? 'A' : 'B',
        height: this.sanitizer.bypassSecurityTrustStyle(`${cellHeight}%`),
        transform: this.sanitizer.bypassSecurityTrustStyle(transform)
      });
    }

    this.spin();
  }

  spinAnimationEnd(event) {
    if (event.toState === ReelState.ROTATED.toString()) {
      this.state = ReelState.INITIAL;
    }
  }

  private spin() {
    this.state = ReelState.ROTATED;

    setTimeout(() => {
      for (let i = 0; i < this.symbols.length; i++) {
        this.cells[i].value = this.symbols[i];
      }
    }, 1000);
  }

  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
