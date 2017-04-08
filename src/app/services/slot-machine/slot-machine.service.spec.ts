import { TestBed, inject } from '@angular/core/testing';

import { SlotMachineService } from './slot-machine.service';

describe('SlotMachineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlotMachineService]
    });
  });

  it('should ...', inject([SlotMachineService], (service: SlotMachineService) => {
    expect(service).toBeTruthy();
  }));
});
