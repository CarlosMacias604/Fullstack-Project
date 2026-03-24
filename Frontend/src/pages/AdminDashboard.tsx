import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Tabs,
  Tab,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import type { User, Post, Category } from '../types/index';
import { userService } from '../services/userService';
import { postService } from '../services/postService';
import { categoryService } from '../services/categoryService';
import { ErrorAlert } from '../components/Common/ErrorAlert';
import { AdminStats } from '../components/Admin/AdminStats';
import { UsersManagementTab } from '../components/Admin/UsersManagementTab';
import { PostsManagementTab } from '../components/Admin/PostsManagementTab';
import { CategoriesManagementTab } from '../components/Admin/CategoriesManagementTab';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  // Users
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  // Posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  // Categories
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  // Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);
  const [openEditCategoryDialog, setOpenEditCategoryDialog] = useState(false);
  const [openViewPostDialog, setOpenViewPostDialog] = useState(false);

  const [selectedItem, setSelectedItem] = useState<{ type: string; id: string } | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingUser, setEditingUser] = useState<{ _id: string; name: string; email: string; role: string } | null>(null);
  const [editingCategory, setEditingCategory] = useState<{ _id: string; name: string } | null>(null);
  const [viewingPost, setViewingPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Stats
  const [stats, setStats] = useState({ totalUsers: 0, totalPosts: 0, totalCategories: 0 });

  // Check admin role
  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Load data
  useEffect(() => {
    if (tabValue === 0) loadUsers();
    if (tabValue === 1) loadPosts();
    if (tabValue === 2) loadCategories();
  }, [tabValue]);

  const loadUsers = async () => {
    try {
      setUsersLoading(true);
      const response = await userService.getUsers(1, 100);
      setUsers(response.users || []);
      setStats((prev) => ({ ...prev, totalUsers: response.total }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setUsersLoading(false);
    }
  };

  const loadPosts = async () => {
    try {
      setPostsLoading(true);
      const response = await postService.getPosts(1, 100);
      setPosts(response.posts || []);
      setStats((prev) => ({ ...prev, totalPosts: response.total }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setPostsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await categoryService.getCategories();
      const categoriesArray = Array.isArray(response) ? response : (response as any).categories || [];
      setCategories(categoriesArray);
      setStats((prev) => ({ ...prev, totalCategories: categoriesArray.length }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
    } finally {
      setCategoriesLoading(false);
    }
  };

  // Delete handlers
  const handleDeleteUser = async (id: string) => {
    try {
      setUsersLoading(true);
      await userService.deleteUser(id);
      setUsers(users.filter((u) => u._id !== id));
      setOpenDeleteDialog(false);
      setSelectedItem(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    } finally {
      setUsersLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      setPostsLoading(true);
      await postService.deletePost(id);
      setPosts(posts.filter((p) => p._id !== id));
      setOpenDeleteDialog(false);
      setSelectedItem(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
    } finally {
      setPostsLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      setCategoriesLoading(true);
      await categoryService.deleteCategory(id);
      setCategories(categories.filter((c) => c._id !== id));
      setOpenDeleteDialog(false);
      setSelectedItem(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category');
    } finally {
      setCategoriesLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem) return;
    if (selectedItem.type === 'user') await handleDeleteUser(selectedItem.id);
    if (selectedItem.type === 'post') await handleDeletePost(selectedItem.id);
    if (selectedItem.type === 'category') await handleDeleteCategory(selectedItem.id);
  };

  // Edit handlers
  const handleOpenEditUser = (u: User) => {
    setEditingUser({ _id: u._id, name: u.name, email: u.email, role: u.role });
    setOpenEditUserDialog(true);
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;
    try {
      setUsersLoading(true);
      await userService.updateUser(editingUser._id, {
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
      });
      // Update in list
      setUsers(
        users.map((u) =>
          u._id === editingUser._id
            ? { ...u, name: editingUser.name, email: editingUser.email, role: editingUser.role }
            : u
        )
      );
      setOpenEditUserDialog(false);
      setEditingUser(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
    } finally {
      setUsersLoading(false);
    }
  };

  const handleOpenEditCategory = (c: Category) => {
    setEditingCategory({ _id: c._id, name: c.name });
    setOpenEditCategoryDialog(true);
  };

  const handleSaveCategory = async () => {
    if (!editingCategory || !editingCategory.name.trim()) return;
    try {
      setCategoriesLoading(true);
      await categoryService.updateCategory(editingCategory._id, { name: editingCategory.name });
      setCategories(
        categories.map((c) => (c._id === editingCategory._id ? { ...c, name: editingCategory.name } : c))
      );
      setOpenEditCategoryDialog(false);
      setEditingCategory(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update category');
    } finally {
      setCategoriesLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      setCategoriesLoading(true);
      await categoryService.createCategory({ name: newCategoryName });
      setNewCategoryName('');
      setOpenCategoryDialog(false);
      loadCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create category');
    } finally {
      setCategoriesLoading(false);
    }
  };

  const handleViewPost = (p: Post) => {
    setViewingPost(p);
    setOpenViewPostDialog(true);
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            Admin Dashboard
          </Typography>

          {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

          {/* Stats Cards */}
          <AdminStats
            totalUsers={stats.totalUsers}
            totalPosts={stats.totalPosts}
            totalCategories={stats.totalCategories}
          />

          {/* Tabs */}
          <Paper sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              aria-label="admin tabs"
            >
              <Tab label="Users Management" />
              <Tab label="Posts Management" />
              <Tab label="Categories Management" />
            </Tabs>
          </Paper>

          {/* Users Tab */}
          {tabValue === 0 && (
            <UsersManagementTab
              users={users}
              loading={usersLoading}
              onEdit={handleOpenEditUser}
              onDelete={(id) => {
                setSelectedItem({ type: 'user', id });
                setOpenDeleteDialog(true);
              }}
            />
          )}

          {/* Posts Tab */}
          {tabValue === 1 && (
            <PostsManagementTab
              posts={posts}
              loading={postsLoading}
              onView={handleViewPost}
              onDelete={(id) => {
                setSelectedItem({ type: 'post', id });
                setOpenDeleteDialog(true);
              }}
            />
          )}

          {/* Categories Tab */}
          {tabValue === 2 && (
            <CategoriesManagementTab
              categories={categories}
              loading={categoriesLoading}
              onAdd={() => setOpenCategoryDialog(true)}
              onEdit={handleOpenEditCategory}
              onDelete={(id) => {
                setSelectedItem({ type: 'category', id });
                setOpenDeleteDialog(true);
              }}
            />
          )}
        </Box>
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this {selectedItem?.type}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={openEditUserDialog} onClose={() => setOpenEditUserDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Name"
              value={editingUser?.name || ''}
              onChange={(e) => setEditingUser(editingUser ? { ...editingUser, name: e.target.value } : null)}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={editingUser?.email || ''}
              onChange={(e) => setEditingUser(editingUser ? { ...editingUser, email: e.target.value } : null)}
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={editingUser?.role || ''}
                label="Role"
                onChange={(e) =>
                  setEditingUser(editingUser ? { ...editingUser, role: e.target.value } : null)
                }
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditUserDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveUser} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={openEditCategoryDialog} onClose={() => setOpenEditCategoryDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Category Name"
            value={editingCategory?.name || ''}
            onChange={(e) =>
              setEditingCategory(editingCategory ? { ...editingCategory, name: e.target.value } : null)
            }
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSaveCategory();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditCategoryDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveCategory}
            variant="contained"
            disabled={!editingCategory?.name.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="e.g., Technology"
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleAddCategory();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategoryDialog(false)}>Cancel</Button>
          <Button onClick={handleAddCategory} variant="contained" disabled={!newCategoryName.trim()}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Post Dialog */}
      <Dialog open={openViewPostDialog} onClose={() => setOpenViewPostDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Post Details</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {viewingPost && (
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Title
                </Typography>
                <Typography>{viewingPost.title}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Content
                </Typography>
                <Typography sx={{ whiteSpace: 'pre-wrap', maxHeight: 300, overflow: 'auto' }}>
                  {viewingPost.content}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Author
                </Typography>
                <Typography>{viewingPost.author.name}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Category
                </Typography>
                <Typography>{viewingPost.category.name}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Stats
                </Typography>
                <Typography>Likes: {viewingPost.likes} | Comments: {viewingPost.commentsCount}</Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewPostDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};
