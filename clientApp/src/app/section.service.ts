import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  readonly server : string = environment.apiURL;
  constructor(private cookie : CookieService,private http : HttpClient) {}

  createSection(pid : number, doc : number, name : string, data : string, level : number) {
    let temp = {
      name: name,
      data: data,
      level: level
    }
    return this.http.post(this.server+'/api/section/parent/'+`${pid}/${doc}`, temp, this.getHeader())
  }

  getSection(sectionId : number) {
    return this.http.get(this.server+`/api/section/${sectionId}`, this.getHeader())
  }

  getChild(pid : number, doc : number) {
    return this.http.get(this.server+`/api/section/parent/${pid}/${doc}`, this.getHeader())
  }

  updateSection(sectionID : number, name : string, data : string, level : number) {
    let temp = {
      name: name,
      data: data,
      level: level
    }
    return this.http.put(this.server+'/api/section/'+`${sectionID}`, temp, this.getHeader())
  }

  deleteSection(sectionID : number) {
    return this.http.delete(this.server+`/api/section/${sectionID}`, this.getHeader())
  }

  // Gets all the headers
  getHeader()
  {
    return {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.cookie.get('cookie')}`)
    }
  }
}
