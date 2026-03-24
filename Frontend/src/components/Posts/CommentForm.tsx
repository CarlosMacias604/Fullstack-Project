import React from 'react';
import {
  Box,
  Stack,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface CommentFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  disabled?: boolean;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  value,
  onChange,
  onSubmit,
  loading,
  disabled = false,
}) => {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          placeholder="Add a comment..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSubmit();
            }
          }}
          disabled={loading || disabled}
          multiline
          rows={2}
        />
        <Button
          variant="contained"
          endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
          onClick={onSubmit}
          disabled={!value.trim() || loading || disabled}
          sx={{ alignSelf: 'flex-end' }}
        >
          Post
        </Button>
      </Stack>
    </Box>
  );
};
