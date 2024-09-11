from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from config.settings.local import SITE_NAME, DEFAULT_FROM_EMAIL
from core_apps.profiles.models import Profile

User = get_user_model()


def send_warning_email(user: User, title: str, description: str) -> None: # type: ignore
    user_count = Profile.objects.filter(user=user).first()
    # subject = f"Warning: {user.get_full_name} You have been reported!" 
    if user_count.report_count == 1:
        subject = f"Warning: {user.get_full_name} You have been reported!"
    elif user_count.report_count > 1 and user_count.report_count < 4:
        subject = f"Warning: {user.get_full_name} You have been reported! Count: {user_count.report_count}"
    elif user_count.report_count == 4:
        subject = f"Warning: {user.get_full_name} You have been reported! Count: {user_count.report_count} !! Last Worning !!!"
    
    from_email = DEFAULT_FROM_EMAIL
    recipient_list = [user.email]
    context = {
        "user": user,
        "title": title,
        "description": description,
        "site_name": SITE_NAME,
    }
    html_email = render_to_string("emails/warning_email.html", context)
    text_email = strip_tags(html_email)

    email = EmailMultiAlternatives(subject, text_email, from_email, recipient_list)
    email.attach_alternative(html_email, "text/html")
    email.send()


def send_deactivation_email(user: User, title: str, description: str) -> None: # type: ignore
    subject = f"Account Deactivation and Eviction Notice! : {user.get_full_name}"
    from_email = DEFAULT_FROM_EMAIL
    recipient_list = [user.email]
    context = {
        "user": user,
        "title": title,
        "description": description,
        "site_name": SITE_NAME,
    }
    html_email = render_to_string("emails/deactivation_email.html", context)
    text_email = strip_tags(html_email)

    email = EmailMultiAlternatives(subject, text_email, from_email, recipient_list)
    email.attach_alternative(html_email, "text/html")
    email.send()