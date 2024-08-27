// frontend/script.js
document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = {
      fullName: formData.get('fullName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      sendTo: formData.get('sendTo'),
      subject: formData.get('subject'),
      description: formData.get('description')
    };
  
    fetch('http://localhost:8000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text);  // Throw error with text response
        });
      }
      return response.json();
    })
    .then(result => {
      alert(result.message || 'Email sent successfully!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert(`Error sending email: ${error.message}`);
    });
  });
  