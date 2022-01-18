import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private message : NzMessageService) { }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
}
