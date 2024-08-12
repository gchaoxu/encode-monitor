import Store from '../core/store';
import { WxPerformanceDataType, WxPerformanceItemType } from '../constant';
import { WxPerformanceItem, WxPerformanceAnyObj } from '../types/index';

function pushLife(store: Store, itemType: WxPerformanceItemType) {
  store.push(WxPerformanceDataType.WX_LIFE_STYLE, { itemType, timestamp: Date.now() });
}

function pushAction(store: Store, data: WxPerformanceItem) {
  store.push(WxPerformanceDataType.WX_USER_ACTION, { ...data, timestamp: Date.now() });
}

function pushNetwork(store: Store, data: WxPerformanceItem) {
  store.push(WxPerformanceDataType.WX_NETWORK, { ...data, timestamp: Date.now() });
}

const Events = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [WxPerformanceItemType.AppOnLaunch](args: any[]) {
    const _this = this as Store;
    const now = Date.now();
    _this.setLaunchTime(now);
    _this.push(WxPerformanceDataType.WX_LIFE_STYLE, {
      itemType: WxPerformanceItemType.AppOnLaunch,
      timestamp: now,
    });
  },
  [WxPerformanceItemType.AppOnShow]() {
    pushLife(this, WxPerformanceItemType.AppOnShow);
  },
  [WxPerformanceItemType.PageOnLoad]() {
    pushLife(this, WxPerformanceItemType.PageOnLoad);
  },
  [WxPerformanceItemType.PageOnReady]() {
    pushLife(this, WxPerformanceItemType.PageOnReady);
  },
  [WxPerformanceItemType.PageOnUnload]() {
    pushLife(this, WxPerformanceItemType.PageOnUnload);
  },
  [WxPerformanceItemType.UserTap](event: WxPerformanceAnyObj) {
    pushAction(this, { ...event, itemType: WxPerformanceItemType.UserTap });
  },
  [WxPerformanceItemType.UserTouchMove](event: WxPerformanceAnyObj) {
    pushAction(this, { ...event, itemType: WxPerformanceItemType.UserTouchMove });
  },
  [WxPerformanceItemType.WxRequest](data: WxPerformanceItem) {
    pushNetwork(this, data);
  },
  [WxPerformanceItemType.WxDownloadFile](data: WxPerformanceItem) {
    pushNetwork(this, data);
  },
  [WxPerformanceItemType.WxUploadFile](data: WxPerformanceItem) {
    pushNetwork(this, data);
  },
};
export default Events;
