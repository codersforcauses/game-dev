from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("game_dev", "0014_merge_20260214_1420"),
    ]

    operations = [
        migrations.AddField(
            model_name="event",
            name="workshop_link",
            field=models.URLField(blank=True, max_length=2083),
        ),
    ]
