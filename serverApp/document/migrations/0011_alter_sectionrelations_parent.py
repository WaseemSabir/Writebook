# Generated by Django 4.0.1 on 2022-01-16 05:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('document', '0010_alter_sectionrelations_child'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sectionrelations',
            name='parent',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_parent', to='document.section'),
        ),
    ]
