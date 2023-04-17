const handleDisconnect = (socket) => {
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  };
  
  export default handleDisconnect;
  