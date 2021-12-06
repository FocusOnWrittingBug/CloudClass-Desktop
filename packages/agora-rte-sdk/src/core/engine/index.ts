import { AGEventEmitter } from '../utils/events';
import { AgoraRteEngineConfig, AgoraRteRuntimePlatform } from '../../configs';
import { AgoraRteScene } from '../../scene';
import { Logger, LogFileCollection } from '../logger';
import { AgoraMediaControl } from '../media/control';
import { AGRtcManager } from '../rtc';
import { AGRtmManager } from '../rtm';
import { AgoraRteService } from '../services/api';
import { AgoraLogService } from '../services/log';
import { ReportService } from '../services/report';
import { to } from 'await-to-js';
import { AGRteErrorCode, RteErrorCenter } from '../utils/error';
import { RtcAdapterWeb } from '../rtc/adapter/web';
import { RtcAdapterElectron } from '../rtc/adapter/electron';

export class AgoraRteEngine extends AGEventEmitter {
  private _mediaControl: AgoraMediaControl;
  private _apiService: AgoraRteService;
  private _logService: AgoraLogService;
  private _rtmManager: AGRtmManager;
  private _rtcManager: AGRtcManager;

  private static _engine?: AgoraRteEngine;

  static get engine(): AgoraRteEngine {
    if (!this._engine) {
      return RteErrorCenter.shared.handleThrowableError(
        AGRteErrorCode.RTE_ERR_ENGINE_NOT_READY,
        new Error(`engine not ready`),
      );
    }
    return this._engine;
  }

  constructor(config: AgoraRteEngineConfig) {
    super();
    // there will be only 1 rte engine exist at same time
    // so it's safe to overwrite the config directly into global shared variable
    AgoraRteEngineConfig.shared = config;
    Logger.setupConsoleHijack();
    this._apiService = new AgoraRteService();
    this._logService = new AgoraLogService();
    this._rtmManager = new AGRtmManager();
    this._rtcManager = new AGRtcManager(config.rtcConfigs);
    this._mediaControl = new AgoraMediaControl(this._rtcManager);
  }

  static createWithConfig(config: AgoraRteEngineConfig): AgoraRteEngine {
    if (!this._engine) {
      this._engine = new AgoraRteEngine(config);
    }
    return this._engine;
  }

  static destroy() {
    this._engine?.logout();
    this._engine = undefined;
  }

  async login(rtmToken: string, userId: string): Promise<void> {
    ReportService.shared.pathPrefix = `/cn/v1.0/projects/${AgoraRteEngineConfig.shared.appId}/app-dev-report`;
    const ignoreUrlRegionPrefix = AgoraRteEngineConfig.shared.ignoreUrlRegionPrefix;
    this._apiService.pathPrefix = `${
      ignoreUrlRegionPrefix ? '' : '/' + AgoraRteEngineConfig.shared.region.toLowerCase()
    }/scene/apps/${AgoraRteEngineConfig.shared.appId}`;
    AgoraRteEngineConfig.shared.token = rtmToken;
    AgoraRteEngineConfig.shared.userId = userId;
    AgoraRteEngineConfig.shared.service.headers = {
      'Content-Type': 'application/json',
      'x-agora-token': rtmToken,
      'x-agora-uid': userId,
    };
    return await this._rtmManager.login(rtmToken, userId, { uploadLog: false });
  }

  logout() {
    this._rtcManager.destroy();
    this._rtmManager.destroyRtm();
  }

  static getVersion() {
    return AgoraRteEngineConfig.version;
  }

  static getRtcVersion() {
    return AgoraRteEngineConfig.shared.platform === AgoraRteRuntimePlatform.Electron
      ? RtcAdapterElectron.getRtcVersion()
      : RtcAdapterWeb.getRtcVersion();
  }

  createAgoraRteScene(sceneId: string): AgoraRteScene {
    const [rtmChannel, rtmChannelObserver] = this._rtmManager.createObserverChannel(sceneId);
    const rtcChannel = this._rtcManager.getRtcChannel(sceneId);
    return new AgoraRteScene(sceneId, {
      rtc: this._rtcManager,
      rtcChannel,
      rtm: this._rtmManager,
      rtmChannel,
      rtmChannelObserver,
    });
  }

  getAgoraMediaControl(): AgoraMediaControl {
    return this._mediaControl;
  }

  getApiService(): AgoraRteService {
    return this._apiService;
  }

  async uploadSDKLogToAgoraService(roomId: string) {
    let err;
    let files: LogFileCollection = await Logger.logger.collectLogs();
    if (files.electron) {
      [err] = await to(this._logService.uploadZipLogFile(roomId, files.electron));
      RteErrorCenter.shared.handleNonThrowableError(
        AGRteErrorCode.RTE_ERR_ELECTRON_LOG_UPLOAD_ERR,
        err as Error,
      );
    }
    if (files.web) {
      [err] = await to(this._logService.uploadLogFile(roomId, files.web));
      RteErrorCenter.shared.handleNonThrowableError(
        AGRteErrorCode.RTE_ERR_WEB_LOG_UPLOAD_ERR,
        err as Error,
      );
    }
  }
}