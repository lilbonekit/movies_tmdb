import './ErrorMessage.scss'

const ErrorMessage = ({msg}) => {
    return(
        <div className='error-message'>
            <span>😒</span>
            <h2>{msg}</h2>
        </div>
    )
}

export default ErrorMessage