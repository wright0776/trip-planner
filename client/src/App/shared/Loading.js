function Loading(props) {
    const { loading, render } = props;
    if (loading) return render();
    return props.children;
}

export default Loading;