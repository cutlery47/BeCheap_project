from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import *
# Register your models here.





class User_Huly_Admin(admin.ModelAdmin):
    list_display = ("user_name", "pk")
    list_display_links = ("user_name", "pk")



class Favorite_Admin(admin.ModelAdmin):
    list_display = ("user", "item")
    list_display_links = ("user", "item")


admin.site.register(Favorite, Favorite_Admin)
admin.site.register(User_Huly, User_Huly_Admin)