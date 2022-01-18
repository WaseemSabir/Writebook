from os import name
from django.urls import path
from .views import *

urlpatterns = [
    path('document/', DocumentViews.as_view(), name="document_views"),
    path('document/<int:id>', DocumentWithIdViews.as_view(), name='doc_with_id'),
    path('section/<int:id>', SectionWithID.as_view(), name='section_views'),
    path('section/parent/<int:pid>/<int:doc>', SectionParentViews.as_view(), name='parent_views'),
    path('document/ownership/<int:doc>', OwnerShipViews.as_view(), name='owner_views'),
    path('document/full/<int:doc>', DocumentFullView.as_view(), name='document-full'),
    path('document/preview/<int:doc>', DocumentPreview.as_view(), name='document-full')
]