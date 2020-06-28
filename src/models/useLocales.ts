import { useState, useCallback, useEffect } from 'react';
import { useRequest, getAllLocales, addLocale } from 'umi';

import { queryLocales } from '@/services/system';

export interface LocalData {
  lang: string;
  label?: string;
  icon?: string;
  title?: string;
}

const transformArrayToObject = (allLangUIConfig: LocalData[]): LocalData[] => {
  return allLangUIConfig.reduce((obj, item) => {
    if (!item.lang) {
      return obj;
    }

    return {
      ...obj,
      [item.lang]: item,
    };
  }, {}) as LocalData[];
};

const defaultLangUConfigMap = {
  'zh-CN': {
    lang: 'zh-CN',
    label: '简体中文',
    icon: '🇨🇳',
    title: '语言',
  },
  'en-US': {
    lang: 'en-US',
    label: 'English',
    icon: '🇺🇸',
    title: 'Language',
  },
};

export default function(): {
  allLangUIConfig: LocalData[];
} {
  const [langUConfigMap, setLangUConfigMap] = useState(defaultLangUConfigMap);
  const getAllLangUIConfig = useCallback(() => {
    const defaultLangUConfig = getAllLocales().map(
      key =>
        langUConfigMap[key] || {
          lang: key,
          label: key,
          icon: '🌐',
          title: key,
        },
    );
    return transformArrayToObject(defaultLangUConfig);
  }, [langUConfigMap]);

  //const { run: getBackendLocales } = useRequest(queryLocales, {
  //  manual: true,
  //  onSuccess: (data, _) => {
  //    Object.keys(data).forEach(key => {
  //      if (data[key].data) {
  //        console.log(data[key].data);
  //        addLocale(key, {...data[key].data}, {momentLocale: 'zh-CN', antd: 'zh-CN'});
  //      }
  //    });
  //  }
  //});
  //useEffect(() => { getBackendLocales(); }, [])

  return {
    allLangUIConfig: getAllLangUIConfig(),
  };
}
