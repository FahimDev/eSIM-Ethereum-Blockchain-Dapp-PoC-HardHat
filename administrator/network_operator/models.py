from django.db import models
from core.models import BaseTimeStampedModel


# Create your models here.
class NetworkOperators(BaseTimeStampedModel):
    title = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    network = models.CharField(max_length=100)
    prefix = models.PositiveIntegerField()
    mcc = models.PositiveIntegerField()
    mnc = models.PositiveIntegerField()

    class Meta:
        ordering = ('-id',)

    def __str__(self) -> str:
        return self.title[:70]