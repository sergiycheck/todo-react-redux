import { Formik, Form, useField } from 'formik';

import classNames from "classnames";
import addFormStyles from "./MyTextInput.module.css";


export const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

	const errorClass = classNames(
		'invalid-feedback',
		addFormStyles['d-block']
	)
	// console.log('field meta \n', field, '\n', meta);
	// console.log('props', props);
  return (
    <>
      <input {...field} {...props} />
			{field.value !== meta.initialValue ?(
				<div>value is not saved</div>
			):null}
      {meta.touched && meta.error ? (
        <div className={errorClass}>{meta.error}</div>
      ) : null}
    </>
  );
};