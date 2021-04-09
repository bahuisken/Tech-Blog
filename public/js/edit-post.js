

//Edit / Update Post Function
const editFormHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#edit-id').value.trim();
  const title = document.querySelector('#edit-title').value.trim();
  const content = document.querySelector('#edit-content').value.trim();

  if (id && title && content) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({id, title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post');
    }
  }
};

//Delete Post
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('post-id')) {
    const id = event.target.getAttribute('post-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

  document
  .querySelector('.edit-post-form')
  .addEventListener('submit', editFormHandler);

  document
  .querySelector('.post-btns')
  .addEventListener('click', delButtonHandler);