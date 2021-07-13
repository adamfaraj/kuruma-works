// export let Years;

const url = 'https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getYears';

const Years = () => {
  return fetch(url)
  .then(res => res.text())
  .then(res => res.slice(2, res.length - 2))
  .then(res => JSON.parse(res))
  .then(res => {
    return res.Years
  })
}

export default Years;
