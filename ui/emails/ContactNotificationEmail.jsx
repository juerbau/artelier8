export default function ContactNotificationEmail({
                                                     firstName,
                                                     lastName,
                                                     email,
                                                     message,
                                                 }) {
    return (
        <div>
            <p>{firstName} {lastName}</p>
            <p>{email}</p>
            <br />
            <p>{message}</p>
        </div>
    )
}