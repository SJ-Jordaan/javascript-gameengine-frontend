function getFormInputData(formId) {
    const formInputs = Array.from(document.querySelectorAll(`#${formId} input`));
    return formInputs.reduce((acc, input) => ({...acc, [input.id]: input.value}), {});
}

export default getFormInputData;
