
#build stage
FROM golang:alpine AS builder
WORKDIR /go/src/app
COPY . .
RUN apk add --no-cache git
RUN go get -d -v ./...
RUN go install -v ./...

EXPOSE 8089:8089/udp
EXPOSE 8090:8090/udp
EXPOSE 11111:11111/udp

#final stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=builder /go/bin/app /app
ENTRYPOINT ./app
LABEL Name=tellogo Version=0.0.1

# CMD [ "./app" ]
