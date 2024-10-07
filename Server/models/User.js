const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // User's name
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/, // Simple regex for email validation
    }, // User's email (must be unique)
    password: { type: String, required: true }, // User's password (hashed before saving)
    role: {
      type: String,
      default: 'Student',
      enum: ['Student', 'Instructor'], // Role-based access
    },
  },
  { timestamps: true } // Automatically create createdAt and updatedAt fields
);

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash the password if it has been modified
  const salt = await bcrypt.genSalt(10); // Generate salt
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next(); // Proceed to save the user
});

// Method to compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password); // Compare candidate password with stored hash
};

// Export the User model
module.exports = mongoose.model('User', userSchema);
