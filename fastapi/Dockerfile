FROM python:3.10-slim
WORKDIR /usr/src/server
ADD ./fastapi/requirements.txt .
RUN pip install --trusted-host pypi.python.org -r requirements.txt
WORKDIR /app
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "3001"]