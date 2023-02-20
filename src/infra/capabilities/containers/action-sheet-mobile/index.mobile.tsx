import { useLectureH5UIStores } from '@classroom/infra/hooks/ui-store';
import { SvgIconEnum, SvgImg, SvgImgMobile } from '@classroom/ui-kit';
import { useI18n } from 'agora-common-libs';
import { EduClassroomConfig } from 'agora-edu-core';
import { observer } from 'mobx-react';
import { ComponentLevelRulesMobile } from '../../config';
import ClipboardJS from 'clipboard';

import './index.mobile.css';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
export const ActionSheetMobile = observer(() => {
  const ref = useRef<HTMLDivElement | null>(null);
  const transI18n = useI18n();
  const shareUrl = `${location.origin}${location.pathname}#/h5-invite?roomId=${EduClassroomConfig.shared.sessionInfo.roomUuid}`;

  const {
    layoutUIStore: { actionSheetVisible, setActionSheetVisible, landscapeToolBarVisible },
    shareUIStore: { addSingletonToast, isLandscape, forceLandscape },
  } = useLectureH5UIStores();
  const copyLink = () => {
    if (!ref.current) return;
    const clipboard = new ClipboardJS(ref.current);
    clipboard.on('success', () => {
      addSingletonToast(transI18n('fcr_copy_success'), 'normal');
      clipboard.destroy();
      setActionSheetVisible(false);
    });
  };
  return isLandscape ? (
    <>
      <div
        className="fcr-action-sheet-mobile-trigger"
        style={{
          zIndex: ComponentLevelRulesMobile.Level3,
          opacity: landscapeToolBarVisible ? 1 : 0,
          visibility: landscapeToolBarVisible ? 'visible' : 'hidden',
        }}
        onClick={() => setActionSheetVisible(true)}>
        <SvgImgMobile
          landscape={isLandscape}
          forceLandscape={forceLandscape}
          type={SvgIconEnum.SHARE_MOBILE}
          size={24}></SvgImgMobile>
      </div>
      {createPortal(
        <div
          className="fcr-action-sheet-mobile-mask"
          style={{
            display: actionSheetVisible ? 'block' : 'none',
            zIndex: ComponentLevelRulesMobile.Level3,
          }}></div>,
        document.body,
      )}

      <div
        className="fcr-action-sheet-mobile"
        style={{
          transform: `translate3d(0, ${actionSheetVisible ? '-100%' : 0}, 0)`,
          zIndex: ComponentLevelRulesMobile.Level3,
        }}>
        <div className="fcr-action-sheet-mobile-actions">
          <div
            className="fcr-action-sheet-mobile-actions-item"
            data-clipboard-text={`${shareUrl}`}
            ref={ref}
            onClick={copyLink}>
            <div className="fcr-action-sheet-mobile-actions-item-icon">
              <SvgImg
                type={SvgIconEnum.LINK_SOLID}
                size={36}
                colors={{ iconPrimary: '#fff' }}></SvgImg>
            </div>
            <div className="fcr-action-sheet-mobile-actions-item-text">
              {transI18n('fcr_copy_share_link_copy')}
            </div>
          </div>
        </div>
        <div
          className="fcr-action-sheet-mobile-cancel-btn"
          onClick={() => setActionSheetVisible(false)}>
          {transI18n('fcr_alert_cancel')}
        </div>
      </div>
    </>
  ) : null;
});
