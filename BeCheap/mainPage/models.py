from django.db import models
from django.template.defaultfilters import slugify


# Create your models here.
class Categories(models.Model):
    category_name = models.CharField(max_length=100)
    category_slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")

    def __str__(self):
        return self.category_name

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"


class Items(models.Model):
    item_name = models.CharField(max_length=100)
    item_slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name="URL")
    item_brand = models.CharField(max_length=20)
    item_category = models.ForeignKey(Categories, on_delete=models.CASCADE, null=False, related_name='categories')
    item_cur_price = models.CharField(max_length=20)
    item_prev_price = models.CharField(max_length=20)
    item_link = models.URLField(max_length=300, null=True)
    item_date = models.TimeField(auto_now=True)
    item_image = models.URLField(max_length=300, null=True)

    def save(self, *args, **kwargs):
        if not self.id:
            # Newly created object, so set slug
            self.item_slug = slugify(self.item_name)
        super(Items, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"