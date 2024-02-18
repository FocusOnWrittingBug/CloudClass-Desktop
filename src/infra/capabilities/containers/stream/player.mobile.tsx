import { useStore } from '@classroom/infra/hooks/ui-store';
import { LocalTrackPlayerMobile, StreamPlayerMobile } from './index.mobile';
import { MutableRefObject, useContext, useEffect, useRef, useState } from 'react';
import { EduClassroomConfig } from 'agora-edu-core';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';
import { SvgIconEnum, SvgImg, SvgImgMobile } from '@classroom/ui-kit';
import dayjs from 'dayjs';
import { Scheduler } from 'agora-rte-sdk';
import { EduStreamUI } from '@classroom/infra/stores/common/stream/struct';
import { useI18n } from 'agora-common-libs';
import './index.mobile.css';
import Award from '../award';
import { MicrophoneIndicator } from '../action-sheet-mobile/mic';
import { PaginationMobile } from '../pagination-mobile';
import { StreamContext, StreamToolContext, convertStreamUIStatus } from './context';
const RoomBigTeacherStreamH5Tool = ({
  isPiP,
  onPiP,
  onLandscape,
  size,
  visible = false,
}: {
  isPiP: boolean;
  size: 'lg' | 'sm';
  onPiP: () => void;
  onLandscape: () => void;
  visible: boolean;
}) => {
  return (
    <div
      style={{ opacity: visible ? 1 : 0, visibility: visible ? 'visible' : 'hidden' }}
      className={`fcr-stream-mobile-tool-${size}`}>
      <SvgImg
        onClick={onPiP}
        type={isPiP ? SvgIconEnum.PIP_OFF : SvgIconEnum.PIP_ON}
        size={24}></SvgImg>
      {/* <SvgImg onClick={onLandscape} type={SvgIconEnum.LANDSCAPE} size={24}></SvgImg> */}
    </div>
  );
};
export const useMobileStreamTool = ({
  triggerRef,
  teacherCameraStream,
}: {
  triggerRef: MutableRefObject<HTMLDivElement>;
  teacherCameraStream?: EduStreamUI | undefined;
}) => {
  const [toolVisible, setToolVisible] = useState(true);
  const toolVisibleTaskRef = useRef<Scheduler.Task>();
  const toolVisibleRef = useRef<boolean>(true);
  const toggleTool = () => {
    toolVisibleTaskRef.current?.stop();
    setToolVisible(!toolVisibleRef.current);
  };
  const showTool = () => {
    toolVisibleTaskRef.current?.stop();
    setToolVisible(true);
    toolVisibleTaskRef.current = Scheduler.shared.addDelayTask(() => {
      setToolVisible(false);
    }, 4000);
  };
  useEffect(() => {
    toolVisibleRef.current = toolVisible;
  }, [toolVisible]);
  useEffect(() => {
    // showTool();
    triggerRef?.current?.addEventListener('click', toggleTool);
    return () => {
      toolVisibleTaskRef.current?.stop();
      triggerRef?.current?.removeEventListener('click', toggleTool);
    };
  });
  return {
    toolVisible,
    showTool,
  };
};
const useMobileStreamDrag = ({
  bounds = 'body',
  isPiP,
  triggerRef,
}: {
  bounds?: string;
  isPiP: boolean;
  triggerRef: MutableRefObject<HTMLDivElement>;
}) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const touchPosRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const cacheRef = useRef({ x: 0, y: 0 });
  const boundsRef = useRef({ top: 0, left: 0, right: 0, bottom: 0 });
  const handleTouchStart = (e: TouchEvent) => {
    const ele = e.targetTouches[0];
    touchPosRef.current = { x: ele.clientX, y: ele.clientY };
    const rect = triggerRef.current.getBoundingClientRect();
    const boundsContainer = document.querySelector(bounds);
    boundsRef.current.top = -rect.top;
    boundsRef.current.bottom = (boundsContainer?.clientHeight || 0) - rect.bottom;
    boundsRef.current.left = -rect.left;
    boundsRef.current.right = (boundsContainer?.clientWidth || 0) - rect.right;
  };

  const handleTouchMove = (e: TouchEvent) => {
    const target = e.targetTouches[0];
    if (target) {
      const { clientX, clientY } = target;

      let diffY = clientY - touchPosRef.current.y;
      if (diffY <= boundsRef.current.top) {
        diffY = boundsRef.current.top;
      }
      if (diffY >= boundsRef.current.bottom) {
        diffY = boundsRef.current.bottom;
      }
      let diffX = clientX - touchPosRef.current.x;
      if (diffX >= boundsRef.current.right) {
        diffX = boundsRef.current.right;
      }
      if (diffX <= boundsRef.current.left) {
        diffX = boundsRef.current.left;
      }
      const newPos = {
        x: posRef.current.x + diffX,
        y: posRef.current.y + diffY,
      };

      cacheRef.current = newPos;
      setPos(newPos);
    }
  };
  const handleTouchEnd = () => {
    posRef.current = cacheRef.current;
  };
  useEffect(() => {
    if (isPiP) {
      triggerRef.current?.addEventListener('touchstart', handleTouchStart);
      triggerRef.current?.addEventListener('touchmove', handleTouchMove);
      triggerRef.current?.addEventListener('touchend', handleTouchEnd);
    } else {
      const newPos = {
        x: 0,
        y: 0,
      };
      setPos(newPos);
      cacheRef.current = newPos;
      posRef.current = newPos;
    }
    return () => {
      triggerRef.current?.removeEventListener('touchstart', handleTouchStart);
      triggerRef.current?.removeEventListener('touchmove', handleTouchMove);
      triggerRef.current?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPiP]);
  return {
    pos,
  };
};
export const RoomBigTeacherStreamContainerMobile = observer(
  ({ stream }: { stream: EduStreamUI }) => {
    const {
      streamUIStore,
      shareUIStore: { isLandscape, setForceLandscape },
      layoutUIStore: { toggleLandscapeToolBarVisible },
    } = useStore();
    const { teacherVideoStreamSize, streamLayoutContainerCls, isPiP, setIsPiP } = streamUIStore;
    const userName = stream!.fromUser.userName;
    const streamToolContext = useContext(StreamToolContext);

    const { pos } = useMobileStreamDrag({
      isPiP,
      triggerRef: streamToolContext?.currentRef as MutableRefObject<HTMLDivElement>,
    });
    const onLandspce = () => {
      setForceLandscape(true);
    };
    const onPiP = () => {
      setIsPiP(!isPiP);
    };

    useEffect(() => {
      if (isPiP) {
        streamToolContext?.showTool?.();
      }
    }, [isPiP]);

    return (
      <div
        ref={streamToolContext?.currentRef}
        className={classnames(
          'fcr-relative',
          streamLayoutContainerCls,
          'fcr-stream-mobile',
          isPiP && 'fcr-stream-mobile-draggable',
        )}
        style={{
          ...teacherVideoStreamSize,
          transform: `translate3d(${pos.x}px,${pos.y}px,0)`,
        }}>
        <div
          className="fcr-stream-mobile-name"
          style={{
            opacity: streamToolContext?.toolVisible && !isLandscape ? 1 : 0,
            visibility: streamToolContext?.toolVisible && !isLandscape ? 'visible' : 'hidden',
          }}>
          {userName || 'teacher'}
        </div>
        <RoomBigTeacherStreamH5Tool
          isPiP={isPiP}
          visible={!!streamToolContext?.toolVisible && !isLandscape}
          size={isPiP ? 'sm' : 'lg'}
          onLandscape={onLandspce}
          onPiP={onPiP}></RoomBigTeacherStreamH5Tool>
        <StreamPlayerMobile
          onClick={toggleLandscapeToolBarVisible}
          stream={stream!}
          style={{
            width: '100%',
            height: '100%',
            position: isPiP ? 'static' : 'relative',
          }}
        />
      </div>
    );
  },
);

export const AudioRecordinDeviceIcon = observer(
  ({ size = 32, stream }: { size?: number; stream: EduStreamUI }) => {
    const {
      streamUIStore: { remoteStreamVolume, localVolume },
    } = useStore();
    const isLocalStream = !!stream?.stream.isLocal;
    const isMicMuted = !!stream?.isMicMuted;
    const volume = isLocalStream ? localVolume : remoteStreamVolume(stream);
    return (
      <div style={{ flexShrink: 0 }}>
        {isMicMuted ? (
          <SvgImg
            type={SvgIconEnum.UNMUTE_MOBILE}
            size={20}
            colors={{ iconPrimary: '#F5655C' }}></SvgImg>
        ) : (
          <MicrophoneIndicator size={size} voicePercent={volume} iconPrimary="#787676" />
        )}
      </div>
    );
  },
);
export const RoomBigStudentStreamsContainerMobile = observer(() => {
  const {
    shareUIStore: { isLandscape, forceLandscape },
    streamUIStore,
    classroomStore: {
      userStore: { rewards },
    },
    presentationUIStore: {
      mainViewStream,
      listViewStreamsByPage,
      totalPage,
      currentPage,
      setCurrentPage,
    },
  } = useStore();
  const {
    studentVideoStreamSize,
    studentCameraStreams,
    containerH5VisibleCls,
    studentVideoStreamContainerHeight,
    containerH5Extend,
    studentStreamsVisible,
    toggleStudentStreamsVisible,
    subscribeMass
  } = streamUIStore;
  const streamToolContext = useContext(StreamToolContext);
  const visible = streamToolContext?.toolVisible && studentStreamsVisible;

  useEffect(() => {
    subscribeMass(listViewStreamsByPage.map((stream) => stream.stream));
  }, [listViewStreamsByPage]);
  return (
    <div
      className={classnames(
        'fcr-items-center',
        'fcr-relative',
        containerH5Extend,
        containerH5VisibleCls,
      )}
      style={{
        height: studentVideoStreamContainerHeight,
        width: '100vw',
        background: '#F4F4FF',
      }}>
      {studentCameraStreams.length > 0 && (
        <div className="fcr-stream-collapse-mobile">
          <SvgImgMobile
            onClick={toggleStudentStreamsVisible}
            style={{ transform: `rotateX(${studentStreamsVisible ? '0deg' : '180deg'})` }}
            type={SvgIconEnum.COLLAPSE_STREAM_MOBILE}
            size={40}
            landscape={isLandscape}
            forceLandscape={forceLandscape}></SvgImgMobile>
        </div>
      )}
      {/* <div
        className={classnames(
          'fcr-items-center',
          'fcr-flex-row',
          'fcr-flex',
          'fcr-justify-start',
          // 'fcr-overflow-x-auto',
        )}> */}

      <div ref={streamToolContext?.currentRef}>
        <PaginationMobile
          onChange={setCurrentPage}
          direction="row"
          total={totalPage}
          current={currentPage}>
          {listViewStreamsByPage.map((stream) => {
            const isLocal = stream.stream.isLocal;
            const reward = rewards.get(stream.fromUser.userUuid);
            return (
              <div ref={streamToolContext?.currentRef} key={stream.stream.streamUuid} className="fcr-relative">
                {isLocal ? (
                  <LocalTrackPlayerMobile
                    key={stream.stream.streamUuid}
                    stream={stream}></LocalTrackPlayerMobile>
                ) : (
                  <StreamContext.Provider
                    value={convertStreamUIStatus(stream)}>
                    <StreamPlayerMobile
                      key={stream.stream.streamUuid}
                      style={{
                        width: studentVideoStreamSize.width,
                        height: studentVideoStreamSize.height,
                        position: 'relative',
                        flexShrink: 0,
                      }}
                      stream={stream}></StreamPlayerMobile>
                  </StreamContext.Provider>
                )}
                <div
                  className="fcr-stream-mobile-stu-top-left"
                  style={{
                    opacity: visible ? 1 : 0,
                    visibility: visible ? 'visible' : 'hidden',
                  }}>

                  <SvgImg type={SvgIconEnum.FCR_REWARD} size={20}></SvgImg>
                  <span className="fcr-stream-mobile-stu-x">x</span>
                  <span>{reward || 0}</span>
                </div>
                <div
                  className="fcr-stream-mobile-stu-bottom-left"
                  style={{
                    opacity: visible ? 1 : 0,
                    visibility: visible ? 'visible' : 'hidden',
                  }}>
                  <AudioRecordinDeviceIcon stream={stream} size={20} />
                  <span>{stream.fromUser.userName}</span>
                </div>
                <Award stream={stream} />
              </div>
            );
          })}
        </PaginationMobile>
      </div>
      {/* </div> */}
    </div>
  );
});

export const H5RoomPlaceholder = observer(() => {
  const {
    streamUIStore: { teacherCameraStream },
    layoutUIStore: { classRoomPlacholderMobileHeight },
    boardUIStore: { mounted },
    classroomStore: {
      roomStore: {
        classroomSchedule: { startTime, duration },
      },
    },
  } = useStore();
  const transI18n = useI18n();

  const endTime = (startTime || 0) + ((duration && duration * 1000) || 0);
  return (!teacherCameraStream || teacherCameraStream.isCameraMuted) && !mounted ? (
    <div
      className="fcr-mobile-room-placeholder"
      style={{ height: classRoomPlacholderMobileHeight }}>
      <p>
        {transI18n('fcr_copy_room_id')} {EduClassroomConfig.shared.sessionInfo.roomUuid}
      </p>
      <h3>{EduClassroomConfig.shared.sessionInfo.roomName}</h3>
      <p>
        {dayjs(startTime).format('YYYY.MM.DD HH:mm')}-{dayjs(endTime).format('HH:mm')}
      </p>
    </div>
  ) : null;
});