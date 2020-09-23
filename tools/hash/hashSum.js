import hash from 'hash-sum';

export default (key) => {
  return hash(key);
}