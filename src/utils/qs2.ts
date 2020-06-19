import { stringify } from 'qs';

// qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices' })
// // 'a[0]=b&a[1]=c'
// qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets' })
// // 'a[]=b&a[]=c'
// qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' })
// // 'a=b&a=c+
const stringify2 = (ps: { [key: string]: any } | undefined) =>
  ps ? `?${stringify(ps, { indices: false })}` : '';
const stringify3 = (ps: { [key: string]: any } | undefined) =>
  ps ? `&${stringify(ps, { indices: false })}` : '';

export { stringify, stringify2, stringify3 };
