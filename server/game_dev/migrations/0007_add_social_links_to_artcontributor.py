from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("game_dev", "0006_rename_path_to_media_to_media"),
    ]

    operations = [
        migrations.AddField(
            model_name="artcontributor",
            name="discord_url",
            field=models.URLField(max_length=500, blank=True, default=''),
        ),
        migrations.AddField(
            model_name="artcontributor",
            name="instagram_url",
            field=models.URLField(max_length=500, blank=True, default=''),
        ),
    ]
