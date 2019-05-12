FROM golang:1.12.1-alpine3.9 as build
RUN apk add --update git
ENV GO111MODULE=on

WORKDIR /src/app
COPY go.mod go.sum ./
RUN go mod download

COPY . ./
RUN go install 

FROM alpine:3.9
COPY --from=build /go/bin/TelloGo /app
# EXPOSE 50000
ENTRYPOINT ./app