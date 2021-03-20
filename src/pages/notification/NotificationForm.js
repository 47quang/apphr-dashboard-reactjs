const { Formik } = require('formik');
const { default: CommonMultipleTextInput } = require('src/components/input/CommonMultipleTextInput');
const { default: CommonMultiSelectInput } = require('src/components/input/CommonMultiSelectInput');
const { default: CommonTextInput } = require('src/components/input/CommonTextInput');
const { default: CommonUploadFileButton } = require('src/components/input/CommonUploadFileButton');
const { default: FormHeader } = require('src/components/text/FormHeader');
const { default: Label } = require('src/components/text/Label');

const NotificationForm = ({ notificationInfo }) => {
  return (
    <div className="shadow bg-white rounded p-4 container">
      <FormHeader text="Thông báo" />
      <Formik initialValues={notificationInfo} enableReinitialize onSubmit={(values) => console.log(values)}>
        {({ values, handleChange, handleBlur, errors, touched, handleSubmit }) => (
          <form>
            <div className="form-group col-lg-12">
              <Label text="Đến" required={true} />
              <div className="d-flex flex-row flex-wrap justify-content-between border">
                <CommonMultiSelectInput values={values.to} listValues={[]} onChangeValues={handleChange('to')} />
              </div>
            </div>
            <CommonTextInput
              containerClassName={'form-group col-lg-12'}
              value={values.title}
              onBlur={handleBlur('title')}
              onChange={handleChange('title')}
              inputID={'title'}
              labelText={'Tiêu đề'}
              inputType={'text'}
              placeholder={'Nhập tiêu đề'}
              inputClassName={'form-control'}
              isRequiredField
              isTouched={touched.title}
              isError={errors.title && touched.title}
              errorMessage={errors.title}
            />
            <CommonMultipleTextInput
              containerClassName={'form-group col-lg-12'}
              value={values.content}
              onBlur={handleBlur('content')}
              onChange={handleChange('content')}
              inputID={'content'}
              labelText={'Nội dung'}
              placeholder={''}
              inputClassName={'form-control'}
              rows={10}
            />
            <CommonUploadFileButton name={'files'} containerClassName="form-group col-lg-12" buttonClassName="btn btn-primary" value={values.files} />
          </form>
        )}
      </Formik>
    </div>
  );
};
export default NotificationForm;
