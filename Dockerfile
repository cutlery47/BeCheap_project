FROM python:3.10.13-alpine3.18

COPY requirements.txt /temp/requirements.txt

COPY ./keepitcheap /keepitcheap

ENV PYTHONPATH=/keepitcheap

WORKDIR /keepitcheap

EXPOSE 8000

RUN apk add postgresql-client build-base postgresql-dev

RUN pip install -r /temp/requirements.txt

RUN adduser --disabled-password keepitcheap-user

USER keepitcheap-user

