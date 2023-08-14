import { useState } from "react"
// import { Clock1, ClockFill1, Home1, HomeFill1, Note1 } from '../Icons';

export const NavigationStates = () => {
    const [tabs, setTabs] = useState({
        top: [
        ],
        left: [
            // {name: 'Dashboard', subdir: '/', ref: '', soon: false, not_active: <Home1 stroke="#A2A3A9" width={20} height={20} />, active: <HomeFill1 fill="#00B451" width={20} height={20} />},
            // {name: 'Additional Service Hours', subdir: '/ehr/pre-approval/MA==', ref: 'ehr', soon: false, not_active: <Clock1 fill="#A2A3A9" width={20} height={20} />, active: <ClockFill1 fill="#00B451" width={20} height={20} />},
            // {name: 'Reports', subdir: '/reports', ref: 'reports', soon: true, not_active: <Note1 fill="#A2A3A9" width={20} height={20} />, active: <Note1 fill="#00B451" width={20} height={20} />},
            // {name: 'Analytics', subdir: '/analytics', ref: 'analytics', soon: true, not_active: <Graph1 fill="#A2A3A9" width={20} height={20} />, active: <Graph1 fill="#00B451" width={20} height={20} />},
        ]

    })
    const [tc, setTc] = useState({open: true, list: false})
    const [openWidth, setopenWidth] = useState(true)
    const [switchForm, setSwitchForm] = useState({stat: false, platform: null, links: null});

    return {
        tabs: {data: tabs, set: setTabs},
        tc: {data: tc, set: setTc},
        openWidth: {data: openWidth, set: setopenWidth},
        switchForm: {data: switchForm, set: setSwitchForm},
    }
}