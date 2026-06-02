const registry = new Map();

function registerModel(name, model) {
  registry.set(name, model);
  return model;
}

function getModel(name) {
  return registry.get(name);
}

function hasModel(name) {
  return registry.has(name);
}

function clearRegistry() {
  registry.clear();
}

module.exports = {
  registerModel,
  getModel,
  hasModel,
  clearRegistry,
};
