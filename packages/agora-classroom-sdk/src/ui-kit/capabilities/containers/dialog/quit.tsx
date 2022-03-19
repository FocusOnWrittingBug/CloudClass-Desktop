import { observer } from 'mobx-react';
import { useState } from 'react';
import { useStore } from '~hooks/use-edu-stores';
import { Button, Modal, transI18n } from '~ui-kit';
import { BaseDialogProps } from '.';

export const Quit: React.FC<
  BaseDialogProps & { onOk: (back: boolean) => void; showOption: boolean }
> = observer(({ id, onOk, showOption }) => {
  const { shareUIStore } = useStore();

  const { removeDialog } = shareUIStore;

  const [type, setType] = useState<'back' | 'quit'>('back');

  return (
    <Modal
      style={{ width: 300 }}
      title={transI18n('toast.leave_room')}
      onOk={() => {
        onOk(type === 'back');
        removeDialog(id);
      }}
      onCancel={() => {
        removeDialog(id);
      }}
      footer={[
        <Button key="cancel" type={'secondary'} action="cancel">
          {transI18n('toast.cancel')}
        </Button>,
        <Button key="ok" type={'primary'} action="ok">
          {transI18n('toast.confirm')}
        </Button>,
      ]}>
      {showOption ? (
        <div className="radio-container">
          <label className="customize-radio">
            <input
              type="radio"
              name="kickType"
              value="back"
              checked={type === 'back'}
              onChange={() => setType('back')}
            />
            <span className="ml-2">{transI18n('toast.quit_room_option1')}</span>
          </label>
          <label className="customize-radio">
            <input type="radio" name="kickType" value="quit" onChange={() => setType('quit')} />
            <span className="ml-2">{transI18n('toast.quit_room_option2')}</span>
          </label>
        </div>
      ) : (
        transI18n('toast.quit_room')
      )}
    </Modal>
  );
});