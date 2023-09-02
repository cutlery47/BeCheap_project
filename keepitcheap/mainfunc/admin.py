from django.contrib import admin
from .models import *
# Register your models here.





class Item_Admin(admin.ModelAdmin):
    list_display = ("item_name", "item_category", "slug")
    list_display_links = ("item_name", "item_category", "slug")
    prepopulated_fields = {"slug": ("item_name",)}


class Category_Admin(admin.ModelAdmin):
    list_display = ("category_name",)
    list_display_links = ("category_name",)
    prepopulated_fields = {"slug": ("category_name",)}


admin.site.register(Categories, Category_Admin)
admin.site.register(Items, Item_Admin)