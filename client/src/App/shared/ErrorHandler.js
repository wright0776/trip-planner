function ErrorHandler(props) {
    const { errMsg, render } = props;
    if (errMsg) return render(errMsg);
    return props.children;
}

export default ErrorHandler;