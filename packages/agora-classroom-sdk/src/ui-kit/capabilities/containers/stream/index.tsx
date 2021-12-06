import { CameraPlaceholderType, EduRoleTypeEnum, EduStream, EduStreamUI } from 'agora-edu-core';
import { observer } from 'mobx-react';
import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import { useStore } from '~hooks/use-edu-stores';
import classnames from 'classnames';
import './index.css';
import {
  CameraPlaceHolder,
  Popover,
  StreamIcon,
  SvgaPlayer,
  SvgImg,
  Tooltip,
  VolumeIndicator,
  SoundPlayer,
} from '~ui-kit';
import RewardSVGA from './assets/svga/reward.svga';
import RewardSound from './assets/audio/reward.mp3';

export const AwardAnimations = observer(({ stream }: { stream: EduStreamUI }) => {
  const {
    streamUIStore: { streamAwardAnims, removeAward },
  } = useStore();

  return (
    <div className="center-reward">
      {streamAwardAnims(stream).map((anim: { id: string; userUuid: string }) => {
        return (
          <React.Fragment>
            <SvgaPlayer
              key={anim.id}
              style={{ position: 'absolute' }}
              url={RewardSVGA}
              onFinish={() => {
                removeAward(anim.id);
              }}
            />
            <SoundPlayer url={RewardSound} />
          </React.Fragment>
        );
      })}
    </div>
  );
});

export const StreamPlaceholder = observer(
  ({ role, className, style }: { role: EduRoleTypeEnum; className?: any; style?: any }) => {
    const {
      streamUIStore: { notPresentText },
    } = useStore();
    const cls = classnames({
      [`video-player`]: 1,
      [`${className}`]: !!className,
    });

    return (
      // <StreamPlayerOverlay stream={stream}>
      <div style={style} className={cls}>
        <CameraPlaceHolder state={CameraPlaceholderType.notpresent} text={notPresentText(role)} />
      </div>
      // </StreamPlayerOverlay>
    );
  },
);

type TrackPlayerProps = {
  stream: EduStream;
  style?: CSSProperties;
  className?: string;
};

export const LocalTrackPlayer: React.FC<TrackPlayerProps> = observer(
  ({ style, stream, className }) => {
    const {
      streamUIStore: { setupLocalVideo, isMirror },
    } = useStore();
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (ref.current) {
        setupLocalVideo(stream, ref.current, isMirror);
      }
    }, [ref.current, stream, isMirror]);

    return <div style={style} className={className} ref={ref}></div>;
  },
);

export const RemoteTrackPlayer: React.FC<TrackPlayerProps> = observer(
  ({ style, stream, className }) => {
    const { classroomStore } = useStore();
    const { streamStore } = classroomStore;
    const { setupRemoteVideo } = streamStore;

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (ref.current) {
        setupRemoteVideo(stream, ref.current);
      }
    }, [ref.current, stream]);

    return <div style={style} className={className} ref={ref}></div>;
  },
);

const LocalStreamPlayerVolume = observer(() => {
  const { streamUIStore } = useStore();
  const { localVolume, localMicOff } = streamUIStore;

  return localMicOff ? null : <VolumeIndicator volume={localVolume * 10} />;
});

const RemoteStreamPlayerVolume = observer(({ stream }: { stream: EduStreamUI }) => {
  const { streamUIStore } = useStore();
  const { streamVolumes } = streamUIStore;

  let volumePercentage = streamVolumes.get(stream.stream.streamUuid) || 0;

  return <VolumeIndicator volume={volumePercentage * 10} />;
});

const LocalStreamPlayerTools = observer(() => {
  const { streamUIStore } = useStore();
  const { localStreamTools, toolbarPlacement } = streamUIStore;
  return localStreamTools.length > 0 ? (
    <div className={`video-player-tools`}>
      {localStreamTools.map((tool, key) => (
        <Tooltip key={key} title={tool.toolTip} placement={toolbarPlacement}>
          <span>
            <SvgImg
              canHover={tool.interactable}
              style={tool.style}
              type={tool.iconType}
              size={22}
              onClick={tool.interactable ? tool.onClick : () => {}}
            />
          </span>
        </Tooltip>
      ))}
    </div>
  ) : (
    <></>
  );
});

const RemoteStreamPlayerTools = observer(({ stream }: { stream: EduStreamUI }) => {
  const { streamUIStore } = useStore();
  const { remoteStreamTools, toolbarPlacement } = streamUIStore;
  let toolList = remoteStreamTools(stream);
  return toolList.length > 0 ? (
    <div className={`video-player-tools`}>
      {toolList.map((tool) => (
        <Tooltip title={tool.toolTip} placement={toolbarPlacement}>
          <span>
            <SvgImg
              canHover={tool.interactable}
              style={tool.style}
              type={tool.iconType}
              size={22}
              onClick={tool.onClick}
            />
          </span>
        </Tooltip>
      ))}
    </div>
  ) : (
    <></>
  );
});

const StreamPlayerWhiteboardGranted = observer(({ stream }: { stream: EduStreamUI }) => {
  const {
    streamUIStore: { whiteboardGrantUsers },
  } = useStore();
  return (
    <>
      {whiteboardGrantUsers.has(stream.fromUser.userUuid) ? (
        <div className="bottom-right-granted"></div>
      ) : null}
    </>
  );
});

const StreamPlayerOverlayAwardNo = observer(({ stream }: { stream: EduStreamUI }) => {
  const {
    streamUIStore: { awards },
  } = useStore();
  return (
    <>
      {stream.role !== EduRoleTypeEnum.teacher ? (
        <>
          <SvgImg className="stars" type="star" />
          <span className="stars-label">x {awards(stream)}</span>
        </>
      ) : null}
    </>
  );
});

const StreamPlayerOverlayLocalMicIcon = observer(({ className }: { className: string }) => {
  const { streamUIStore } = useStore();
  const { localMicIconType } = streamUIStore;
  return <StreamIcon className={className} size={18} iconType={localMicIconType} />;
});

const StreamPlayerCameraPlaceholder = observer(({ stream }: { stream: EduStreamUI }) => {
  const { streamUIStore } = useStore();
  const { cameraPlaceholderText, cameraPlaceholder } = streamUIStore;
  return (
    <CameraPlaceHolder
      style={{ position: 'absolute', top: 0 }}
      state={cameraPlaceholder(stream)}
      text={cameraPlaceholderText(stream)}
    />
  );
});

const StreamPlayerOverlayName = observer(({ stream }: { stream: EduStreamUI }) => {
  return (
    <span title={stream.stream.fromUser.userName} className="username2">
      {stream.stream.fromUser.userName}
    </span>
  );
});

const StreamPlayerOverlayMicState = observer(({ stream }: { stream: EduStreamUI }) => {
  const micStateCls = classnames({
    [`mic-state`]: 1,
    [`rtc-state-${stream.micIconClass}`]: 1,
  });
  return (
    <>
      {stream.stream.isLocal ? (
        <StreamPlayerOverlayLocalMicIcon className={micStateCls} />
      ) : (
        <StreamIcon className={micStateCls} size={18} iconType={stream.micIconType} />
      )}
    </>
  );
});

const StreamPlayerOverlay = observer(
  ({
    stream,
    className,
    children,
  }: {
    stream: EduStreamUI;
    className?: any;
    children: ReactNode;
  }) => {
    const { streamUIStore } = useStore();
    const { toolbarPlacement } = streamUIStore;

    const cls = classnames({
      [`video-player-overlay`]: 1,
      [`${className}`]: !!className,
    });

    return (
      <Popover
        // trigger={'click'} // 调试使用
        align={{
          offset: [-8, 0],
        }}
        overlayClassName="video-player-tools-popover"
        content={
          stream.stream.isLocal ? (
            <LocalStreamPlayerTools />
          ) : (
            <RemoteStreamPlayerTools stream={stream}></RemoteStreamPlayerTools>
          )
        }
        placement={toolbarPlacement}>
        <div className={cls}>
          <StreamPlayerCameraPlaceholder stream={stream} />
          {children ? children : null}
          <AwardAnimations stream={stream} />
          <div className="top-right-info">
            <StreamPlayerOverlayAwardNo stream={stream} />
          </div>
          <div className="bottom-left-info">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              {stream.stream.isLocal ? (
                <LocalStreamPlayerVolume />
              ) : (
                <RemoteStreamPlayerVolume stream={stream} />
              )}
              <StreamPlayerOverlayMicState stream={stream} />
            </div>
            <StreamPlayerOverlayName stream={stream} />
          </div>
          <div className="bottom-right-info">
            <StreamPlayerWhiteboardGranted stream={stream} />
          </div>
        </div>
      </Popover>
    );
  },
);

export const StreamPlayer = observer(
  ({
    stream,
    className,
    style: css,
  }: {
    stream: EduStreamUI;
    className?: any;
    style?: CSSProperties;
  }) => {
    const { streamUIStore } = useStore();
    const { cameraPlaceholder } = streamUIStore;
    const cls = classnames({
      [`video-player`]: 1,
      [`${className}`]: !!className,
    });

    let style: CSSProperties = { ...css };

    if (cameraPlaceholder(stream) !== CameraPlaceholderType.none) {
      style = { ...css, visibility: 'hidden' };
    }

    return (
      <StreamPlayerOverlay stream={stream}>
        {stream.stream.isLocal ? (
          <LocalTrackPlayer className={cls} style={style} stream={stream.stream} />
        ) : (
          <RemoteTrackPlayer className={cls} style={style} stream={stream.stream} />
        )}
      </StreamPlayerOverlay>
    );
  },
);

const Room1v1TeacherStream = observer(({ stream }: { stream?: EduStreamUI }) => {
  return (
    <>
      {stream ? (
        <StreamPlayer stream={stream}></StreamPlayer>
      ) : (
        <StreamPlaceholder role={EduRoleTypeEnum.teacher} />
      )}
    </>
  );
});

const Room1v1StudentStream = observer(({ stream }: { stream?: EduStreamUI }) => {
  return (
    <>
      {stream ? (
        <StreamPlayer stream={stream}></StreamPlayer>
      ) : (
        <StreamPlaceholder role={EduRoleTypeEnum.student} />
      )}
    </>
  );
});

export const Room1v1StreamsContainer = observer(({ children }: any) => {
  const { streamUIStore } = useStore();
  const { teacherCameraStream, studentCameraStream } = streamUIStore;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Room1v1TeacherStream stream={teacherCameraStream} />
      <Room1v1StudentStream stream={studentCameraStream} />
    </div>
  );
});