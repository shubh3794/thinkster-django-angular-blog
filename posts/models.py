from django.db import models
from authentication.models import Account

class Post(models.Model):
	author = models.ForeignKey(Account)
	content = models.TextField()
	created_at = models.DateField(auto_now_add=True)
	updated_at = models.DateField(auto_now=True)
	def __unicode__(self):
		return '{0}'.format(self.content)
# Create your models here.
