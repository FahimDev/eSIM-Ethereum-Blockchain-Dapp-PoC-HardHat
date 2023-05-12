from django.contrib import admin
from logistics.models import LogisticDetail, TransportDetail, DriverDetail


# Register your models here.
@admin.register(LogisticDetail)
class LogisticDetailAdmin(admin.ModelAdmin):
    list_display = ('title', 'country')
    
    
@admin.register(TransportDetail)
class TransportDetailAdmin(admin.ModelAdmin):
    list_display = ('model', 'authority_zone', 'registration_number', 'chassis_type', 'capacity', 'capacity_unit', 'owner_list')
    def owner_list(self, obj):
        return ", ".join([owner.title+"-"+owner.country.name for owner in obj.owners_id.all()])
    
@admin.register(DriverDetail)
class DriverDetailAdmin(admin.ModelAdmin):
    list_display = ('name', 'license_no', 'validity_date')