const APP = 'app';
const PAGES = 'pages';
const WIDGETS = 'widgets';
const FEATURES = 'features';
const ENTITIES = 'entities';
const SHARED = 'shared';

const availableLayerImports = {
  app: [PAGES, WIDGETS, FEATURES, ENTITIES, SHARED],
  pages: [WIDGETS, FEATURES, ENTITIES, SHARED],
  widgets: [FEATURES, ENTITIES, SHARED],
  features: [ENTITIES, SHARED],
  entities: [SHARED],
  shared: [],
};

const availableLayers = [APP, PAGES, WIDGETS, FEATURES, ENTITIES, SHARED];

const findLayer = layerPath => {
  return layerPath.split('/').find(layer => availableLayers.some(availableLayer => availableLayer === layer));
};

module.exports = {
  availableLayerImports,
  availableLayers,
  findLayer,
};
