import React, { FC, useState } from 'react';
import axios from 'axios';


// Component-props typing
type FormProps = {};

/** Form fields definition.
 * @param email - string
 * @param comment - string
 * @param emailTouched - boolean
 */
interface FormFields {
  email: string;
  comment: string;
  emailTouched: boolean;
}

// Default form-field values definition
const defaultFormField: FormFields = {
  email: '',
  comment: '',
  emailTouched: false
};

const Form: FC<FormProps> = () => {

  // Form fields
  const [formFields, setFormFields] = useState(defaultFormField);
  const { email, comment, emailTouched } = formFields;

  /** Handles the submit of a form.
   * @param event - React.ChangeEvent<HTMLFormElement>
   */
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {

    event.preventDefault();

    axios.post('http://localhost:4000/posts', { email, comment })
      .then(res => console.log(res))
      .catch(error => console.log(error));

    setFormFields(defaultFormField);
  };

  /** Gets the values of 'input' and 'textarea' elements, and updates 'formFields' state.
   * @param event - React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {

    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  /** Handles a field alert for 'input-email' when is touched, to indicata that this field is required.
   * @param event - React.ChangeEvent<HTMLInputElement>
   */
  const handleTouched = (event: React.ChangeEvent<HTMLInputElement>): void => {

    const { name } = event.target;
    setFormFields({...formFields, emailTouched: true});

    if (name === 'email') {setFormFields({...formFields, emailTouched: true})};
  };

  /** Validates an email. */
  const emailValidation = (): boolean => {

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !pattern.test(email);
  }
  

  return (
    <div className='form-component mb-4'>
      <form autoComplete='off'
            className='d-flex flex-column justify-content-center'
            onSubmit={handleSubmit}>
        {/* Email */}
        <input type='email' 
               name='email' 
               className='mb-2'
               value={email} 
               placeholder='Email' 
               onChange={handleInputChange}
               onBlur={handleTouched}/>
        {
          // Email alert - input-form validation
          emailValidation() && emailTouched 
            ? <span className='form-text text-danger text-start mb-1 mt-0'>Type a valid email.</span> 
            : null
        }
        {/* Comment */}
        <textarea typeof='text' 
                  name='comment' 
                  className='mb-2 w-100'
                  rows={4} 
                  value={comment} 
                  placeholder='Add a comment' 
                  onChange={handleInputChange} />
        {/* Submit button */}
        <div className='form-footer text-end'>
          <button type='submit' className='btn btn-secondary'>Comment</button>
        </div>
      </form>
    </div>
  )
}

export default Form;
