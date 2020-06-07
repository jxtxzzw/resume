import { getInfo } from './util';

export async function getOJData() {
  const res = await getInfo('oj');
  return res.map((row) => {
    const rec = row;
    rec.ds = row.ds === null ? [] : row.ds.split(',').filter((x) => x.length > 0);
    rec.algs = row.algs === null ? [] : row.algs.split(',').filter((x) => x.length > 0);
    return rec;
  });
}

export async function getCertificationData() {
  const res = await getInfo('certification');
  return res.map((row) => {
    const rec = row;
    rec.src = row.dir + row.filename;
    rec.dir = undefined;
    rec.filename = undefined;
    return rec;
  });
}
