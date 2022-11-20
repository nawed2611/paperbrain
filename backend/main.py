from flask import Flask, request
import arxiv
from flask_cors import CORS, cross_origin
import openai
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")



app = Flask(__name__)
CORS(app, support_credentials=True)

# open training file
f = open("training.txt", "r")


@cross_origin(supports_credentials=True)
@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        query = request.json
        print(query)

        user_query = query['query']
        print(user_query)
        
        search_paper = arxiv.Search(
            query=user_query,
            max_results=100
        )

        papers_list = []

        for result in search_paper.results():
            papers_list.append([result.title,result.pdf_url,result.summary])
        
        
        print(papers_list)
        return {"bruh":papers_list}


    return "<h1>This is working</h1>"


@cross_origin(supports_credentials=True)
@app.route('/explain', methods=['POST'])
def explain():

    if request.method == 'POST':

        excerpt = request.json

        response = openai.Completion.create(
        model="text-davinci-002",
        prompt=f"{f.read()}###\nPrompt:\n{excerpt}\n\nResult:\n",
        temperature=0.8,
        max_tokens=293,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )
        final_response = response["choices"][0]["text"].lstrip()

        print(final_response)

        return {"answer":final_response}
    return "<h1>This is working as well</h1>"

app.run(debug=True)
