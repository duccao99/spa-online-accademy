import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  PlayToggle,
  ControlBar,
  CurrentTimeDisplay,
  ForwardControl,
  PlaybackRateMenuButton,
  Player,
  ReplayControl,
  TimeDivider,
  VolumeMenuButton
} from 'video-react';
import ReactPlayer from 'react-player/lazy';
import 'video-react/dist/video-react.css'; // import css
import * as env from '../../config/env.config';

function VideoStudy(props) {
  const { video_state, lesson_id, user_id } = props;
  const videoRef = useRef(null);
  const [historyTime, setHistoryTime] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function getHistory() {
    const url = `${env.DEV_URL}/api/student/history?user_id=${user_id}&lesson_id=${lesson_id}`;
    axios.get(url, {}).then((ret) => {
      setHistoryTime(+ret.data.history_time);
    });
  }

  const handleStore = (store) => {};
  const handlePlaying = (time) => {
    const url = `${env.DEV_URL}/api/student/history-watching`;
    const data = {
      user_id: +user_id,
      lesson_id: +lesson_id,
      start_time: +time
    };
    axios.post(url, data, {}).then((ret) => {});
  };

  useEffect(() => {
    getHistory();
  }, []);

  const continueHistoryTime = () => {
    if (videoRef.current !== null) {
      videoRef.current.seekTo(historyTime);
    }
  };

  if (historyTime !== null) {
    continueHistoryTime();
  }

  return (
    <ReactPlayer
      ref={videoRef}
      url={
        props.lesson_video_url
          ? props.lesson_video_url
          : 'https://www.youtube.com/watch?v=hBudaNjwaoU'
      }
      onPlay={() => setIsPlaying(true)}
      onProgress={(time) =>
        isPlaying && handlePlaying(Math.floor(time.playedSeconds))
      }
      width='100%'
      height='100%'
      controls={true}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    video_state: state
  };
};
export default connect(mapStateToProps, null)(VideoStudy);
