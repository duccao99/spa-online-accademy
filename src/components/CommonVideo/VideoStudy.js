import React, { useEffect } from 'react';
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  playerReducer,
  Bezel,
  Video
} from 'video-react';
import 'video-react/dist/video-react.css'; // import css
import { connect } from 'react-redux';
import { handlePlay } from 'video-react/lib/actions/video';
import axios from 'axios';
import * as env from '../../config/env.config';

function VideoStudy(props) {
  const { ref, video_state, lesson_id, user_id } = props;
  const handleChange = (e) => {
    // console.log(e);
  };

  const handleStore = (store) => {
    // console.log(store);
  };
  const handlePlaying = (e) => {
    console.log(e);
    console.log(e.target.currentTime);

    const url = `$`;
    const data = {};
    axios.post(url, data, {}).then((ret) => {});
  };

  useEffect(() => {
    // console.log(playerReducer);
    // console.log(Bezel);
    // console.log(Video);
    // console.log(Video);
    // console.log(video_state);
    console.log(handlePlay);
  }, [playerReducer]);
  return (
    <Player
      ref={ref}
      onPlaying={handlePlaying}
      startTime={4}
      poster='/assets/poster.png'
    >
      <source
        src={
          props.lesson_video_url
            ? props.lesson_video_url
            : 'https://www.youtube.com/watch?v=hBudaNjwaoU'
        }
      />

      <ControlBar>
        <ReplayControl seconds={10} order={1.1} />
        <ForwardControl seconds={10} order={1.2} />
        <CurrentTimeDisplay order={4} />
        <TimeDivider order={4.2} />
        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
        <VolumeMenuButton disabled />
      </ControlBar>
    </Player>
  );
}

const mapStateToProps = (state) => {
  return {
    video_state: state
  };
};
export default connect(mapStateToProps, null)(VideoStudy);
