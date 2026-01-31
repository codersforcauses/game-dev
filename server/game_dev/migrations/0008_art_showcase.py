# Create Art showcase model

import django
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("game_dev", "0007_alter_artcontributor_unique_together_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="ArtShowcase",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("description", models.CharField(max_length=200)),
                (
                    "art",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="showcase",
                        to="game_dev.art",
                    ),
                )
            ],
        ),
        migrations.AddConstraint(
            model_name='artshowcase',
            constraint=models.UniqueConstraint(
                fields=['art'],
                name='unique_artshowcase_per_art'
            )
        )
    ]
