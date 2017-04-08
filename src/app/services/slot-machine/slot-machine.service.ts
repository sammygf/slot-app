import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
import {SlotMachineConfig} from '../../models/slot-machine-config';
import {SlotMachineLine} from '../../models/slot-machine-line';
import {SlotMachineCell} from '../../models/slot-machine-cell';
import {SlotMachineState} from '../../models/slot-machine-state';
import {SlotMachineLineResult} from '../../models/slot-machine-line-result';

@Injectable()
export class SlotMachineService {
  private readonly GET_CONFIG_PATH = '/slot/config';
  private readonly GET_STATE_PATH = '/slot/state';
  private readonly RESET_PATH = '/slot/reset';
  private readonly SPIN_PATH = '/slot/spin';

  constructor(private http: Http) {
  }

  getState() {
    return this.get(this.GET_STATE_PATH, this.deserializeState);
  }

  getConfig() {
    return this.get(this.GET_CONFIG_PATH, this.deserializeConfig);
  }

  resetMachine() {
    return this.get(this.RESET_PATH, this.deserializeState);
  }

  spin(lineBet: number, linesCount: number) {
    return this.get(this.SPIN_PATH, this.deserializeState,
      {
        lineBet: lineBet,
        linesCount: linesCount
      });
  }

  private get(path: string, deserializer, params?) {
    const url = this.trimEndSlash(environment.apiDomain) + path;
    return this.http.get(url, {params: params}).map(res => {
      return deserializer(res.json());
    });
  }

  private deserializeState(json): SlotMachineState {
    const lineResults = [];

    for (const lineResult of json.lineResults) {
      lineResults.push(new SlotMachineLineResult(lineResult.lineId, lineResult.bet, lineResult.win));
    }

    return new SlotMachineState(
      <number>json.balance,
      <number>json.gameRoundId,
      <number>json.totalBet,
      <number>json.totalWin,
      <string>json.errorCode,
      <Array<Array<string>>>json.symbols,
      lineResults
    );
  }

  private deserializeConfig(json): SlotMachineConfig {
    const lines = [];

    for (const line of json.lines) {
      const cells = [];
      for (const cell of line.cells) {
        cells.push(new SlotMachineCell(cell.row, cell.reel));
      }
      lines.push(new SlotMachineLine(line.id, cells));

    }

    return new SlotMachineConfig(
      <number>json.coinValue,
      <number>json.maxCoins,
      <number>json.minCoins,
      <number>json.reels,
      <number>json.rows,
      lines
    );
  }

  private trimEndSlash(url) {
    return url.replace(/\/$/, '');
  }

  // private extractData(res: Response) {
  //   let body = res.json();
  //   return body.data || {};
  // }
  //
  // private handleError(error: Response | any) {
  //   // In a real world app, you might use a remote logging infrastructure
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   console.error(errMsg);
  //   return Observable.throw(errMsg);
  // }
}
