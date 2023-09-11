# base stage
FROM python:3.10.13-alpine3.18 as base

WORKDIR /keepitcheap

RUN apk add postgresql-client build-base postgresql-dev

COPY requirements.txt /temp/requirements.txt

RUN pip install -r /temp/requirements.txt

# final stage
FROM python:3.10.13-alpine3.18

RUN apk add libpq

ENV PYTHONPATH=/keepitcheap

COPY --from=base /usr/local/lib/python3.10/site-packages/ /usr/local/lib/python3.10/site-packages/
COPY --from=base /usr/local/bin /usr/local/bin

COPY ./keepitcheap /keepitcheap

RUN adduser --disabled-password keepitcheap-user

USER keepitcheap-user

EXPOSE 8000

WORKDIR /keepitcheap
