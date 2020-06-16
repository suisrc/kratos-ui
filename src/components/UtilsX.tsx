import React from 'react';

export type FormatNumberType = {
  text: string;
  unit: number;
};

export const DefaultFNT: FormatNumberType[] = [
  { text: '亿', unit: 100000000 },
  { text: '百万', unit: 1000000 },
  { text: '万', unit: 10000 },
];

export const DFNT: FormatNumberType[] = [
  { text: 'B', unit: 100000000 },
  { text: 'M', unit: 1000000 },
  { text: 'K', unit: 10000 },
];

//const formatNum: FormatNumberType[] = [
//  {
//    text: i18n.formatMessage({
//      id: 'page.account.center.applications.million.text',
//      defaultMessage: '百万',
//    }),
//    unit: 1000000,
//  },
//  {
//    text: i18n.formatMessage({
//      id: 'page.account.center.applications.10thousand.text',
//      defaultMessage: '万',
//    }),
//    unit: 10000,
//  },
//];

export function formatNumber(val: number, units: FormatNumberType[] = DFNT) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';
  let type = units.find(item => val >= item.unit);

  let result: React.ReactNode = val;
  if (!type) {
    return result;
  }
  return (
    <span>
      {Math.floor(val / type.unit)}
      <span
        style={{
          position: 'relative',
          top: -2,
          fontSize: 14,
          fontStyle: 'normal',
          marginLeft: 2,
        }}
      >
        {type.text}
      </span>
    </span>
  );
}
