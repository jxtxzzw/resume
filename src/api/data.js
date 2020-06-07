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
    return rec;
  });
}

export async function getFictionData() {
  const res = await getInfo('fiction');
  return res.map((row) => {
    const rec = row;
    rec.rate = parseInt(`${row.rate}`, 10);
    rec.comment = row.comment == null ? '' : row.comment;
    rec.label = row.label == null ? [] : row.label.split(',').filter((x) => x.length > 0);
    return rec;
  });
}

export async function getGameData() {
  const res = await getInfo('game');
  return res.map((row) => {
    const rec = row;
    rec.cloud = row.cloud === '1';
    rec.play = row.play === '1';
    rec.achievement = row.achievement === '1';
    rec.rate = parseInt(`${row.rate}`, 10);
    rec.comment = row.comment == null ? '' : row.comment;
    rec.label = row.label == null ? [] : row.label.split(',').filter((x) => x.length > 0);
    return rec;
  });
}

export async function getMovieData() {
  const res = await getInfo('movie');
  return res.map((row) => {
    const rec = row;
    rec.rate = parseInt(`${row.rate}`, 10);
    rec.comment = row.comment == null ? '' : row.comment;
    return rec;
  });
}

export async function getOnlineCourseData() {
  const res = await getInfo('onlinecourse');
  return res.map((row) => {
    const rec = row;
    rec.content = row.content == null ? [] : row.content.split(',').filter((x) => x.length > 0);
    return rec;
  });
}

export async function getProfessionalBookData() {
  const res = await getInfo('professionalbook');
  return res.map((row) => {
    const rec = row;
    rec.label = row.label == null ? [] : row.label.split(',').filter((x) => x.length > 0);
    return rec;
  });
}

export async function getMilestoneData() {
  return getInfo('milestone');
}
