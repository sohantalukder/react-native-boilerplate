const getAssetsContext = () =>
  require.context('./images', true, /\.(png|jpg|jpeg|gif|webp)$/);

const getIconsContext = () => require.context('./icons', true, /\.(tsx)$/);

export { getAssetsContext, getIconsContext };
