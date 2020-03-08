# Tello on the web via WebRTC

## What is this?
Playing around with the [Tello SDK](https://terra-1-g.djicdn.com/2d4dce68897a46b19fc717f3576b7c6a/Tello%20%E7%BC%96%E7%A8%8B%E7%9B%B8%E5%85%B3/For%20Tello/Tello%20SDK%20Documentation%20EN_1.3_1122.pdf)

![](./demo.gif)

## Built with
* [Pion](https://github.com/pion/) to handle all things WebRTC
* [GStreamer](https://gstreamer.freedesktop.org/) for parsing video stream
* [React](https://reactjs.org/) for UI

## Development

You need to install GStreamer locally unfortunately.
Follow [these steps](https://gstreamer.freedesktop.org/documentation/installing/index.html?gi-language=c)

### Make

```
make install
```

```
make start_client
```

```
make start_server
```

### WIP Docker
WebRTC negotiates and connects on a random UDP port. This means that all UDP ports need to be forwarded or docker need to run on [host network](https://docs.docker.com/network/host/)


## Debug

Run video stream via GStreamer CLI
```
gst-launch-1.0 -v udpsrc port=11111 caps="video/x-h264, stream-format=(string)byte-stream, width=(int)960, height=(int)720, framerate=(fraction)24/1, skip-first-bytes=2" \
    ! queue \
    ! decodebin \
    ! videoconvert \
    ! autovideosink sync=false
```
