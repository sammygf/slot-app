import {SlotMachineCell} from './slot-machine-cell';

export class SlotMachineLine {
  id: number;
  cells: Array<SlotMachineCell>;

  constructor(id: number, cells: Array<SlotMachineCell>) {
    this.id = id;
    this.cells = cells;
  }
}
