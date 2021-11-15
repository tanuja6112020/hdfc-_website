import React from 'react';
import WelcomeAuditScreen from './Component/welcomeAudit'
import { useParams, useHistory } from 'react-router-dom';

const WelcomeAuditView = (props) => {
    let { audit_id } = useParams();
    const history = useHistory();
    console.log('audit_id: ', audit_id);

    const handlenotify = () => {
        history.push("/notify/" + audit_id);
    }
    return (<WelcomeAuditScreen
        handlenotify={handlenotify}

    />)
}
export default WelcomeAuditView;