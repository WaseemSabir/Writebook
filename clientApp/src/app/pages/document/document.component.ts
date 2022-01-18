import { Component, OnInit } from '@angular/core';
import { DocumentApiService } from 'src/app/document-api.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GeneralService } from 'src/app/general.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  documents : any[] = []
  isEditVisible: boolean = false;
  isShareVisible: boolean = false;
  document_in_q : any;
  new_title : string = '';
  editLoaded : boolean = false;
  users : any[] = []
  to_search_user : string = ''
  new_doc_bool : boolean = false
  new_doc_loaded : boolean = false

  constructor(private document : DocumentApiService, private modal : NzModalService, private general : GeneralService, private auth: AuthService) { }

  ngOnInit(): void {
    this.document.getDocumentList().toPromise()
    .then((res : any)=>{
      this.documents = res;
    })
  }

  parseDate(date : string) : string {
    let d = new Date(date);
    return d.toString();
  }

  handleCancel() {
    this.isEditVisible = false;
    this.isShareVisible = false;
  }

  editClick(doc : any) {
    this.isEditVisible = true;
    this.document_in_q = doc;
  }

  shareClick(doc : any) {
    this.isShareVisible = true;
    this.document_in_q = doc;
  }

  saveNewTitle() {
    this.editLoaded = false;
    this.document.updateDoc(this.new_title, this.document_in_q.id).toPromise()
    .then((res : any)=>{
      this.editLoaded = true;
      this.general.createMessage('success','title updated')
      this.isEditVisible = false;
      window.location.reload()
    })
    .catch((res : any)=>{
      this.editLoaded = true;
      this.general.createMessage('error','could not updated document')
    })
  }

  createNewDocClick() {
    this.new_doc_bool = true;
  }

  searchUsers() {
    this.auth.searchUsers(this.to_search_user).toPromise()
    .then((res : any)=>{
      this.users = res
    })
    .catch(err=>{})
  }

  addNewUser(username : string) {
    this.document.addUserToDocument(username, this.document_in_q.id).toPromise()
    .then((res : any)=>{
      this.general.createMessage('success','User added')
      this.isShareVisible = false;
    })
    .catch((res : any)=>{
      this.isShareVisible = true;
      this.general.createMessage('error','could not share document')
    })
  }

  createNewDoc() {
    if(!this.new_title.length) {
      this.general.createMessage('error','New document title cannot be empty')
      return
    }
    this.new_doc_loaded = false;
    this.document.createDoc(this.new_title).toPromise()
    .then((res : any)=>{
      this.new_doc_loaded = true;
      this.general.createMessage('success','new doc created')
      this.new_doc_bool = false;
      window.location.reload()
    })
    .catch((res : any)=>{
      this.new_doc_loaded = true;
      this.general.createMessage('error','could not create new doc')
    })
  }

  showDeleteConfirm(doc : any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this document?',
      nzContent: `<b style="color: red;">${doc.title}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.document.deleteDoc(doc.id).toPromise()
        .then((res : any)=>{
          this.general.createMessage('warning','Document deletd');
          window.location.reload();
        })
        .catch(err =>{
          this.general.createMessage('error','could not delete document');
        })
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
        console.log("deleting canceled")
      }
    });
  }

  cancelNewDocument() {
    this.new_doc_bool = false  
  }


}
