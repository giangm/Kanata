FROM golang:1.19

LABEL name="Deeaznaz"
LABEL desc="Faulty ip banning, can be bypassed with x-forwarded-for header"

RUN apt update -y && apt upgrade -y

WORKDIR /app

COPY ./app .

ENV CGO_CFLAGS="-g -O2 -Wno-return-local-addr"

EXPOSE 5000

RUN go install github.com/mattn/go-sqlite3

# Run
CMD ["go", "run", "."]
