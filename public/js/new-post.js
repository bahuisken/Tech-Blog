// Create Post Function
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#new-title').value.trim();
  const content = document.querySelector('#new-content').value.trim();
  console.log(title, content);
  if (title && content) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);
