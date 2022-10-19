export const asyncRouteHandler = (asyncRouteHandlerfn) => {
  return async (req, res, next) => {
    try {
      await asyncRouteHandlerfn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
