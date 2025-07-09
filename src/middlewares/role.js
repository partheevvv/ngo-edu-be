export const isAdmin = (req, res, next) => {
  if (req.session?.user?.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

export const isStaff = (req, res, next) => {
  if (req.session?.user?.role === 'staff') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Staff only.' });
  }
};
