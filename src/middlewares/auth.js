export const protect = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user; 
    next();
  } else {
    return res.status(401).json({ message: 'Not authorized. Please log in.' });
  }
};
