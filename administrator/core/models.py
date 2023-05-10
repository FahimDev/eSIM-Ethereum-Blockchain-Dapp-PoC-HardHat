from django.db import models
from model_utils import FieldTracker
from model_utils.models import TimeStampedModel
from django.db import IntegrityError


# Create your models here.
class BaseTimeStampedModel(TimeStampedModel):
    tracker = FieldTracker()

    class Meta:
        abstract = True

    def delete(self, **kwargs):
        try:
            super().delete(**kwargs)
        except IntegrityError:
            return 'It has some dependent entry in db'