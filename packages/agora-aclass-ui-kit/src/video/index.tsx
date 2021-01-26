import React, { ReactChild, ReactElement, useCallback } from 'react'
import { Box, IconButton } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { CustomButton } from 'src/button'
import { CustomizeTheme } from 'src/theme'
import MuteCam from './assets/mute-camera.png'
import MuteMic from './assets/mute-mic.png'
import UnMuteCam from './assets/unmute-camera.png'
import UnMuteMic from './assets/unmute-mic.png'
import TeacherIcon from './assets/teacher.png'
import StudentIcon from './assets/student.png'
import TrophyIcon  from './assets/trophy.png'
import { TextEllipsis } from 'src/typography'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    avBtn: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 44,
      position: 'absolute',
      right: 4,
      bottom: 3
    },
    root: {
      width: '199px',
      height: '144px',
      border: '5px solid #75C0FF',
      borderRadius: '7px',
      display: 'flex',
      position: 'relative',
    },
    minimalBtn: {
      padding: 0,
      position: 'absolute',
      top: '3px',
      right: '3px',
      justifyContent: 'center',
      alignItems: 'center',
      width: 12,
      minWidth: 12,
      height: 12,
      borderRadius: 3,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.26)'
      },
      '&:active': {
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
      },
    },
    minimalStyle: {
      background: '#ffffff',
      border: '1px solid #ffffff',
      position: 'absolute',
      width: 7,
    },
    minimalIcon: {
      color: '#ffffff',
      position: 'absolute',
      top: -10,
      left: -3,
    },
    trophyNum: {
      paddingLeft: 3,
      paddingRight: 3,
      position: 'absolute',
      top: 3,
    },
    idCard: {
      paddingLeft: 3,
      paddingRight: 3,
      position: 'absolute',
      bottom: 3,
    },
    ellipticBox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 18,
      maxWidth: 95,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: 15,
      fontSize: 10,
      paddingLeft: 4,
      paddingRight: 4,
      color: '#ffffff'
    },
    teacherIcon: {
      background: `url(${TeacherIcon}) no-repeat`,
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      height: 14,
      width: 13,
      margin: '0 2px'
    },
    studentIcon: {
      background: `url(${StudentIcon}) no-repeat`,
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      height: 14,
      width: 13,
      margin: '0 2px'
    },
    UnMuteCameIcon: {
      background: `url(${UnMuteCam}) no-repeat`,
      backgroundPosition: 'center',
      backgroundSize: 'contain'
    },
    UnMuteMicIcon: {
      background: `url(${UnMuteMic}) no-repeat`,
      backgroundPosition: 'center',
      backgroundSize: 'contain'
    },
    MuteCameIcon: {
      background: `url(${MuteCam}) no-repeat`,
      backgroundPosition: 'center',
      backgroundSize: 'contain'
    },
    MuteMicIcon: {
      background: `url(${MuteMic}) no-repeat`,
      backgroundPosition: 'center',
      backgroundSize: 'contain'
    },
    btnRoot: {
      padding: 0,
      '&:hover': {
      }
    },
  })
)

interface MediaButtonProps {
  muted: boolean,
  onClick: VideoItemOnClick
}

const IconItem = (props: any) => (
  <Box width="18px" height="18px" className={props.className} component="div">
  </Box>
)

const BaseIconButton = (props: any) => (
  <IconButton disableRipple disableFocusRipple edge={false} {...props}>
  </IconButton>
)

const VideoIconButton = (props: MediaButtonProps) => {

  const classes = useStyles()

  const className = props.muted ? classes.MuteCameIcon : classes.UnMuteCameIcon

  const onClick = useCallback(() => {
    if (props.onClick) {
      props.onClick({
        sourceType: 'video',
        muted: props.muted
      })
    }
  }, [props.onClick, props.muted])

  return (
    <BaseIconButton className={classes.btnRoot} onClick={onClick}>
      <IconItem className={className} />
    </BaseIconButton>
  )
}

const AudioIconButton = (props: MediaButtonProps) => {

  const classes = useStyles()
  const className = props.muted ? classes.MuteMicIcon : classes.UnMuteMicIcon

  const onClick = useCallback(() => {
    if (props.onClick) {
      props.onClick({
        sourceType: 'audio',
        muted: props.muted
      })
    }
  }, [props.onClick, props.muted])

  return (
    <BaseIconButton className={classes.btnRoot} onClick={onClick}>
      <IconItem className={className} />
    </BaseIconButton>
  )
}

interface EllipticBoxProps {
  children: ReactElement | null
}

const EllipticBox = (props: EllipticBoxProps) => {
  const classes = useStyles()
  return (
    <Box component="div" className={classes.ellipticBox}>
      {props.children ? props.children : null}
    </Box>
  )
}

interface TrophyBoxProps {
  iconUrl: string,
  number: number
}

const TrophyBox = (props: TrophyBoxProps) => {
  return (
    <EllipticBox>
      <>
        <div style={{
          background: `url(${props.iconUrl}) no-repeat`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          width: 18,
          height: 18,
          // marginLeft: 5,
          marginRight: 5,
        }}></div>
        <TextEllipsis
          maxWidth={25}
          style={{
            color: '#FFD919',
            fontSize: 8.3,
          }}
        >
          x{props.number}
        </TextEllipsis>
      </>
    </EllipticBox>
  )
}

interface ParticipantIdentityCardProps {
  nickname: string,
  role: string
}

const ParticipantIdentityCard = (props: ParticipantIdentityCardProps) => {
  const classes = useStyles()

  let defaultRoleClassKey = classes.studentIcon

  const roles = {
    'teacher': classes.teacherIcon,
    'student': classes.studentIcon
  }

  const roleKey = roles[props.role] || defaultRoleClassKey

  return (
    <Box component="div" className={classes.idCard}>
      <EllipticBox>
        <>
          <div className={roleKey}></div>
          <div>{props.nickname}</div>
        </>
      </EllipticBox>
    </Box>
  )
}

export type VideoItemOnClick = (target: VideoItem) => any

export type VideoItem = {
  sourceType: string,
  muted?: boolean,
  uid?: number,
}

export interface VideoFrameProps {
  uid: number,
  nickname: string,
  minimal: boolean,
  resizable: boolean,
  videoState: boolean,
  audioState: boolean,
  trophyNumber: number,
  role: string,
  children: ReactChild | null,
  onClick: VideoItemOnClick,
}

const VideoFrame = (props: VideoFrameProps) => {
  const classes = useStyles()

  const onClick = useCallback((evt: VideoItem) => 
    props.onClick({...evt, uid: props.uid})
  , [props.uid])

  const onClickMinimize = useCallback(() => {
    onClick({
      sourceType: 'minimal',
      uid: props.uid
    })
  }, [props.uid, onClick])
  
  return (
    <Box component="div" className={classes.root}>
      <Box
        className={classes.trophyNum}
        component="div">
        <TrophyBox iconUrl={TrophyIcon} number={5} />
      </Box>
      <CustomButton
        component="div"
        className={classes.minimalBtn}
        onClick={onClickMinimize}>
        <hr className={classes.minimalStyle}/>
      </CustomButton>
      <ParticipantIdentityCard
        nickname={props.nickname}
        role={props.role}
      />
      <Box className={classes.avBtn} component="div">
        <VideoIconButton muted={props.videoState} onClick={onClick} />
        <AudioIconButton muted={props.audioState} onClick={onClick}/>
      </Box>
    </Box>
  )
}

export interface VideoProps extends VideoFrameProps {
  className: string
}

export const Video = ({children, ...props}: VideoProps) => {
  return (
    <CustomizeTheme>
      <VideoFrame
        {...props}
      >
        {children ? children : null}
      </VideoFrame>
    </CustomizeTheme>
  )
}