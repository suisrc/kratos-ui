import { queryProvince, queryCity } from '../service';

import { GeographicType } from '../data';
import province from '../geographic/province.json';

export const reloadResidences = (
  ss: string[],
  setResidences: (rs: any[]) => void,
) => {
  queryProvince().then(province => {
    if (province?.success) {
      queryCity(ss[0]).then(city => {
        if (city?.success) {
          let selectProvince = province.data.find(
            (item: any) => item.id === ss[0],
          );
          if (selectProvince) {
            selectProvince.children = city.data;
          }
          province.data.map((item: any) => {
            if (!item.children) item.isLeaf = false;
          });
          setResidences([...province.data]);
        }
      });
    }
  });
};

export const getGeographicIds = (geo: GeographicType): string[] => [
  geo?.province?.id || '',
  geo?.city?.id || '',
];

export const getGeographicByIds = (ids: string[]): GeographicType => {
  return {
    province: { id: ids[0] },
    city: { id: ids[1] },
  };
};

export const getInitResidences = (geo: GeographicType) => [
  {
    ...geo?.province,
    children: [
      {
        ...geo?.city,
      },
    ],
  },
];

export const loadResidencesData = (
  selectedOptions: any,
  onSuccess?: (targetOption: any) => void,
  onError?: (response: any) => void,
) => {
  // 配置住宿筛选
  const targetOption = selectedOptions[selectedOptions.length - 1];
  targetOption.loading = true;
  if (selectedOptions.length === 1) {
    queryCity(selectedOptions[0].id).then(res => {
      if (res?.success) {
        targetOption.children = res.data;
        targetOption.loading = false;
        if (onSuccess) {
          onSuccess(targetOption);
        }
      } else if (onError) {
        onError(res);
      }
    });
  }
};
