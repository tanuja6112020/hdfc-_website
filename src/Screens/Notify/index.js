import React, { useEffect, useState } from 'react';
import NotifyScreen from './Component/notify';
import EndPoints from '../utils/apiEndPoints';
import { apiCall } from '../utils/httpClient';
import { useParams, useHistory } from 'react-router-dom';

const NotifyView = () => {
    let { audit_id } = useParams();
    const history = useHistory();
    const [question, setquestionlist] = useState();
    const [online,setonline]=useState(false);
    var [intervalId, setintervalId] = useState('');
    const [auditStart, setAuditStart] = useState(false);
    const [imgurl, setimgurl] = useState('')
    useEffect(() => {
        HandleQuestion();
    }, [])

    const HandleQuestion = async () => {
        intervalId = window.setInterval(function () {
            handleActionable();
        }, 5000);

    }
    const handleActionable = async () => {
        try {
            const params = { audit_id: audit_id }
            const { data } = await apiCall('post', EndPoints.QUESTIONLIST, params)
            console.log('data: ', data);
            if (data.status == 200) {
                setquestionlist(data.data)
                setimgurl(data.base_url)
                setAuditStart(true)

            }else if(data.status==201)
            {
                 clearInterval(intervalId)
                history.push('/dashboard')
            }
            
            else {
                //clearInterval(intervalId)
                //history.push('/dashboard')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (<NotifyScreen
        question={question}
        imgurl={imgurl}
        online={online}
        setonline={setonline}
        auditStart={auditStart}

    />)
}

export default NotifyView;