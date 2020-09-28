import React from 'react';
// import Context from '../contextProviders/emailProvider';
import NotificationAnimation from '../animations/Notification';


const Toast = props => {
    const { notifications } = props;
    let list = notifications.map((note, index) => {
        return(
        <NotificationAnimation duration={8000} key={"note-"+index} >
            <div className={"notification-box "+note.type}>
                <p>{note.msg}</p>
                <div className="arrow-mark"></div>
            </div>
        </NotificationAnimation>
        )
    });
    return (
        <div className="toast-notifiation">
            {list}
        </div>
    );
}
export default Toast;