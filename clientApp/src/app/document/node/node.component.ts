import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GeneralService } from 'src/app/general.service';
import { SectionService } from 'src/app/section.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SectionManageService } from '../section-manage.service';
import { Section } from '../../interfece'

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  loading : boolean = false
  name : string = ''
  addChildBool : boolean = false
  editSectionBool : boolean = false
  
  @Input() data : Section = {
    id : 0,
    name : "",
    data : "",
    level : 0,
    document : 0
  };
  @Output() populateEvent = new EventEmitter<string>();

  constructor(private section: SectionService, private general: GeneralService, private modal : NzModalService, private sectionManage : SectionManageService) { }

  ngOnInit(): void {
  }

  sectionSelected() {
    this.sectionManage.sectionSelection(this.data)
  }

  createNewSection() {
    this.loading = true
    this.section.createSection(this.data.id, this.data.document, this.name, '',0).toPromise()
    .then((res : any)=>{
      this.general.createMessage('success','New section created');
      this.sendPopulateEvent()
      this.loading = false
      this.addChildBool = false
    })
    .catch(err=>{
      this.general.createMessage('error','Could not create new section')
      this.loading = false
    })
  }

  editSection() {
    this.loading = true
    this.section.updateSection(this.data.id, this.name, this.data.data, 0).toPromise()
    .then((res : any)=>{
      this.general.createMessage('success','Section Editted');
      this.sendPopulateEvent()
      this.loading = false
      this.addChildBool = false
    })
    .catch(err=>{
      this.general.createMessage('error','Could not updated section')
      this.loading = false
    })
  }

  deleteSectionConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this document?',
      nzContent: `<b style="color: red;">${this.data.name}</b><br>
                  <p>Deleting section will delete all sub sections!</p>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.section.deleteSection(this.data.id).toPromise()
        .then((res : any)=>{
          this.general.createMessage('warning','Section Deleted');
          this.sendPopulateEvent()
        })
        .catch(err =>{
          this.general.createMessage('error','Could not delete section');
        })
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
        console.log("deleting canceled")
      }
    });
  }

  editClick() {
    this.editSectionBool = true
    this.addChildBool = false
  }

  handleCancel() {
    this.addChildBool = false
    this.editSectionBool = false
  }

  addChildClick() {
    this.addChildBool = true
    this.editSectionBool = false
  }

  sendPopulateEvent(): void {
    this.populateEvent.next('populate');
  }

}
