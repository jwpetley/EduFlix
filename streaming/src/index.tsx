import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import * as SWRTC from '@andyet/simplewebrtc';
import styled from 'styled-components';

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

ReactDOM.render(
  <Provider store={store}>
    <Wrapper>
      <LectureDiv>
        <h1>The lecture video will go here</h1>
        <StyledLectureVideo src={getVideoURL()} controls>
          Your browser does not support the video tag.
        </StyledLectureVideo>
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