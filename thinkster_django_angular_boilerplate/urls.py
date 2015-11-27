from rest_framework_nested import routers
from django.conf.urls import patterns, url, include
from authentication.views import AccountViewSet
from authentication.views import LoginView, LogoutView
from posts.views import AccountPostsViewSet, PostViewSet
from django.views.generic import TemplateView

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'posts', PostViewSet)
accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)
accounts_router.register(r'posts', AccountPostsViewSet)

urlpatterns = patterns(
     '',
    # ... URLs
    url(r'^api/v1/', include(router.urls)),
  	url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url('^.*$', TemplateView.as_view(template_name="index.html"), name='index'),
)