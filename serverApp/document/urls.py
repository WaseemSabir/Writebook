from os import name
from django.urls import path
from .views import *

urlpatterns = [
    path('document/', DocumentViews.as_view(), name="document_views"),
    path('section/<int:id>', SectionWithID.as_view(), name='section_views'),
    path('section/parent/<int:pid>/<int:doc>', SectionParentViews.as_view(), name='parent_views'),
    path('document/ownership/<int:doc>', OwnerShipViews.as_view(), name='owner_views')
]