# Generated by Django 4.0.1 on 2022-01-16 00:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('document', '0004_alter_sectionrelations_child_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='section',
            name='document',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='document.document'),
        ),
        migrations.AlterField(
            model_name='sectionrelations',
            name='document',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='document.document'),
        ),
    ]
