import User from '../modules/User.js';

// POST /login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Save session (or token using JWT)
    req.session.user = {
      id: user._id,
      name: user.name,
      role: user.role,
    };

    // Role-based redirect
    if (user.role === 'admin') {
      return res.redirect('/dashboard/admin');
    } else {
      return res.redirect('/dashboard/staff');
    }

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// GET /logout
export const logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) console.error('Logout Error:', err);
    res.redirect('/login');
  });
};
