import React from 'react';
import { usePluginStore, useTimeCounter } from './hooks';
import { observer } from 'mobx-react';
import { Button, Input, transI18n } from '~ui-kit';
import FlipClock, { formatDiff } from './flip-clock';
import { MaskCountDown } from './mask-count-down';
import { autorun } from 'mobx';

const App = observer(() => {
  const pluginStore = usePluginStore();
  const { duration, setDuration, play, reset } = useTimeCounter();
  const durationRef = React.useRef<number>(duration);
  const [caution, setCaution] = React.useState(false);

  const handleSetting = () => {
    pluginStore.handleSetting(false, {
      extra: {
        state: 1,
        startTime: Date.now() + pluginStore.getTimestampGap,
        duration: pluginStore.number != undefined ? pluginStore.number : 0,
      },
    });
    setDuration(pluginStore.number);
    play();
  };

  const handleRestart = React.useCallback(() => {
    reset();
    pluginStore.handleSetting(true, { extra: { state: 0 } });
  }, []);

  React.useEffect(() => {
    autorun(() => {
      if (
        pluginStore.context.roomProperties.extra &&
        pluginStore.context.roomProperties.extra.state &&
        pluginStore.context.roomProperties.extra.startTime
      ) {
        const serverTimeCalcByLocalTime = Date.now() + pluginStore.getTimestampGap;
        const direction =
          serverTimeCalcByLocalTime -
          (pluginStore.context.roomProperties.extra.startTime +
            pluginStore.context.roomProperties.extra.duration * 1000); // 判断方向
        if (direction < 0) {
          const duration =
            pluginStore.context.roomProperties.extra.duration -
            Math.floor(
              Math.abs(
                serverTimeCalcByLocalTime - pluginStore.context.roomProperties.extra.startTime,
              ) / 1000,
            );
          setDuration(duration);
          play();
          pluginStore.setShowSetting(false);
        }
      }
      if (
        pluginStore.context.roomProperties.extra &&
        !pluginStore.context.roomProperties.extra.state
      ) {
        reset();
        pluginStore.setShowSetting(true && pluginStore.isController);
      }
    });
  }, []);

  React.useEffect(() => {
    if (durationRef.current !== duration && duration <= 3) {
      setCaution(true);
    } else {
      setCaution(false);
    }
    durationRef.current = duration;
  }, [duration]);

  return (
    <>
      <MaskCountDown
        enable={pluginStore.maskEnable}
        content={<Button onClick={handleRestart}> {transI18n('widget_answer.restart')}</Button>}>
        <FlipClock duration={duration} caution={!pluginStore.showSetting && caution} />
      </MaskCountDown>
      {pluginStore.showSetting && (
        <div className="text-center mt-3.5">
          <Input
            value={pluginStore.number}
            onChange={(e: any) => {
              pluginStore.setNumber(e.target.value.replace(/\D+/g, ''));
              formatDiff(e.target.value.replace(/\D+/g, ''));
            }}
            suffix={
              <span
                style={{
                  color:
                    pluginStore.number != undefined &&
                    pluginStore.number <= 3600 &&
                    pluginStore.number >= 3
                      ? '#333'
                      : '#F04C36',
                }}>
                ({transI18n('widget_answer.seconds')})
              </span>
            }
            maxNumber={3600}
            style={{
              color:
                pluginStore.number != undefined &&
                pluginStore.number <= 3600 &&
                pluginStore.number >= 3
                  ? '#333'
                  : '#F04C36',
            }}
          />
          <Button
            className="btn-rewrite-disabled mt-3.5"
            onClick={handleSetting}
            disabled={
              (pluginStore.number !== undefined && pluginStore.number > 3600) ||
              pluginStore.number < 3
            }>
            {transI18n('widget_answer.start')}
          </Button>
        </div>
      )}
    </>
  );
});

export default App;