// Seed database with default categories
const Category = require('../Models/Category');

const seedCategories = async () => {
  try {
    // Check if categories already exist
    const count = await Category.countDocuments();

    if (count > 0) {
      console.log('✅ Categories already exist in database');
      return;
    }

    // Default categories
    const defaultCategories = [
      { name: 'Technology' },
      { name: 'Travel' },
      { name: 'Food' },
      { name: 'Lifestyle' },
      { name: 'Business' },
      { name: 'Health' },
      { name: 'Entertainment' },
      { name: 'Education' },
    ];

    // Insert default categories
    await Category.insertMany(defaultCategories);
    console.log('✅ Default categories created successfully');
  } catch (error) {
    console.error('❌ Error seeding categories:', error.message);
  }
};

module.exports = seedCategories;
