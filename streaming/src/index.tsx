import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import * as SWRTC from '@andyet/simplewebrtc';
import styled from 'styled-components';
import io from 'socket.io-client';
import { string } from 'yargs';

// ====================================================================
// IMPORTANT SETUP
// ====================================================================
// Replace `YOUR_PUBLISHABLE_API_KEY` here with the Publishable API Key
// you received when signing up for SimpleWebRTC
// --------------------------------------------------------------------
const API_KEY = '716625839d6dd087acb04de6';
// ====================================================================

const ROOM_NAME = 'YOUR_ROOM_NAME';
const ROOM_PASSWORD = 'YOUR_ROOM_PASSWORD';
const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${API_KEY}`;

const store = SWRTC.createStore();

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`

const LectureDiv = styled.div`
  flex: 1 1 50%;

`

const StreamingDiv = styled.div`
  flex: 1 1 50%;
`

const StyledStream = styled(SWRTC.Video)`
  width: 100%;
`

const StyledLectureVideo = styled.video`
  width: 100%;
`

interface PeerVideosProps {
  peers: SWRTC.Peer[];
}
class PeerVideos extends React.Component<PeerVideosProps> {
  render() {
    const otherVideos = this.props.peers.map((peer) => {
      console.log(peer)
      return <SWRTC.RemoteMediaList
        peer={peer.address}
        render={({ media }) => {
          const videoStreams = media.filter(m => m.kind === 'video' && !m.remoteDisabled);
          if (videoStreams.length > 0) {
            return <div key={peer.id}>
              <p>Video for Peer {peer.id}</p>
              <StyledStream media={videoStreams[0]}></StyledStream>
            </div>
          }
          return <h1>Can't find video for peer</h1>
        }}
      />;
    })
    return otherVideos;
  }
}

function getVideoURL(): string {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const link = urlParams.get('s3link')
    if (link == null) {
      return ''
    }
    return link
}

interface ChatProps {}
interface ChatState {
  message: string
  messages: string[]
}

interface Message {
  message: string
  username: string
}

const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = (roomId: string) => {
  const initialState: Message[] = []
  const [messages, setMessages] = React.useState(initialState); // Sent and received messages
  const socketRef = React.useRef<SocketIOClient.Socket>();

  React.useEffect(() => {
    
    // Creates a WebSocket connection
    socketRef.current = io(SOCKET_SERVER_URL, {
      // query: { roomId },
    });
    
    // Listens for incoming messages
    socketRef.current.on("new_message", (message: Message) => {
      console.log("Got new message")
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.username === socketRef.current?.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });
    
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody: any) => {
    console.log("Sending message")
    console.log(socketRef)
    socketRef.current?.emit("new_message", {
      message: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};

const Chat = (props: ChatProps) => {

  // constructor(props: any) {
  //   super(props)
  //   this.state = {message: '', messages: []}
  //   this.sendMessage = this.sendMessage.bind(this)
  //   this.handleChange = this.handleChange.bind(this)

  // }


  // sendMessage() {
  //   console.log('send')
  //   socket.emit('new_message', {message : this.state.message})
  // }
  
  // handleChange(event: any) {
  //   this.setState({message: event.target.value});
  // }

  // render() {
    const { messages, sendMessage } = useChat('roomId');
    const [newMessage, setNewMessage] = React.useState("");
    console.log(messages)
    const handleNewMessageChange = (event: any) => {
      setNewMessage(event.target.value);
    };
  
    const handleSendMessage = () => {
      sendMessage(newMessage);
      setNewMessage("");
    };

    return <div>
      <section id="chatroom">
        <section id="feedback"></section>
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
            >
              {message.message}
            </li>
          ))}
        </ol>
      </section>

      <section id="input_zone">
        <input id="message" className="vertical-align" type="text" onChange={handleNewMessageChange} />
        <button id="send_message" className="vertical-align" type="button" onClick={handleSendMessage}>Send</button>
      </section>
    </div>
  // }
}

ReactDOM.render(
  <Provider store={store}>
    <Wrapper>
      <LectureDiv>
        <h1>The lecture video will go here</h1>
        <StyledLectureVideo src={getVideoURL()} controls>
          Your browser does not support the video tag.
        </StyledLectureVideo>
        <Chat />
      </LectureDiv>
      <StreamingDiv>
        <SWRTC.Provider configUrl={CONFIG_URL}>
          {/* Render based on the connection state */}
          <SWRTC.Connecting>
            <h1>Connecting...</h1>
          </SWRTC.Connecting>

          <SWRTC.Connected>
            <h1>Connected!</h1>
            {/* Request the user's media */}
            <SWRTC.RequestUserMedia audio video auto />

            {/* Enable playing remote audio. */}
            <SWRTC.RemoteAudioPlayer />

            {/* Connect to a room with a name and optional password */}
            <SWRTC.Room name={ROOM_NAME} password={ROOM_PASSWORD}>
              {({ peers }) => {
                
                /* Use the rest of the SWRTC React Components to render your UI */
                return <>
                  {/* Render the local person's video */}
                  <SWRTC.LocalMediaList 
                    shared={true}
                    render={({ media }) => {
                      const videos = media.filter(m => m.kind === 'video');
                      if (videos.length > 0) {
                        return (
                          <>
                            {videos.map(m =>
                                <>
                                  <p>Local Video</p>
                                  <StyledStream key={m.id} media={m} />
                                </>
                            )}
                          </>
                        );
                      }
                      return <h1>No Stream For Local User - is your webcam on?</h1>;
                    }}
                  />
                  {/* Loop over the peers and render their video */}
                  <PeerVideos peers={peers} />
                </>
              }}
            </SWRTC.Room>
          </SWRTC.Connected>
        </SWRTC.Provider>
      </StreamingDiv>
    </Wrapper>
  </Provider>,
  document.getElementById('root')
);