import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadInput({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (title.trim() && body.trim()) {
      addThread({ title, body, category });
    }
  };

  return (
    <form className="thread-input" onSubmit={onSubmitHandler}>
      <div className="input-group-horizontal">
        <label htmlFor="title" className="input-label-fixed">Title</label>
        <div className="input-control-wrapper">
          <input
            type="text"
            id="title"
            placeholder="What's on your mind?"
            value={title}
            onChange={onTitleChange}
            required
          />
        </div>
      </div>

      <div className="input-group-horizontal">
        <label htmlFor="category" className="input-label-fixed">Category</label>
        <div className="input-control-wrapper">
          <input
            type="text"
            id="category"
            placeholder="e.g. Tech, Design, Career"
            value={category}
            onChange={onCategoryChange}
          />
          <p className="input-info-hint">Choose the most relevant category</p>
        </div>
      </div>

      <div className="input-group-vertical">
        <label htmlFor="body">Content</label>
        <textarea
          id="body"
          placeholder="Write your discussion content here..."
          value={body}
          onChange={onBodyChange}
          required
        />
      </div>

      <button
        type="submit"
        className="btn-publish-main"
        disabled={!title.trim() || !body.trim()}
      >
        Publish Discussion
      </button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;