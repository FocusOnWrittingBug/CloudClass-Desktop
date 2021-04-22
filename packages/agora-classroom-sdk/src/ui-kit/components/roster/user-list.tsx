import { ActionTypes, Icon, t, transI18n } from '@/ui-kit'
import classnames from 'classnames'
import React, { ReactNode, useCallback } from 'react'
import Draggable from 'react-draggable'
import { Col, Row, Table, TableHeader } from '~components/table'
import { canHover, canOperate, getCameraState, getMicrophoneState, ProfileRole } from './base'

export type StudentRosterColumn = {
  key: StudentRosterColumnKey;
  name: string;
  action?: ActionTypes;
  visibleRoles?: string[];
  render?: (text: string, profile: StudentRosterProfile, hover: boolean, userType?: string) => ReactNode;
}

export interface StudentRosterProfile {
  uid: string | number;
  name: string;
  cameraEnabled: boolean;
  micEnabled: boolean;
}

export type StudentRosterActionTypes =
  | 'camera'
  | 'mic'
  | 'kick-out'
  | string

export type StudentRosterColumnKey = 
  | 'camera'
  | 'mic'
  | 'kick-out'
  | 'name'

export type StudentRosterProps = {
  isDraggable: boolean;
  columns?: StudentRosterColumn[];
  title?: string;
  dataSource?: StudentRosterProfile[];
  teacherName: string;
  localUserUuid: string;
  role: ProfileRole;
  userType?: 'teacher' | 'student';
  onClick?: (action: StudentRosterActionTypes, uid: string | number) => void;
  onClose?: () => void;
  onChange: (evt: any) => void;
}

const defaultStudentColumns: StudentRosterColumn[] = [
  {
    key: 'name',
    name: 'student.student_name',
  },
  {
    key: 'camera',
    name: 'student.camera',
    action: 'camera',
    render: (_, profile, hover) => {
      const {
        className,
        type,
      } = getCameraState(profile)

      const cls = classnames({
        [`${className}`]: 1,
        // [`disabled`]: profile.disabled
      })
      return (
        <span className="camera-enabled">
          <Icon
            hover={hover}
            className={cls}
            type={type}
          />
        </span>
      )
    },
  },
  {
    key: 'mic',
    name: 'student.microphone',
    action: 'mic',
    render: (_, profile, hover) => {
      const {
        className,
        type,
      } = getMicrophoneState(profile)

      const cls = classnames({
        [`${className}`]: 1,
        // [`disabled`]: profile.disabled
      })
      return (
        <span className="mic-enabled">
          <Icon
            hover={hover}
            className={cls}
            type={type}
          />
        </span>
      )
    },
  },
  {
    key: 'kick-out',
    name: 'student.operation',
    action: 'kick-out',
    visibleRoles: ['assistant', 'teacher'],
    // FIXME: 不能点击时的样式
    render: (_, profile, hover) => {
      return (
        <span className="kick-out">
          <Icon hover={hover} type="exit" />
        </span>
      )
    },
  }
]

export const StudentRoster: React.FC<StudentRosterProps> = ({
  isDraggable = true,
  title,
  teacherName,
  localUserUuid,
  dataSource,
  columns = defaultStudentColumns,
  role,
  userType,
  onClose = () => console.log('onClose'),
  onClick,
  onChange
}) => {

  const cols = columns.filter(({visibleRoles = []}: any) => visibleRoles.length === 0 || visibleRoles.includes(role))

  const DraggableContainer = useCallback(({ children }: { children: React.ReactChild }) => {
    return isDraggable ? <Draggable>{children}</Draggable> : <>{children}</>
  }, [isDraggable])

  return (
    <DraggableContainer>
      <div className="agora-board-resources roster-user-list-wrap">
        <div className="btn-pin">
          <Icon type="close" style={{ cursor: 'pointer' }} hover onClick={() => {
            onClose()
          }}></Icon>
        </div>
        <div className="main-title">
          {title ?? transI18n('scaffold.user_list')}
        </div>
        <div>
          <div className="roster-header">
            <div>
              <label>{t('roster.teacher_name')}</label>
              <span className="roster-username">{teacherName}</span>
            </div>
            <input type="text" placeholder={transI18n('scaffold.search_user')} onChange={onChange} />
          </div>
          <Table className="roster-table">
            <TableHeader>
              {cols.map((col: StudentRosterColumn) => (
                <Col key={col.key}>{transI18n(col.name)}</Col>
              ))}
            </TableHeader>
            <Table className="table-container">
              {dataSource?.map((data: StudentRosterProfile) => (
                <Row className={'border-bottom-width-1'} key={data.uid}>
                  {cols.map((col: StudentRosterColumn, idx: number) => (
                    <Col key={col.key}>
                      <span
                        className={
                          `${idx === 0 ? 'roster-username' : ''} ${canOperate(role, localUserUuid, data, col) ? 'action' : ''}`
                        }
                        onClick={
                          canOperate(role, localUserUuid, data, col)
                            ? () =>
                              col.action &&
                              onClick &&
                              onClick(col.action, data.uid)
                            : undefined
                        }>
                        {col.render
                          ? col.render((data as any)[col.key], data, canHover(role, localUserUuid, data, col), userType)
                          : (data as any)[col.key]}
                      </span>
                    </Col>
                  ))}
                </Row>
              ))}
            </Table>
          </Table>
        </div>
      </div>
    </DraggableContainer>
  )
}