import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

export const HomeStates = () => {
    const [tasks, setTask] = useState({
        search: '',
        date_filter: {toggled: false, start: moment(moment().subtract(3, 'days').format('MMMM-DD-YYYY [00:00:01]')).toDate(), end: moment(moment().add(3, 'days').format('MMMM-DD-YYYY [23:23:59]')).toDate()},
        selected: {
            toggled: false,
            task: null
        },
        trash: [],
        list: [
            {
                id: uuidv4(),
                title: 'Morning task',
                task: 'Finish all task on or before 11AM',
                date: moment().toDate(),
                files: [],
                status: 1,
                trashed: false,
                subtask: [
                    {value:'Exercise in th morning', stat: false,msg: '', disabled: false},
                    {value:'Eat breakfast', stat: false,msg: '', disabled: false},
                    {value:'Take a bath', stat: false,msg: '', disabled: false},
                    {value:'Go to office', stat: false,msg: '', disabled: false},
                    {value:'Pass tech exam', stat: false,msg: '', disabled: false}
                ]
            }
        ]
    })

    const [form, setForm] = useState({
        method: null,
        toggled: false,
        confirmation: {toggled: false, type: ''},
        submitted: false,
        id: null,
        inputs: {
            title: {value: '', stat: false, msg: '', disabled: false},
            task: {value: '', stat: false, msg: '', disabled: false},
            date: {value: '', stat: false, msg: '', disabled: false},
            subtask: {
                toggled: false,
                list: [{value: '', stat: false, msg: '', disabled: false}]
            },
            files: [
                // {value: null, object: null, name: 'default_avatar', type: 'default', updated: false, size: 0, stat: false, msg: ''}
            ]
        }
    })

    return {
        tasks: {data: tasks, set: setTask},
        form: {data: form, set: setForm},
    }
}