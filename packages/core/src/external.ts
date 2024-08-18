import { ErrorTypes, BreadCrumbTypes } from 'encode-monitor-shared';
import {
  isError,
  extractErrorStack,
  getLocationHref,
  getTimestamp,
  unknownToString,
  isWxMiniEnv,
  Severity,
  getCurrentRoute,
} from 'encode-monitor-utils';
import { transportData } from './transportData';
import { breadcrumb } from './breadcrumb';
import { TNumStrObj } from 'encode-monitor-types';

interface LogTypes {
  message: TNumStrObj;
  tag?: TNumStrObj;
  level?: Severity;
  ex?: Error | any;
  type?: string;
}
// 自定义的数据发送
export function log({
  message = 'emptyMsg',
  tag = '',
  level = Severity.Critical,
  ex = '',
  type = ErrorTypes.LOG_ERROR,
}: LogTypes): void {
  let errorInfo = {};
  if (isError(ex)) {
    errorInfo = extractErrorStack(ex, level);
  }
  // 针对输入的数据，生成 transform 之后的数据
  const error = {
    type,
    level,
    message: unknownToString(message),
    name: 'Monitor.log',
    customTag: unknownToString(tag),
    time: getTimestamp(),
    url: isWxMiniEnv ? getCurrentRoute() : getLocationHref(),
    ...errorInfo,
  };
  // 添加到行为数据中呈现
  breadcrumb.push({
    type: BreadCrumbTypes.CUSTOMER,
    category: breadcrumb.getCategory(BreadCrumbTypes.CUSTOMER),
    data: message,
    level: Severity.fromString(level.toString()),
  });
  // 发送请求
  transportData.send(error);
}
