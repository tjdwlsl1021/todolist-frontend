function Input(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <label>
                Todo &nbsp;
                <input type="text" required={true} value={props.input} onChange={props.handleChange} />
                {/* onChange값이 변경되었을 때 할일 */}
            </label>
            <input type="submit" value="Create" />
        </form>
    )
}

export default Input;
