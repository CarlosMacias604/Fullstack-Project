import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ErrorAlert } from '../components/Common/ErrorAlert';
import { postService } from '../services/postService';
import { categoryService } from '../services/categoryService';
import { useAuth } from '../hooks/useAuth';
import type { Category } from '../types/index';

export const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: '',
    image: '',
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      // Ensure data is an array
      const categoriesArray = Array.isArray(data) ? data : (data as any).categories || [];
      setCategories(categoriesArray);
      if (categoriesArray.length > 0) {
        setFormData((prev) => ({ ...prev, categoryId: categoriesArray[0]._id }));
      }
    } catch (err) {
      console.error('Failed to load categories:', err);
      // Set empty array on error to prevent map error
      setCategories([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim() || !formData.categoryId) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await postService.createPost({
        title: formData.title,
        content: formData.content,
        category: formData.categoryId,
        author: user?._id || '',
        image: formData.image,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create post';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Card sx={{ maxWidth: 800, margin: '0 auto',marginY: 3 }}>
        <CardHeader title="Create New Post" titleTypographyProps={{ variant: 'h5' }} />
        <CardContent>
          {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
          {success && (
            <Alert severity="success" sx={{ marginBottom: 2 }}>
              Post created successfully! Redirecting...
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Post Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              required
              fullWidth
              disabled={loading}
              multiline={false}
            />

            <TextField
              label="Post Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your post content here..."
              required
              fullWidth
              disabled={loading}
              multiline
              rows={8}
            />

            <TextField
              label="Image URL (Optional)"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              fullWidth
              disabled={loading}
              type="url"
            />

            <FormControl fullWidth disabled={loading}>
              <InputLabel>Category</InputLabel>
              <Select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', marginTop: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/dashboard')}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Publish Post'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};
