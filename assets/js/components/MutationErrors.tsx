import React from 'react';

export type MutationErrorsType = React.FC<{
    errorObject: any //TODO: Try to find a better way
}>
//TODO: Добавить стили
const MutationErrors: MutationErrorsType = ({ errorObject }) => {
    const errorList = [];
    if (errorObject.data && errorObject.data.violations) {
        for (const index in errorObject.data.violations) {
            const violation = errorObject.data.violations[index];

            errorList.push(violation.propertyPath + ': ' + violation.message);
        }
    } else if (errorObject.data && errorObject.data.detail) {
        errorList.push(errorObject.data.detail);
    } else {
        errorList.push('Error saving data');
    }

    return (
        <ul>
            {errorList.map((error, index) => (
                <li key={index}>{error}</li>
            ))}
        </ul>
    );
};

export default MutationErrors;