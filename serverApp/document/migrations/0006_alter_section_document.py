# Generated by Django 4.0.1 on 2022-01-16 00:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('document', '0005_section_document_alter_sectionrelations_document'),
    ]

    operations = [
        migrations.AlterField(
            model_name='section',
            name='document',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='document.document'),
        ),
    ]
