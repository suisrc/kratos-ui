/**
 * 一个🌰, 具有国家选项
 */
import { queryCountry1, queryProvince1, queryCity1 } from '../service';

import { GeographicType } from '../data';

export const reloadResidences = (
  ss: string[],
  setResidences: (rs: any[]) => void,
) => {
  queryCountry1().then(country => {
    if (country?.success) {
      queryProvince1(ss[0]).then(province => {
        if (province?.success) {
          queryCity1(ss[0], ss[1]).then(city => {
            if (city?.success) {
              let selectCountry = country.data.find(
                (item: any) => item.id === ss[0],
              );
              if (selectCountry) {
                selectCountry.children = province.data;
              }
              let selectProvince = province.data.find(
                (item: any) => item.id === ss[1],
              );
              if (selectProvince) {
                selectProvince.children = city.data;
              }
              country.data.map((item: any) => {
                if (!item.children) item.isLeaf = false;
              });
              province.data.map((item: any) => {
                if (!item.children) item.isLeaf = false;
              });
              setResidences([...country.data]);
            }
          });
        }
      });
    }
  });
};

export const getGeographicIds = (geo: GeographicType): string[] => [
  geo?.country?.id || '',
  geo?.province?.id || '',
  geo?.city?.id || '',
];

export const getInitResidences = (geo: GeographicType) => [
  {
    ...geo?.country,
    children: [
      {
        ...geo?.province,
        children: [
          {
            ...geo?.city,
          },
        ],
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
    queryProvince1(selectedOptions[0].id).then(res => {
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
  if (selectedOptions.length === 2) {
    queryCity1(selectedOptions[0].id, selectedOptions[1].id).then(res => {
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
