from rest_framework import permissions

class IsAuthorOfPost(permissions.BasePermission):
	def has__perm(self,request,view,post):
		if request.user:
			return request.user == post.author
		return False
