export const asyncRouteHandler = (asyncRouteHandlerfn) => {
  return async (req, res, next) => {
    asyncRouteHandlerfn(req, res, next);
  };
  try {
  } catch (error) {
    next(error);
  }
};
