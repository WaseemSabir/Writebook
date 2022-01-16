from rest_framework.generics import GenericAPIView
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class SectionWithID(GenericAPIView):
    serializer_class = SectionSerializer
    permission_classes = [IsAuthenticated]

    # Get a section using section id
    def get(self, request, id):
        user = request.user
        try:
            sec = Section.objects.get(pk=id)
        except:
            return Response({'detail': 'Section does not exits'}, status=status.HTTP_400_BAD_REQUEST)

        if not sec.document in Document.objects.filter(owners=user):
            return Response({"detail":"Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

        serilazied = SectionSerializer(sec)
        return Response(serilazied.data, status=status.HTTP_200_OK)

    # Updates a section
    def put(self, request, id):
        user = request.user
        data = request.data

        try:
            sec = Section.objects.get(pk=id)
        except:
            return Response({'detail': 'Section does not exits'}, status=status.HTTP_400_BAD_REQUEST)

        if not sec.document in Document.objects.filter(owners=user):
            return Response({"detail":"Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            sec.level = data["level"]
            sec.name = data["name"]
            sec.data = data["data"]
        except Exception as e:
            return Response({"error": "Required fields not provided","detail":f"{e}"}, status=status.HTTP_400_BAD_REQUEST)
        
        sec.save()
        serialized = self.serializer_class(sec)

        return Response(serialized.data, status=status.HTTP_200_OK)

    # deletes a section, all child of section
    def delete(self, request, id):
        user = request.user
        try:
            sec = Section.objects.get(pk=id)
        except:
            return Response({'detail': 'Section does not exits'}, status=status.HTTP_400_BAD_REQUEST)

        if not sec.document in Document.objects.filter(owners=user):
            return Response({"detail":"Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

        nodes_queue = [sec]
        while nodes_queue:
            one = nodes_queue.pop(0)
            childs_of_one = SectionRelations.objects.filter(parent=one)
            for relation in childs_of_one:
                nodes_queue.append(relation.child)
            one.delete()
        
        return Response(status=status.HTTP_200_OK)


class SectionParentViews(GenericAPIView):
    serializer_class = SectionSerializer
    permission_classes = [IsAuthenticated]

    # get childs of a parent section, pid 0 for null parents
    def get(self, request, pid, doc):
        user = request.user

        if pid:
            try:
                parent = Section.objects.get(pk=pid)
            except:
                return Response({'details':'invalid parent section'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            parent = None

        if not parent.document in Document.objects.filter(owners=user):
            return Response({'details':'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        
        relations = SectionRelations.objects.filter(parent=parent)
        childs = map(lambda x: x.child, relations)

        serialized = SectionSerializer(childs, many=True)

        return Response(serialized.data, status=status.HTTP_200_OK)
     
    # creates a new section using parent id. Send pid=0 if no parent
    def post(self, request, pid, doc):
        user = request.user
        data = request.data

        if pid:
            try:
                parent = Section.objects.get(pk=pid)
            except:
                return Response({'detail':"parent section does not exits"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            parent = None

        doc = Document.objects.filter(id=doc, owners=user).first()
        if not doc:
            return Response({'detail':'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            name = data['name']
            d = data['data']
            level = data['level']

            child = Section(name=name, data=d, level=level, document=doc)
        except:
            return Response({'detail':'Required data not provided'}, status=status.HTTP_403_FORBIDDEN)

        child.save()
        new_relation = SectionRelations(parent=parent, child=child, document=doc)
        new_relation.save()

        serialized = SectionSerializer(child)
        return Response(serialized.data, status=status.HTTP_200_OK)

class DocumentViews(GenericAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]
    
    # Returns all documents of the user
    def get(self, request):
        user = request.user
        
        try:
            docs = Document.objects.filter(owners=user)
            serialized = DocumentSerializer(docs, many=True)
            return Response(serialized.data)
        except:
            return Response({'detail': 'error in reteriving documents'}, status=status.HTTP_400_BAD_REQUEST)

    # creates a new document
    def post(self, request):
        user = request.user
        data = request.data

        try:
            new_doc = Document(title=data['title'])
            new_doc.save()
            new_doc.owners.add(user)
            new_doc.save()

            serialized = DocumentSerializer(new_doc)

            return Response(serialized.data, status=status.HTTP_201_CREATED)
        except:
            return Response({'detail': 'error in creating documents'}, status=status.HTTP_400_BAD_REQUEST)

    # Updates a document
    def put(self, request):
        user = request.user
        data = request.data

        try:
            id = data["id"]
            title = data["title"]
        except:
            return Response({'detail': 'required data not submiited'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            doc = Document.objects.filter(id=id, owners=user).first()
            doc.title = title
            doc.save()
            serialzed = DocumentSerializer(doc)

            return Response(serialzed.data, status=status.HTTP_200_OK)
        except:
            return Response({'detail': 'error in updating documents'}, status=status.HTTP_400_BAD_REQUEST)

    # delete a document
    def delete(self, request):
        user = request.user
        data = request.data

        try:
            id = data["id"]
        except:
            return Response({'detail': 'required data not submiited'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            doc = Document.objects.filter(id=id, owners=user).first()
            doc.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response({'detail': 'unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)


class OwnerShipViews(GenericAPIView):
    permission_classes = [IsAuthenticated]

    # Get owners of document
    def get(self, request, doc):
        try:
            doc_in_q = Document.objects.get(pk=doc)
        except:
            return Response({"details":"Document not found"}, status=status.HTTP_404_NOT_FOUND)

        serilized = UserSerializer(doc_in_q.owners, many=True)
        return Response(serilized.data, status=status.HTTP_200_OK)

    # Add new owner of document
    def post(self, request, doc):
        user = request.user

        try:
            to_add = request.data['username']
        except:
            return Response({"details":"Required data not provided"}, status=status.HTTP_406_NOT_ACCEPTABLE)

        try:
            user_to_add = User.objects.get(username=to_add)
        except:
            return Response({"details":"User not found"},status=status.HTTP_404_NOT_FOUND)

        try:
            doc_in_question = Document.objects.get(pk=doc, owners=user)
        except:
            return Response({"details":"Document not found or unauthorized"},status=status.HTTP_404_NOT_FOUND)

        doc_in_question.owners.add(user_to_add)
        doc_in_question.save()

        serialized = DocumentSerializer(doc_in_question)
        return Response(serialized.data, status=status.HTTP_202_ACCEPTED)