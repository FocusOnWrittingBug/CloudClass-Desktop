import React, { FC } from 'react';
import classnames from 'classnames';
import { BaseProps } from '@classroom/ui-kit/components/util/type';
import { Progress } from '@classroom/ui-kit/components/progress';
import './index.css';
import loadingGif from './assets/loading.gif';
import circleLoadingGif from './assets/circle-loading.gif';
import { SvgImg, SvgIconEnum } from '@classroom/ui-kit';
import { useI18n } from 'agora-common-libs';

enum CloudDriveResourceUploadStatus {
  Pending = 'pending',
  Success = 'success',
  Failed = 'failed',
  Canceled = 'canceled',
}

export interface UploadItem {
  resourceUuid: string;
  iconType?: string;
  fileName?: string;
  fileSize?: string;
  currentProgress?: number; // 当uploadComplete为true时生效
  status: CloudDriveResourceUploadStatus;
}

export interface LoadingProps extends BaseProps {
  hasLoadingGif?: boolean;
  loadingText?: string;
  hasProgress?: boolean;
  currentProgress?: number; // 当hasProgress为true时生效
  footer?: React.ReactNode[];
  uploadItemList?: UploadItem[];
  onClick?: (id: string, type: 'delete' | 'click') => void;
  noCloseBtn?: boolean;
  showUploadOpeBtn?: boolean;
  onRetry?: (resourceUuid: string) => void;
  onCancel?: (resourceUuid: string) => void;
}

export interface CircleLoadingProps extends BaseProps {
  width?: string;
  height?: string;
}

export const Loading: FC<LoadingProps> = ({
  hasLoadingGif = true,
  loadingText = '',
  hasProgress = false,
  currentProgress = 50,
  footer = [],
  uploadItemList = [],
  className,
  onClick,
  noCloseBtn,
  showUploadOpeBtn = false,
  onRetry,
  onCancel,
  ...restProps
}) => {
  const transI18n = useI18n();
  const cls = classnames({
    [`fcr-loading`]: 1,
    [`${className}`]: !!className,
  });
  return (
    <div className={cls} {...restProps}>
      {hasLoadingGif ? (
        <img
          src={loadingGif}
          width="60"
          height="60"
          style={{ marginBottom: 4 }}
          alt="loading gif"
        />
      ) : (
        ''
      )}
      {loadingText ? <span className="fcr-loading-text">{loadingText}</span> : ''}
      {hasProgress ? (
        <div className="fcr-loading-progress">
          <Progress width={160} type="download" progress={currentProgress} />
          <span className="fcr-loading-progress-number">{currentProgress}%</span>
        </div>
      ) : (
        ''
      )}
      {uploadItemList && uploadItemList.length ? (
        <div className="fcr-loading-upload-list">
          {uploadItemList.map((item, index) => (
            <div className="fcr-loading-upload-item" key={index}>
              <div>
                <SvgImg type={item.iconType as any} style={{ color: '#F6B081' }} />
              </div>
              <div className="fcr-loading-file-name" title={item.fileName}>
                {item.fileName}
              </div>
              <div className="fcr-loading-file-size">{item.fileSize}</div>
              <div>
                {item.status === CloudDriveResourceUploadStatus.Success && (
                  <div className="fcr-loading-progress">
                    <Progress
                      width={60}
                      type="download"
                      progress={item.currentProgress as number}
                    />
                    {/* <span className="upload-pending-text">{item.currentProgress}%</span> */}
                    <span className="fcr-upload-success-text">
                      {transI18n('whiteboard.upload-success')}
                    </span>
                  </div>
                )}
                {(item.status === CloudDriveResourceUploadStatus.Pending ||
                  item.status === CloudDriveResourceUploadStatus.Failed) && (
                  <div className="fcr-loading-progress">
                    {item.status === CloudDriveResourceUploadStatus.Pending && (
                      <>
                        <Progress
                          width={60}
                          type="download"
                          progress={item.currentProgress as number}
                        />
                        <span className="fcr-upload-pending-text">{item.currentProgress}%</span>
                      </>
                    )}
                    {item.status === CloudDriveResourceUploadStatus.Failed && (
                      <span className="fcr-upload-error-text">
                        {transI18n('whiteboard.upload-error')}
                      </span>
                    )}

                    <span style={{ display: 'flex' }}>
                      {item.status === CloudDriveResourceUploadStatus.Failed && (
                        <SvgImg
                          type={SvgIconEnum.CLOUD_REFRESH}
                          size={24}
                          style={{ color: '#7B88A0', cursor: 'pointer' }}
                          onClick={() => {
                            onRetry && onRetry(item.resourceUuid);
                          }}
                        />
                      )}
                      {item.status === CloudDriveResourceUploadStatus.Pending && (
                        <SvgImg
                          type={SvgIconEnum.CLOSE}
                          size={24}
                          style={{ color: '#7B88A0', cursor: 'pointer' }}
                          onClick={() => {
                            onCancel && onCancel(item.resourceUuid);
                          }}
                        />
                      )}
                    </span>
                  </div>
                )}
              </div>
              <div>
                {noCloseBtn ? (
                  ''
                ) : (
                  <SvgImg
                    type={SvgIconEnum.DELETE}
                    style={{
                      marginLeft: 60,
                      cursor: 'pointer',
                      color: '#273D75',
                    }}
                    onClick={() => onClick && onClick(index.toString(), 'delete')}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
      {footer && footer.length ? (
        <div className="fcr-loading-btn-line">
          {footer.map((item: any, index) => (
            <span key={index} style={{ margin: '0px 5px' }}>
              {React.cloneElement(item, {})}
            </span>
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export const CircleLoading: FC<CircleLoadingProps> = ({ width = '60', height = '60' }) => {
  return <img src={circleLoadingGif} width={width} height={height} alt="loading gif" />;
};
