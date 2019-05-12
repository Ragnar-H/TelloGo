package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"math/rand"
	"net/http"
	"strings"

	"github.com/pion/webrtc/v2"
)

// Server sets up an endpoint that negotiates and creates WebRTC
func Server() {
	address := flag.String("address", ":50000", "Address to host the HTTP server on.")
	videoSrc := flag.String("video-src", gstreamerCommand, "GStreamer video src")
	flag.Parse()
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Got a request")
		setupResponse(&w, r)
		if (*r).Method == "OPTIONS" {
			// Handle CORS
			return
		}

		var offer webrtc.SessionDescription

		err := json.NewDecoder(r.Body).Decode(&offer)
		if err != nil {
			panic(err)
		}

		tello := NewTello()
		// Start new peerConnection and create answer
		answer := droneWebRTC(offer, *videoSrc, tello)

		err = json.NewEncoder(w).Encode(answer)
		if err != nil {
			panic(err)
		}
	})

	go func() {
		panic(http.ListenAndServe(*address, nil))
	}()
	fmt.Println("Listening on", *address)
	// Block forever
	select {}
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func droneWebRTC(offer webrtc.SessionDescription, videoSrc string, tello Tello) webrtc.SessionDescription {
	config := webrtc.Configuration{
		ICEServers: []webrtc.ICEServer{
			{
				URLs: []string{"stun:stun.l.google.com:19302"},
			},
		},
	}
	m := webrtc.MediaEngine{}
	m.RegisterCodec(webrtc.NewRTPVP8Codec(webrtc.DefaultPayloadTypeVP8, 90000))

	api := webrtc.NewAPI(webrtc.WithMediaEngine(m))
	// Create a new RTCPeerConnection
	peerConnection, err := api.NewPeerConnection(config)
	if err != nil {
		panic(err)
	}

	// Setup tracks and event handlers
	firstVideoTrack, err := peerConnection.NewTrack(webrtc.DefaultPayloadTypeVP8, rand.Uint32(), "video", "droneStream")
	if err != nil {
		panic(err)
	}
	_, err = peerConnection.AddTrack(firstVideoTrack)
	if err != nil {
		panic(err)
	}

	peerConnection.OnDataChannel(func(d *webrtc.DataChannel) {
		fmt.Printf("New DataChannel %s %d\n", d.Label(), d.ID())

		// Register channel opening handling
		d.OnOpen(func() {
			fmt.Printf("Data channel '%s'-'%d' open.\n", d.Label(), d.ID())
		})

		// Register text message handling
		d.OnMessage(func(msg webrtc.DataChannelMessage) {
			fmt.Printf("Message from DataChannel '%s': '%s'\n", d.Label(), string(msg.Data))
			if string(msg.Data) == "connect" {
				fmt.Println("Attempting to connect to drone")
				tello.connect()
			}
			if string(msg.Data) == "streamon" {
				tello.streamOn()
			}
			if string(msg.Data) == "streamoff" {
				tello.streamOff()
			}
			if string(msg.Data) == "land" {
				tello.land()
			}
			if string(msg.Data) == "takeoff" {
				tello.takeOff()
			}
			if strings.Contains(string(msg.Data), "down") {
				tello.down(string(msg.Data))
			}
		})
	})

	CreateMyPipeline(webrtc.VP8, []*webrtc.Track{firstVideoTrack}, videoSrc).Start()

	// Answer WebRTC

	err = peerConnection.SetRemoteDescription(offer)
	if err != nil {
		panic(err)
	}

	answer, err := peerConnection.CreateAnswer(nil)
	if err != nil {
		panic(err)
	}

	// Sets the LocalDescription, and starts our UDP listeners
	err = peerConnection.SetLocalDescription(answer)
	if err != nil {
		panic(err)
	}

	return answer
}
