from openai import OpenAI

# gets API Key from environment variable OPENAI_API_KEY
client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
<<<<<<< HEAD
  api_key="YOUR_KEY",  # replace with your API key
=======
  api_key="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",
>>>>>>> 906fd29f2a6635b83e1351f0599800044b0f5d05
)

completion = client.chat.completions.create(
  model="meta-llama/llama-3.2-11b-vision-instruct:free",
  messages=[
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "What's in this image?"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
          }
        }
      ]
    }
  ]
)
print(completion.choices[0].message.content)