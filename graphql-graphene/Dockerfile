FROM python:3.11

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir uvicorn 

COPY . . 

ENTRYPOINT [ "uvicorn", "app:app", "--port", "5000" ]