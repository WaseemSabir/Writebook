import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentApiService {

  // Enviorment variables
  readonly server : string = environment.apiURL;
  constructor(private cookie : CookieService,private http : HttpClient) { }

  getDocumentList() {
    return this.http.get(this.server+'/api/document/', this.getHeader())
  }

  deleteDoc(id : number) {
    return this.http.delete(this.server+'/api/document/'+id, this.getHeader())
  }

  getDoc(id : number) {
    return this.http.get(this.server+'/api/document/'+id, this.getHeader())
  }

  updateDoc(title : string, id : number) {
    let temp = {
      title : title,
      id : id
    }
    return this.http.put(this.server+'/api/document/', temp, this.getHeader())
  }

  createDoc(title : string) {
    let temp = {
      title : title,
    }
    return this.http.post(this.server+'/api/document/', temp, this.getHeader())
  }

  addUserToDocument(username: string, id: number) {
    let temp = {
      username: username
    }
    return this.http.post(this.server+'/api/document/ownership/'+id,temp, this.getHeader())
  }

  getDocF(doc : number) {
    return this.http.get(this.server+`/api/document/full/${doc}`, this.getHeader())
  }

  getDocPreview(doc : number) {
    return this.http.get(this.server+`/api/document/preview/${doc}`, this.getHeader())
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
