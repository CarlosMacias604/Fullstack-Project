// Seed database with default admin user
const bcrypt = require('bcryptjs');
const User = require('../Models/User');

const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ role: 'admin' });

    if (adminExists) {
      console.log('✅ Admin user already exists in database');
      return;
    }

    // Hash admin password
    const hashedPassword = await bcrypt.hash('Admin@123456', 10);

    // Create admin user
    const adminUser = new User({
      name: 'Administrator',
      email: 'admin@postspace.com',
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log('✅ Default admin user created successfully');
    console.log('📧 Email: admin@postspace.com');
    console.log('🔑 Password: Admin@123456');
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
  }
};

module.exports = seedAdmin;
