# Generated manually for changing path_to_media to media (ImageField)

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("game_dev", "0005_art_artcontributor"),
    ]

    operations = [
        # First, rename the field
        migrations.RenameField(
            model_name="art",
            old_name="path_to_media",
            new_name="media",
        ),
        # Then, alter the field to ImageField
        migrations.AlterField(
            model_name="art",
            name="media",
            field=models.ImageField(upload_to='art_images/'),
        ),
    ]
