import React, { useEffect, useRef, useState } from 'react';

export default function VoiceChat() {
  const [joined, setJoined] = useState(false);
  const peers = useRef({});
  const localStream = useRef(null);
  const ws = useRef(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://${window.location.hostname}:4001`);
    ws.current.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'id') {
        setId(data.id);
      }

      if (data.type === 'new-user' && joined) {
        startPeer(data.id, true);
      }

      if (data.type === 'offer' && data.to === id) {
        const pc = startPeer(data.from, false);
        await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        ws.current.send(
          JSON.stringify({ type: 'answer', answer, to: data.from, from: id })
        );
      }

      if (data.type === 'answer' && data.to === id) {
        const pc = peers.current[data.from];
        if (pc) {
          await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
        }
      }

      if (data.type === 'candidate' && data.to === id) {
        const pc = peers.current[data.from];
        if (pc) {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      }
    };
  }, [joined, id]);

  const startPeer = (peerId, isInitiator) => {
    if (peers.current[peerId]) return peers.current[peerId];
    const pc = new RTCPeerConnection();
    peers.current[peerId] = pc;

    localStream.current.getTracks().forEach((track) => pc.addTrack(track, localStream.current));

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        ws.current.send(
          JSON.stringify({
            type: 'candidate',
            candidate: e.candidate,
            to: peerId,
            from: id,
          })
        );
      }
    };

    pc.ontrack = (e) => {
      const audio = document.createElement('audio');
      audio.srcObject = e.streams[0];
      audio.autoplay = true;
    };

    if (isInitiator) {
      pc.onnegotiationneeded = async () => {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        ws.current.send(
          JSON.stringify({ type: 'offer', offer, to: peerId, from: id })
        );
      };
    }

    return pc;
  };

  const joinVoice = async () => {
    localStream.current = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    ws.current.send(JSON.stringify({ type: 'join-voice' }));
    setJoined(true);
  };

  return (
    <div className="mb-4">
      <button
        className="px-4 py-2 bg-green-500 text-white"
        onClick={joinVoice}
        disabled={joined}
      >
        {joined ? 'In Voice Channel' : 'Join Voice Channel'}
      </button>
    </div>
  );
}
