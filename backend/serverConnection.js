

const HandelConnectionWithListeServer = (server,port) =>{
    server.listen(port, () => {
        console.log(`Server is running on port  ${port}`);
      });
    
}

export default HandelConnectionWithListeServer 