import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Section } from '../../app/interfece';

@Injectable({
  providedIn: 'root'
})
export class SectionManageService {

  constructor() { }

  private readonly _section = new BehaviorSubject<Section>({
    id : 0,
    name : "",
    data : "",
    level : 0,
    document : 0
  });
  section$ = this._section.asObservable();

  get section(): Section {
    return this._section.getValue();
  }

  private set section(val: Section) {
    this._section.next(val);
  }

  sectionSelection(sect : Section) {
    this.section = sect;
  }

  private readonly _preview = new BehaviorSubject<boolean>(false);
  preview$ = this._preview.asObservable();
  get preview(): boolean {
    return this._preview.getValue();
  }

  private set preview(val: boolean) {
    this._preview.next(val);
  }

  setPreview(sect : boolean) {
    this.preview = sect;
  }

  private readonly _download = new BehaviorSubject<boolean>(false);
  download$ = this._download.asObservable();
  get download(): boolean {
    return this._download.getValue();
  }

  private set download(val: boolean) {
    this._download.next(val);
  }

  setDownload(down : boolean) {
    this.download = down;
  }
}
