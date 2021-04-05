import React from 'react'
import moment from 'moment';
import { activeNote } from '../../actions/notes';
import { useDispatch } from 'react-redux';


export const JournalEntry = ({ id, date, title, body, url }) => {


    const dispatch = useDispatch();


    const noteDate = moment(date);

    const handleEntry = () => {
        dispatch(
            activeNote(id, {
                date, title, body, url
            })
        );


    }


    return (
        <div
            className="journal__entry pointer animate__animated animate__fadeInDownBig animate__delay-1s"
            onClick={handleEntry}>
            {

                url &&

                <div className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url} )`,
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('ddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        

        </div>
    )
}
