import os
import pandas as pd
from dotenv import load_dotenv
from langchain.llms import OpenAI
from langchain.agents import create_pandas_dataframe_agent

load_dotenv()  # Load environment variables from .env file

def get_chatbot_response(user_query, file_path):
    df = pd.read_csv(file_path)

    # Create a LangChain agent using the DataFrame
    llm = OpenAI(temperature=0, api_key=os.getenv("OPENAI_API_KEY"))
    agent = create_pandas_dataframe_agent(llm, df, verbose=True)

    # Run the query
    response = agent.run(user_query)
    return response
