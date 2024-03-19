import React, { useRef, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import {useUserStore} from '../../src/utils/store.ts'

export default function VideoRoom({}) {
  const videoRef = useRef();
  const router = useRouter();
  const socket = useUserStore(state => state.socket);
  const currentUser = useUserStore(state => state.currentUser);
  const setCurrentUser = useUserStore(state => state.setCurrentUser);
  const isRoomCreator = router.query.isRoomCreator;
  let roomId = router.query.roomId;
  let remoteVideoComponent;
  const iceServers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun3.l.google.com:19302' },
      { urls: 'stun:stun4.l.google.com:19302' },
    ],
  }
  let rtcPeerConnection;
  let localStream;

  function addLocalTracks(rtcPeerConnection) {
    localStream.getTracks().forEach((track) => {
      rtcPeerConnection.addTrack(track, localStream)
    })
  }

  async function createOffer(rtcPeerConnection){
    try {
      const sessionDescription = await rtcPeerConnection.createOffer()
      rtcPeerConnection.setLocalDescription(sessionDescription)
    }
    catch(err){
      console.error(error)
    }
  }

  async function createAnswer(rtcPeerConnection){
    try{
      const sessionDescription = await rtcPeerConnection.createAnswer()
      rtcPeerConnection.setLocalDescription(sessionDescription)

    }catch(err){
      console.error(error)
    }
  }
  function setRemoteStream(event) {
    remoteVideoComponent.srcObject = event.streams[0]
    remoteStream = event.stream
  }
  
  socket.on('webrtc_offer', async (event) => {
    console.log('Socket event callback: webrtc_offer')
  
    if (!isRoomCreator) {
      rtcPeerConnection = new RTCPeerConnection(iceServers)
      addLocalTracks(rtcPeerConnection)
      rtcPeerConnection.ontrack = setRemoteStream
      rtcPeerConnection.onicecandidate = sendIceCandidate
      rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))
      await createAnswer(rtcPeerConnection)
    }
  })
  
  socket.on('webrtc_answer', (event) => {
    console.log('Socket event callback: webrtc_answer')
    rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))
  })
  


  socket.on("start_call",async() =>{
    console.log('Socket event callback: start_call');
    if (isRoomCreator) {
      rtcPeerConnection = new RTCPeerConnection(iceServers)
      console.log(rtcPeerConnection);
      addLocalTracks(rtcPeerConnection);
      rtcPeerConnection.ontrack = setRemoteStream;
      rtcPeerConnection.onicecandidate = sendIceCandidate;
      await createOffer(rtcPeerConnection);
    }

  });


  socket.on('webrtc_ice_candidate', (event) => {
    console.log('Socket event callback: webrtc_ice_candidate')
    const candidate = new RTCIceCandidate({
      sdpMLineIndex: event.label,
      candidate: event.candidate,
    })
    console.log(candidate,"candidate");
    rtcPeerConnection.addIceCandidate(candidate)
  })
  
  function sendIceCandidate(event) {
    if (event.candidate) {
      console.log(event);
      socket.emit('webrtc_ice_candidate', {
      roomId,
      label: event.candidate.sdpMLineIndex,
      candidate: event.candidate.candidate,
    })
  }}

  useEffect(() => {
    const constraints = {
      video: true,
      audio: true
    };

    async function getMedia(constraints) {
      localStream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = localStream;
      videoRef.current.muted = true;
    }
    getMedia(constraints);
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay style={{ marginTop:'60%', marginLeft:'80%', width: '20%', height: '20%' }}></video>
    </div>
  );
};
