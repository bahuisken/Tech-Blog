// Create Comment Function
const newCommentHandler = async (event) => {
  event.preventDefault();

  const user_name =
    document.querySelector('#comment-name').value.trim() || 'Anonymous';
  const comment = document.querySelector('#comment-body').value.trim();
  const post_id = document.querySelector('#post-id').value.trim();

  if (post_id && comment && user_name) {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ post_id, comment, user_name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert('Failed to create comment');
    }
  }
};

const showCommentFormHandler = () => {
  document.querySelector('#comment-btn-div').style.display = 'none';
  document.querySelector('#comment-form-holder').style.display = 'block';
};

const closeCommentFormHandler = () => {
  document.querySelector('#comment-btn-div').style.display = 'block';
  document.querySelector('#comment-form-holder').style.display = 'none';
};

document
  .querySelector('.comment-post-form')
  .addEventListener('submit', newCommentHandler);

document
  .querySelector('#comment-btn')
  .addEventListener('click', showCommentFormHandler);

document
  .querySelector('#comment-cancel-btn')
  .addEventListener('click', closeCommentFormHandler);
