from pyexpat import model
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class TimeStampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Document(TimeStampMixin):
    title = models.TextField()
    owners = models.ManyToManyField(User)

    class Meta:
        ordering = ['updated_at']

    def __str__(self):
        return self.title

class Section(TimeStampMixin):
    name = models.TextField()
    data = models.TextField()
    level = models.IntegerField()
    document = models.ForeignKey(Document, on_delete=models.CASCADE)

    class Meta:
        ordering = ['level']

    def __str__(self):
        return self.name

class SectionRelations(models.Model):
    parent = models.ForeignKey(Section, default=None, blank=True, null=True, on_delete=models.SET_NULL, related_name='%(class)s_parent')
    child = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='%(class)s_child')
    document = models.ForeignKey(Document, on_delete=models.CASCADE)