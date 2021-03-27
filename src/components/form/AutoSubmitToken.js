import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';

function AutoSubmitToken() {
  // Grab values and submitForm from context
  const { submitForm } = useFormikContext();

  useEffect(() => {
    return submitForm;
  }, [submitForm]);
  return null;
}

export default AutoSubmitToken;
