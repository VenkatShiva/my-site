import React, { useState, useEffect } from 'react';

// import './Toast.css';

const Toast = props => {
    const { toastList, position } = props;
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(toastList);
    }, [toastList, list]);
    const deleteToast = id => {
        // debugger;
        // let list = toastList.slice();
        const toastListItem = list.findIndex(e => e.id === id);
        list.splice(toastListItem, 1);
        setList([...list]);
    }
    return (
        <>
            <div className={`notification-container ${position}`}>
                {
                    list.map((toast, i) =>     
                        <div 
                            key={i}
                            className={`notification toast ${position}`}
                            style={{ backgroundColor: toast.backgroundColor }}
                        >
                            <button onClick={()=>deleteToast(toast.id)}> 
                                X
                            </button>
                            <div className="notification-image">
                                {/* <img src={toast.icon} alt="" /> */}
                            </div>
                            <div>
                                <p className="notification-title">{toast.title}</p>
                                <p className="notification-message">
                                    {toast.description}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}
export default Toast;