// const fade = document.getElementById('fade');

document.addEventListener('DOMContentLoaded', () => {
  const studentSigninForm = document.getElementById('student-signin-form');
  const shopSigninForm = document.getElementById('shop-signin-form');

  if (studentSigninForm || shopSigninForm) {
    studentSigninForm.addEventListener('submit', submit);
    shopSigninForm.addEventListener('submit', submit);

    async function submit(event) {
      const signinForm = event.target;

      const type =
        event.target.id === 'student-signin-form' ? 'student' : 'shop';

      console.log(`Submitted! (${type})`);

      fadeTimeout = setTimeout(() => {
        fade.classList.add('showFade');
      }, 500);

      event.preventDefault();

      const formData = new FormData(signinForm);
      const data = Object.fromEntries(formData.entries());

      try {
        console.log(`Fetching /api/${type}/signin...`);

        const response = await fetch(
          `http://localhost:4000/api/${type}/signin`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        ).finally(() => {
          clearTimeout(fadeTimeout);
          fade.classList.remove('showFade');
        });

        console.log('Fetch successful!');

        const result = await response.json();

        if (result.success) {
          alert('Sign-in successful!');
          navigateTo('index.html');
        } else {
          alert(`Sign-in failed: ${result.message}`);
        }
      } catch (error) {
        alert(`Unable to fetch: ${error}`);
        console.error(`Fetch error: ${error}`);
      }
    }
  }
});
