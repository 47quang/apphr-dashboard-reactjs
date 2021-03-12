import { CContainer } from "@coreui/react";
import { Field, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import CommonMultiSelectInput from "src/components/input/CommonMultiSelectInput";
import CommonMultipleTextInput from "src/components/input/CommonMultipleTextInput"
import CommonTextInput from "src/components/input/CommonTextInput";
import BasicLoader from "src/components/loader/BasicLoader";
import Label from "src/components/text/Label";
import { SettingDepartmentInfoSchema } from "src/schema/formSchema";
import { useDispatch } from "react-redux";
import { changeListButtonHeader } from "src/stores/actions/header";

//TODO: translate
const listOfBranches = [
	{ id: 1, name: "APPHR Thủ Đức" },
	{ id: 2, name: "APPHR Quận 1" },
	{ id: 3, name: "APPHR Quận 2" },
	{ id: 4, name: "APPHR Quận 3" },
	{ id: 5, name: "APPHR Quận 4" },
	{ id: 6, name: "APPHR Quận 5" },
	{ id: 7, name: "APPHR Quận 6" },
	{ id: 8, name: "APPHR Quận 7" },
	{ id: 9, name: "APPHR Quận 8" },
	{ id: 10, name: "APPHR Quận 9" },
	{ id: 11, name: "APPHR Quận 10" },
];

const NewDepartment = ({ t, location, match }) => {
	const params = match.params;
	const departmentInfoForm = useRef();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const [initialValues, setInitialValues] = useState(
		{
			departmentCode: "",
			departmentName: "",
			branches: [],
			description: "",
		}
	);

	const getDepartmentInfo = () => {
		setInitialValues(
			{
				departmentCode: "IT",
				departmentName: "IT",
				branches: [1, 3, 5],
				description: "Phòng ban IT",
			}
		);
	}

	useEffect(() => {
		let wait = setTimeout(() => {
			setIsLoading(false);
		}, 500);
		if (params?.id)
			getDepartmentInfo();
		dispatch(
			changeListButtonHeader([
				<button
					className="btn btn-primary"
					type="submit"
					key="magicDepartment"
					onClick={getOnSubmitInForm}
				>
					{(params?.id) ? "Cập nhật" : "Tạo mới"}
				</button>,
			])
		);
		return () => {
			dispatch(changeListButtonHeader([]));
			clearTimeout(wait);
		};
	}, []);

	const getOnSubmitInForm = (event) =>
		departmentInfoForm.current.handleSubmit(event);

	const handleSubmitInfo = (values) => {
		console.log(values);
	};


	return (
		<CContainer fluid className="c-main mb-3 px-4">
			{isLoading ? (
				<BasicLoader isVisible={isLoading} radius={10} />
			) : (<div className="m-auto">
				<div className="shadow bg-white rounded p-4 container col-md-7">
					<Formik
						innerRef={departmentInfoForm}
						enableReinitialize
						initialValues={initialValues}
						validationSchema={SettingDepartmentInfoSchema}
						onSubmit={(values) => handleSubmitInfo(values)}
					>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleSubmit,
							handleBlur,
						}) => (
							<form autoComplete="off">
								<div className="row">
									<CommonTextInput
										containerClassName={"form-group col-lg-12"}
										value={values.departmentCode}
										onBlur={handleBlur("departmentCode")}
										onChange={handleChange("departmentCode")}
										inputID={"departmentCode"}
										labelText={"Mã phòng ban"}
										inputType={"text"}
										placeholder={"Nhập mã phòng ban"}
										inputClassName={"form-control"}
										isRequiredField
										isTouched={touched.departmentCode}
										isError={errors.departmentCode && touched.departmentCode}
										errorMessage={errors.departmentCode}
									/>
								</div>
								<div className="row">
									<CommonTextInput
										containerClassName={"form-group col-lg-12"}
										value={values.departmentName}
										onBlur={handleBlur("departmentName")}
										onChange={handleChange("departmentName")}
										inputID={"departmentName"}
										labelText={"Tên phòng ban"}
										inputType={"text"}
										placeholder={"Nhập tên phòng ban"}
										inputClassName={"form-control"}
										isRequiredField
										isTouched={touched.departmentName}
										isError={errors.departmentName && touched.departmentName}
										errorMessage={errors.departmentName}
									/>
								</div>
								<div className="row">
									<div className="form-group col-lg-12">
										<Label text="Chi nhánh:" />
										<div className="d-flex flex-row flex-wrap justify-content-between border rounded-3">
											<CommonMultiSelectInput values={values.branches} onChangeValues={handleChange("branches")} listValues={listOfBranches} />
										</div>
									</div>
								</div>

								<div className="row">
									<CommonMultipleTextInput
										containerClassName={"form-group col-lg-12"}
										value={values.description}
										onBlur={handleBlur("description")}
										onChange={handleChange("description")}
										inputID={"description"}
										labelText={"Ghi chú"}
										inputClassName={"form-control"}
									/>
								</div>
							</form>
						)}
					</Formik>
				</div>
			</div>
			)}
		</CContainer>
	);
};

export default NewDepartment;
