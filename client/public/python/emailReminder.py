import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

from sampleApiUsage import getMessage

def getKey() :
    with open('email_key.txt') as f:
        # Read the contents of the file into a variable
        return f.read()

# Set your SendGrid API key
sendgrid_api_key = getKey()

# contents = {
#     'streak': 5,
#     'goal': 'Finding a job within 3 months',
#     'habits': ['Apply to 5 jobs a day', 'Research companies for 30 minutes a day', 
#                'Spend 30 minutes a day fixing resumes, cover letters, etc.']
# }

# contents = {
#     'streak': -1,
#     'goal': 'Finding a job within 3 months',
#     'habits': ['Apply to 5 jobs a day', 'Research companies for 30 minutes a day', 
#                'Spend 30 minutes a day fixing resumes, cover letters, etc.']
# }



def sendEmailReminder(contents):
    sendgrid_api_key = getKey()

    # Email configuration
    sender_email = 'hkhat026@gmail.com'
    receiver_email = 'hkhat026@gmail.com'
    subject = 'Productivity Insights'
    body = getMessage(contents)

    message = Mail(
        from_email=sender_email,
        to_emails=receiver_email,
        subject=subject,
        plain_text_content=body
    )

    try:
        sg = SendGridAPIClient(sendgrid_api_key)
        response = sg.send(message)
        print(f"Email sent! Status code: {response.status_code}")
    except Exception as e:
        print(f"Error: {e}")