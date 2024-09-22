import viteLogo from '/vite.svg';  // Import the Vite logo for use in your app (optional)
import './App.css';  // Import the CSS file for styling
import { useFormik } from 'formik';  // Import the Formik library to handle form states and validation
import * as yup from 'yup';  // Import Yup for validation schema

function App() {
  // useFormik is a hook from Formik that handles form states, validation, and submission.
  const formik = useFormik({
    // initialValues defines the initial state of the form fields.
    initialValues: {
      email: '',  // Initial value for the email field
      password: ''  // Initial value for the password field
    },
    
    // validationSchema is the Yup schema used to validate form fields.
    validationSchema: yup.object({
      email: yup.string().email("Invalid email format").required("Required"), // Validates email to be a string, a valid email, and required
      password: yup.string().min(8, "Minimum 8 characters").required("Required")  // Validates password to be a string, at least 8 characters long, and required
    }),
    
    // onSubmit is the function that runs when the form is submitted.
    onSubmit: (values) => {
      // This will log the form values (email and password) when the form is submitted.
      console.log(values);
    }
  });

  return (
    <>
      {/* Form container */}
      <div>
        {/* The form element with the onSubmit handler provided by Formik */}
        <form onSubmit={formik.handleSubmit}>
          {/* Email field */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Email</label>
            <input
              type='email'
              name='email'
              // formik.handleChange automatically updates form state when a user types in the input.
              onChange={formik.handleChange}
              // formik.onBlur is triggered when the input loses focus, marking the field as "touched."
              onBlur={formik.onBlur}
              // formik.values.email gives the current value of the email input.
              value={formik.values.email}
            />
          </div>
          {/* Conditionally show email validation error if field has been touched and contains an error */}
          {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}

          {/* Password field */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Password</label>
            <input
              type='password'
              name='password'
              // formik.handleChange updates form state when the user types in the password field.
              onChange={formik.handleChange}
              // formik.onBlur marks the password field as touched when it loses focus.
              onBlur={formik.onBlur}
              // formik.values.password gives the current value of the password input.
              value={formik.values.password}
            />
          </div>
          {/* Conditionally show password validation error if field has been touched and contains an error */}
          {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}

          {/* Submit button */}
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;  // Export the App component to be used in other parts of the application
