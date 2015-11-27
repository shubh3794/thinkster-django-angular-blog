from rest_framework import permissions

class IsAccountOwner(permissions.BasePermission):
	def has_object_permission(self,request,view,obj):
		if request:
			return request.user==obj
		return False
