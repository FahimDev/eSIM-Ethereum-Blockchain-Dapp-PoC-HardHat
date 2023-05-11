from django.contrib import admin
from network_operator.models import NetworkOperators


# Register your models here.
@admin.register(NetworkOperators)
class NetworkOperatorsAdmin(admin.ModelAdmin):
    list_display = ('prefix', 'title')