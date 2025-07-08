import User from '../modules/User.js';

// POST /register (Admin adds staff)
export const registerStaff = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'staff'
    });

    res.status(201).json({
      message: 'Staff registered successfully',
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Register Staff Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// PUT /promote/:id (Admin promotes staff to admin)
export const promoteToAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = 'admin';
    await user.save();

    res.json({ message: `${user.name} promoted to admin` });
  } catch (error) {
    console.error('Promote Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
