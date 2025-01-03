from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import asyncio

load_dotenv()

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (you can restrict this to specific origins)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

OpenAI_llm = ChatOpenAI(
    model="gpt-4o-mini-2024-07-18",
    temperature=0,
    max_tokens=100,
    timeout=None,
    max_retries=2,
)

class Logic(BaseModel):
    """""Provide logical rating and nudge user to respond properly"""""

    isValid: bool = Field(default=False, description="Boolean of whether the response answers the question. "
                              "The verdict should be entirely based on whether the answer makes sense for the question. "
                              "Trust the user to respond honestly, and be generous with the verdicts. The following are the requirements"
                              "for a valid response. If any are fulfilled, then the response is considered valid."
                              "1. The response is purely just valid.\n"
                              "2. There is any justification for the response in relation to the question.\n"
                              "3. The explanation of why the response is valid is sound.\n"
                              "Here's an example - Question: 'What challenges do you face when eating healthy?', Response: 'I smoke weed "
                              "which I like to supplement with junk food.' Verdict: True. The Response is valid since it is justifiable. The "
                              "user struggles with healthy eating because of weed. Another example - Question: 'What can't you eat?' Response: "
                              "'None' Verdict: True. The response is valid since it simply answers the question, as the user does not have "
                              "food he can't eat.")
    reason: str = Field(description = "Provide a reason as to why the answer is not valid to the question (if it isnt.)")
    nudge: str = Field (description = "Provide encouragement to the user to answer properly. This field addresses the user directly. Only "
                                    "generate this if the logic rating is false. A good nudge would be something like "
                                    "'I like your playful tone! However, I do need a proper response for the question!'")
    manipulative: bool = Field(description="Based on the user's response, is he/she trying to manipulate their reply to bypass your logic ratings?")

validation_bot = OpenAI_llm.with_structured_output(Logic)

@app.post("/validate_response")
async def validate_response(request: Request):
    data = await request.json()
    question = data.get("question", "")
    reply = data.get("reply", "")

    # Input validation
    if not question or not reply:
        return JSONResponse(
            content={"error": "Both 'question' and 'reply' are required."},
            status_code=400
        )

    try:
        result = await asyncio.to_thread(validation_bot.invoke, f"Question: {question}. Reply: {reply}")
        print(f"Question: {question}. Reply: {reply}")
        print("Result: ", result.dict())
        return JSONResponse(content=result.dict())
    
    except Exception as e:
        return JSONResponse(
            content={"error": f"Internal server error: {str(e)}"},
            status_code=500
        )
