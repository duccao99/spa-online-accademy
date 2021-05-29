import React from 'react';
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

export default function VideoPreview(props) {
  return (
    <Player muted={props.muted} poster='/assets/poster.png'>
      <source
        src={
          props.lesson_video_url
            ? props.lesson_video_url
            : 'https://www.youtube.com/watch?v=hBudaNjwaoU'
        }
      />

      <ControlBar>
        <ReplayControl seconds={10} order={1.1} />
        <ForwardControl seconds={30} order={1.2} />
        <CurrentTimeDisplay order={4.1} />
        <TimeDivider order={4.2} />
        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
        <VolumeMenuButton disabled />
      </ControlBar>
    </Player>
  );
}
