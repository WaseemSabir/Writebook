import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { SectionManageService } from '../section-manage.service';
import { Section } from '../../interfece'
import { DocumentApiService } from 'src/app/document-api.service';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/general.service';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { SectionService } from 'src/app/section.service';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class DocumentViewComponent implements OnInit {

  data : Section = {
    id : 0,
    name : "",
    data : "",
    level : 0,
    document : 0
  }
  preview : string = ""
  previewBool : boolean = false
  edittingEnabled : boolean = false

  documentID : number = 0
  @Output() populateEvent = new EventEmitter<string>();
  @ViewChild('editorSection')
  public rteObj!: RichTextEditorComponent;

  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'SubScript', 'SuperScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink',
      '|', 'ClearFormat', 'SourceCode'
    ]
  };

  public html : string = ''
  public name : string = ''

  constructor(private sectManage : SectionManageService, private docApi : DocumentApiService, private route : ActivatedRoute, private general : GeneralService, private sectionAPI : SectionService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.documentID = params['id'];
      this.previewDocument(true);
      console.log("in pre")
    })

    this.sectManage.section$.subscribe((res : Section)=>{
      if(res.id) {
        this.sectionAPI.getSection(res.id).toPromise()
        .then((sect : any)=>{
          this.data = sect;
          this.html = this.data.data;
          this.previewBool = false
          this.name = this.data.name
          this.edittingEnabled = false
        })
        .catch((err)=>{
          this.general.createMessage('error',`Could not load.${err.details}`)
        })
      }
    })

    this.sectManage.preview$.subscribe((res : boolean)=>{
      this.previewDocument(res)
    })

    this.sectManage.download$.subscribe((res : boolean)=>{
      if(res) {
        this.previewThenDownload();
      }
    })
  }

  sendPopulateEvent(): void {
    this.populateEvent.next('populate');
  }

  sendDownloadEvent(): void {
    this.populateEvent.next('download')
  }

  previewDocument(shouldShow : boolean) {
    if(this.documentID) {
      this.docApi.getDocPreview(this.documentID).toPromise()
      .then((res : any)=>{
        this.preview = res;
        if(shouldShow) {
          this.previewBool = shouldShow
        }
      })
    }
    else {
      console.log(this.documentID)
    }
  }

  previewThenDownload() {
    this.docApi.getDocPreview(this.documentID).toPromise()
    .then((res : any)=>{
      this.preview = res;
      this.previewBool = true
      this.general.createMessage('info','downloading')
      let timeout = new Promise(f => setTimeout(f, 1000))
      timeout.then(()=>{
        this.sendDownloadEvent();
      })
    })
  }

  enableEditting() {
    this.edittingEnabled = true;
  }

  saveSection(previewAfter : boolean) {
    let rteHTML : string = this.rteObj.getHtml()
    this.sectionAPI.updateSection(this.data.id, this.name, rteHTML, 0).toPromise()
    .then((res : any)=>{
      this.data = res
      if(previewAfter) {
        this.edittingEnabled = false
      }
    })
    
    this.sendPopulateEvent()
  }

  discardChanges() {
    this.edittingEnabled = false
    this.html = this.data.data;
  }

}

// def preview_document_build(pid, doc, sectionLevel):
//     if pid:
//         try:
//             parent = Section.objects.get(pk=pid)
//         except:
//             return Response({'details':'invalid parent section'}, status=status.HTTP_400_BAD_REQUEST)
//     else:
//         parent = None
    
//     if not parent:
//         relations = SectionRelations.objects.filter(parent__isnull=True, document=doc)
//     else:
//         relations = SectionRelations.objects.filter(parent=parent, document=doc)
    
//     childs = []
//     for relation in relations:
//         childs.append(relation.child)

//     serilized = SectionSerializer(childs, many=True)

//     if pid:
//         preview_build = f"<p class='h5 py-2'>{sectionLevel}: {parent.name}</p>{parent.data}"
//     else:
//         preview_build = ""

//     count = 1
//     for one in serilized.data:
//         id = one.get("id")
//         to_add = ""
//         if len(sectionLevel):
//             to_add = f".{count}"
//         else:
//             to_add = f"{count}"
//         preview_build += preview_document_build(id, doc, sectionLevel+to_add)
//         count +=1

//     return preview_build

// class DocumentPreview(GenericAPIView):
//     permission_classes = [IsAuthenticated]

//     def get(self, request, doc):
//         user = request.user

//         d = Document.objects.filter(id=doc, owners=user).first()
//         if not d:
//             return Response({"details":"Document not found or Unauthorized"}, status=status.HTTP_400_BAD_REQUEST)

//         to_ret = f"<p class='h3 text-center'>{d.title}</p>{preview_document_build(0, d, '')}"
//         return Response(to_ret,status=status.HTTP_200_OK)