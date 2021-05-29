import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  ControlBar,
  CurrentTimeDisplay,
  ForwardControl,
  PlaybackRateMenuButton,
  Player,
  ReplayControl,
  TimeDivider,
  VolumeMenuButton
} from 'video-react';
import 'video-react/dist/video-react.css'; // import css
import * as env from '../../config/env.config';

function VideoStudy(props) {
  const { ref, video_state, lesson_id, user_id } = props;
  const [historyTime, setHistoryTime] = useState(0);
  const handleChange = (e) => {
    // console.log(e);
  };

  function getHistory() {
    const url = `${env.DEV_URL}/api/student/history?user_id=${user_id}&lesson_id=${lesson_id}`;
    axios.get(url, {}).then((ret) => {
      console.log(ret);
      setHistoryTime(+ret.data.history_time);
    });
  }

  const handleStore = (store) => {
    // console.log(store);
  };
  const handlePlaying = (e) => {
    // console.log(e);
    // console.log(e.target.currentTime);

    // console.log('lesson id:', lesson_id);
    // console.log('user id ', user_id);

    const url = `${env.DEV_URL}/api/student/history-watching`;
    const data = {
      user_id,
      lesson_id,
      start_time: e.target.currentTime
    };
    axios.post(url, data, {}).then((ret) => {});
  };

  useEffect(() => {
    // console.log(playerReducer);
    // console.log(Bezel);
    // console.log(Video);
    // console.log(Video);
    // console.log(video_state);
    // console.log(handlePlay);
    getHistory();
  }, []);
  return (
    <Player
      ref={ref}
      onPlaying={handlePlaying}
      startTime={historyTime}
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
