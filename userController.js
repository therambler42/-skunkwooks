// User Controller - Clean Backend Logic
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { sendEmail } = require('../utils/emailService');
const { generatePassword } = require('../utils/passwordGenerator');
const { logActivity } = require('../utils/activityLogger');

class UserController {
  /**
   * Get paginated list of users
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getUsers(req, res) {
    try {
      const {
        page = 1,
        limit = 10,
        search = '',
        role = '',
        status = '',
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;

      // Build query
      const query = {};
      
      if (search) {
        query.$or = [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }

      if (role) {
        query.role = role;
      }

      if (status) {
        query.status = status;
      }

      // Calculate pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const sortOptions = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

      // Execute query
      const [users, totalUsers] = await Promise.all([
        User.find(query)
          .select('-password')
          .sort(sortOptions)
          .skip(skip)
          .limit(parseInt(limit))
          .populate('role', 'name permissions')
          .lean(),
        User.countDocuments(query)
      ]);

      const totalPages = Math.ceil(totalUsers / parseInt(limit));

      res.json({
        success: true,
        data: {
          users,
          pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalUsers,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
          }
        }
      });

    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch users',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  /**
   * Get user by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id)
        .select('-password')
        .populate('role', 'name permissions')
        .lean();

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: user
      });

    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  /**
   * Create new user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createUser(req, res) {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const {
        firstName,
        lastName,
        email,
        role,
        department,
        phoneNumber,
        sendWelcomeEmail = true
      } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      // Generate temporary password
      const tempPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(tempPassword, 12);

      // Create user
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        department,
        phoneNumber,
        status: 'active',
        isEmailVerified: false,
        mustChangePassword: true,
        createdBy: req.user.id
      });

      await user.save();

      // Send welcome email with temporary password
      if (sendWelcomeEmail) {
        try {
          await sendEmail({
            to: email,
            subject: 'Welcome to ERP System',
            template: 'welcome',
            data: {
              firstName,
              email,
              tempPassword,
              loginUrl: process.env.FRONTEND_URL + '/login'
            }
          });
        } catch (emailError) {
          console.error('Failed to send welcome email:', emailError);
          // Don't fail user creation if email fails
        }
      }

      // Log activity
      await logActivity({
        userId: req.user.id,
        action: 'USER_CREATED',
        details: `Created user: ${firstName} ${lastName} (${email})`,
        ipAddress: req.ip
      });

      // Return user without password
      const userResponse = await User.findById(user._id)
        .select('-password')
        .populate('role', 'name permissions')
        .lean();

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: userResponse
      });

    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create user',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  /**
   * Update user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateUser(req, res) {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { id } = req.params;
      const updateData = { ...req.body };

      // Remove sensitive fields that shouldn't be updated via this endpoint
      delete updateData.password;
      delete updateData.email; // Email changes should go through separate verification
      delete updateData.createdAt;
      delete updateData.createdBy;

      // Add update metadata
      updateData.updatedAt = new Date();
      updateData.updatedBy = req.user.id;

      const user = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      )
        .select('-password')
        .populate('role', 'name permissions')
        .lean();

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Log activity
      await logActivity({
        userId: req.user.id,
        action: 'USER_UPDATED',
        details: `Updated user: ${user.firstName} ${user.lastName} (${user.email})`,
        ipAddress: req.ip
      });

      res.json({
        success: true,
        message: 'User updated successfully',
        data: user
      });

    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update user',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  /**
   * Delete user (soft delete)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      // Prevent self-deletion
      if (id === req.user.id) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete your own account'
        });
      }

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Soft delete
      user.status = 'deleted';
      user.deletedAt = new Date();
      user.deletedBy = req.user.id;
      await user.save();

      // Log activity
      await logActivity({
        userId: req.user.id,
        action: 'USER_DELETED',
        details: `Deleted user: ${user.firstName} ${user.lastName} (${user.email})`,
        ipAddress: req.ip
      });

      res.json({
        success: true,
        message: 'User deleted successfully'
      });

    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete user',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  /**
   * Reset user password
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async resetPassword(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Generate new temporary password
      const tempPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(tempPassword, 12);

      // Update user
      user.password = hashedPassword;
      user.mustChangePassword = true;
      user.passwordResetAt = new Date();
      user.passwordResetBy = req.user.id;
      await user.save();

      // Send password reset email
      try {
        await sendEmail({
          to: user.email,
          subject: 'Password Reset - ERP System',
          template: 'password-reset',
          data: {
            firstName: user.firstName,
            tempPassword,
            loginUrl: process.env.FRONTEND_URL + '/login'
          }
        });
      } catch (emailError) {
        console.error('Failed to send password reset email:', emailError);
        return res.status(500).json({
          success: false,
          message: 'Password reset but failed to send email'
        });
      }

      // Log activity
      await logActivity({
        userId: req.user.id,
        action: 'PASSWORD_RESET',
        details: `Reset password for user: ${user.firstName} ${user.lastName} (${user.email})`,
        ipAddress: req.ip
      });

      res.json({
        success: true,
        message: 'Password reset successfully. New password sent via email.'
      });

    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to reset password',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

module.exports = new UserController();

