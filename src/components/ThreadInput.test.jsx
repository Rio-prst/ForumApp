/**
 * skenario testing
 *
 * - ThreadInput component
 * - should handle title typing correctly
 * - should handle category typing correctly
 * - should handle body typing correctly
 * - should call addThread function with correct arguments when publish button is clicked
 * - should disable publish button when title or body is empty
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import ThreadInput from './ThreadInput';

expect.extend(matchers);

describe('ThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // Arrange
    render(<ThreadInput addThread={() => {}} />);
    const titleInput = await screen.getByPlaceholderText("What's on your mind?");

    // Action
    await userEvent.type(titleInput, 'Judul Diskusi Baru');

    // Assert
    expect(titleInput).toHaveValue('Judul Diskusi Baru');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    render(<ThreadInput addThread={() => {}} />);
    const categoryInput = await screen.getByPlaceholderText('e.g. Tech, Design, Career');

    // Action
    await userEvent.type(categoryInput, 'Tech');

    // Assert
    expect(categoryInput).toHaveValue('Tech');
  });

  it('should handle body typing correctly', async () => {
    // Arrange
    render(<ThreadInput addThread={() => {}} />);
    const bodyInput = await screen.getByPlaceholderText('Write your discussion content here...');

    // Action
    await userEvent.type(bodyInput, 'Ini adalah isi konten diskusi.');

    // Assert
    expect(bodyInput).toHaveValue('Ini adalah isi konten diskusi.');
  });

  it('should disable publish button when title or body is empty', async () => {
    // Arrange
    render(<ThreadInput addThread={() => {}} />);
    const publishButton = await screen.getByRole('button', { name: 'Publish Discussion' });

    // Assert
    expect(publishButton).toBeDisabled();

    // Action: Isi judul tapi konten kosong
    const titleInput = await screen.getByPlaceholderText("What's on your mind?");
    await userEvent.type(titleInput, 'Judul Saja');

    // Assert
    expect(publishButton).toBeDisabled();
  });

  it('should call addThread function with correct arguments when publish button is clicked', async () => {
    // Arrange
    const mockAddThread = vi.fn();
    render(<ThreadInput addThread={mockAddThread} />);

    const titleInput = await screen.getByPlaceholderText("What's on your mind?");
    const categoryInput = await screen.getByPlaceholderText('e.g. Tech, Design, Career');
    const bodyInput = await screen.getByPlaceholderText('Write your discussion content here...');
    const publishButton = await screen.getByRole('button', { name: 'Publish Discussion' });

    // Action
    await userEvent.type(titleInput, 'Diskusi React');
    await userEvent.type(categoryInput, 'Frontend');
    await userEvent.type(bodyInput, 'Belajar testing itu seru!');
    await userEvent.click(publishButton);

    // Assert
    expect(mockAddThread).toHaveBeenCalledWith({
      title: 'Diskusi React',
      category: 'Frontend',
      body: 'Belajar testing itu seru!',
    });
  });
});