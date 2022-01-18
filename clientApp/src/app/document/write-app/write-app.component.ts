import { Component, OnInit } from '@angular/core';
import { DocumentApiService } from 'src/app/document-api.service';
import { ActivatedRoute } from '@angular/router';
import { SectionService } from 'src/app/section.service';
import { GeneralService } from 'src/app/general.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { SectionManageService } from '../section-manage.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-write-app',
  templateUrl: './write-app.component.html',
  styleUrls: ['./write-app.component.scss']
})
export class WriteAppComponent implements OnInit {

  TREE_DATA: any[] = [];
  doc : any = {
    title : ""
  };
  docID : number = 0;
  public name : string = ''
  createNewParent : boolean = false
  loading : boolean = false
  console = console
  parent : number = 0
  selectedSection : any;

  constructor(private docApi : DocumentApiService, private route: ActivatedRoute, private section : SectionService, private general : GeneralService, private sectManage : SectionManageService) {
    this.dataSource.data = this.TREE_DATA;
  }
  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();
  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.docID = params['id'];
      this.docApi.getDoc(this.docID).toPromise()
      .then((res : any)=>{
        this.doc = res;
        this.populateDocument(false);
      })
      .catch(err=>console.log(err))
    });
  }

  createNewSection() {
    if(!this.name.length) {
      this.general.createMessage('error','Cannot be empty')
      return
    }

    this.loading = true
    this.section.createSection(this.parent, this.doc.id, this.name, '',0).toPromise()
    .then((res : any)=>{
      this.general.createMessage('success','New section created');
      this.populateDocument(true)
      this.loading = false
      this.createNewParent = false
    })
    .catch(err=>{
      this.general.createMessage('error','Could not create new section')
      this.loading = false
    })
  }

  populateDocument(changedDone : boolean) {
    this.docApi.getDocF(this.doc.id).toPromise()
    .then((res : any)=>{
      this.TREE_DATA = res;
      this.dataSource.data = this.TREE_DATA;
      if(changedDone) {
        this.sectManage.setPreview(false)
      }
    })
  }
  
  handleCancel() {
    this.createNewParent = false;
  }

  parentCreateClick() {
    this.createNewParent = true;
    this.parent = 0;
  }

  previewRequest() {
    this.sectManage.setPreview(true)
    this.general.createMessage('info','loading preview')
  }

  exportAsPDF(divId : any)
  {
    var data = document.getElementById(divId);
    html2canvas(data!).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
    });
  }

  downloadRequest() {
    this.sectManage.setDownload(true)
  }

  eventBack(event : any) {
    if(event=="download") {
      this.exportAsPDF('document')
    }
    else {
      this.populateDocument(true)
    }
  }
}
