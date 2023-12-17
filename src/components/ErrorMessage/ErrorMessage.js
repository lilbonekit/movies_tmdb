import './ErrorMessage.scss'

// )))
const ErrorMessage = ({msg, smile = '😒', styles = {}}) => {
    return(
        <div className='error-message' style={styles}>
            <span>{smile}</span>
            <h2>{msg}</h2>
        </div>
    )
}

export default ErrorMessage