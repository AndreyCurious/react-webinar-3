export default function (date, t) {
  if (date !== undefined) {
    const year = date.slice(0, 4);
    const day = date.slice(8, 10)
    const mounths = [t('comment.january'), t('comment.february'), t('comment.march'), t('comment.april'), t('comment.may'), t('comment.june'), t('comment.july'), t('comment.august'), t('comment.september'), t('comment.october'), t('comment.november'), t('comment.december')];
    const mounth = mounths[date.slice(5, 7) - 1]
    const time = date.slice(11, 16)

    return `${day} ${mounth} ${year} ${t('comment.in')} ${time}`
  }

}
