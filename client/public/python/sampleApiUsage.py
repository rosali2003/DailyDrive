from openai import OpenAI

def getKey() :
    with open('api_key.txt') as f:
        # Read the contents of the file into a variable
        return f.read()

# gets API Key from environment variable OPENAI_API_KEY
client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key = getKey(),  # replace with your API key
)

def getMessage(contents) :
  reflection = contents['reflection']
  streak = str(contents['streak'])
  habits = " ".join(elem for elem in contents['habits'])
  goal = contents['goal']
  userInput = "In this case, a user is on a " + streak+ " day streak of completing their tasks. \
                This users habits include: " + habits +"Their long term goal is " + goal
  
  completion = client.chat.completions.create(
    model="meta-llama/llama-3.2-11b-vision-instruct:free",
    messages=[
        {
            "role": "system",
            "content": [
                {
                    "type": "text",
                    "text": "You are part of a goal-setting and productiveness app. Users enter a long term goal they are struggling to achieve. \
                        For each goal, they will setup daily/weekly habits they would like to have in order to achieve their goal."    
                },
                {
                    "type": "text",
                    "text": "Everyday, users will need to fill out a self-reflection log Your task is to look at this log and at the completion \
                        of their habits. If users are struggling, you will prompt them maybe to take another look at their goals, or give them suggestions \
                        to help stay on track."    
                },
                {
                    "type": "text",
                    "text": "For example, a user may be on a 5 day streak. You could prompt them maybe to increase the amount of each habit to do, or you might \
                        suggest additional habits."    
                },
                {
                    "type": "text",
                    "text": "You're suggestions will be sent either as an email or as a push notification on a webapp."    
                }
            ] 
        }, 
        {
            "role": "system",
            "content": [
                {
                    "type": "text",
                    "text": userInput
                },
            ] 
        },
        {
            "role": "system",
            "content": [
                {
                    "type": "text",
                    "text": "The user submitted the following reflection: " + reflection
                },
            ] 
        }
    ]
  )
  msg = str(completion.choices[0].message.content)
  if msg == None:
     return ""
  return msg

# completion = client.chat.completions.create(
#   model="meta-llama/llama-3.2-11b-vision-instruct:free",
#   messages=[
#     {
#       "role": "system",
#       "content":[
#         {
#           "type": "text",
#           "text": "You are part of a goal-setting and productiveness app. User will be prompted to enter a goal they \
#               would like to achieve and a date they would need to complete this task by."    
#         },
#         {
#           "type": "text",
#           "text": "It is your job to to help them produce a list of habits they can learn they can do on a \
#               daily/weekly basis to help them achieve this goal."    
#         },
#         {
#           "type": "text",
#           "text": "For example, one goal someone might have is 'I want to get a software developer job in 3 months' A sample \
#              habit could be 'Apply to 5 jobs a day' or 'Practice a new skill for 45 mins a day'."    
#         },
#         {
#           "type": "text",
#           "text": "You're suggestions will be shown to them in the productivity app as a list of habits they can choose and add \
#              to a productivity tracker, which checks if they are completing their daily tasks."    
#         }
#       ] 
#     }, 
#     {
#       "role": "user",
#       "content": [
#         {
#           "type": "text",
#           "text": "I want to apply to masters programs in AI in 5 months before I graduate"
#         },
#       ]
#     }
#   ]
# )

#print(getMessage())