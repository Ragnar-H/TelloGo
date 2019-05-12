package main

import (
	"fmt"
	"net"
	"strconv"
)

const (
	udpAddr          = "192.168.10.1"
	commandPort      = 8889
	gstreamerCommand = `udpsrc port=11111 caps="video/x-h264, stream-format=(string)byte-stream, width=(int)960, height=(int)720, framerate=(fraction)24/1, skip-first-bytes=2" ! decodebin ! videoconvert ! queue`
)

// Tello is a thin layer ontop of
// https://terra-1-g.djicdn.com/2d4dce68897a46b19fc717f3576b7c6a/Tello%20%E7%BC%96%E7%A8%8B%E7%9B%B8%E5%85%B3/For%20Tello/Tello%20SDK%20Documentation%20EN_1.3_1122.pdf
type Tello struct {
	commandConnection net.Conn
}

// NewTello initializes Tello
func NewTello() Tello {
	droneConnection, err := net.Dial("udp4", udpAddr+":"+strconv.Itoa(commandPort))
	if err != nil {
		fmt.Println(err)
	}

	return Tello{commandConnection: droneConnection}
}

func (tello *Tello) sendCommand(command string) {
	payload := []byte(command)
	tello.commandConnection.Write((payload))
}

func (tello *Tello) connect() {
	tello.sendCommand("command")
}

func (tello *Tello) streamOn() {
	tello.sendCommand("streamon")
}

func (tello *Tello) streamOff() {
	tello.sendCommand("streamoff")
}

func (tello *Tello) land() {
	tello.sendCommand("land")
}

func (tello *Tello) takeOff() {
	tello.sendCommand("takeoff")
}

func (tello *Tello) down(downCommand string) {
	tello.sendCommand(downCommand)
}
