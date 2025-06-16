function handleSignaling(data, senderId, clients) {
  const target = clients.get(data.to);
  if (target && target.readyState === 1) {
    target.send(
      JSON.stringify({
        type: data.type,
        from: senderId,
        to: data.to,
        offer: data.offer,
        answer: data.answer,
        candidate: data.candidate,
      })
    );
  }
  if (data.type === 'join-voice') {
    clients.forEach((client, id) => {
      if (id !== senderId && client.readyState === 1) {
        client.send(JSON.stringify({ type: 'new-user', id: senderId }));
      }
    });
  }
}

module.exports = { handleSignaling };
