export default new (class {
  store = {};

  setItem = (key, val) => {
    (this.store[key] = val);
  }

  getItem = key => this.store[key];
})();
