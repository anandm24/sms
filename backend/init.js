// init.js
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

async function ensureDefaultAdmin() {
  try {
    const adminExists = await Admin.findOne({ username: 'admin' });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const defaultAdmin = new Admin({
        name: 'Admin User',
        username: 'admin',
        password: hashedPassword,
        isAdmin: true
      });

      await defaultAdmin.save();
      console.log("✅ Default admin created: username=admin, password=admin123");
    } else {
      console.log("ℹ️ Admin user already exists.");
    }
  } catch (err) {
    console.error("❌ Error creating default admin:", err.message);
  }
}

module.exports = { ensureDefaultAdmin };
