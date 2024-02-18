import React from 'react'

export default function StudentCard(props) {
    console.log(props)
    const studentName = props.student.displayName;
    const studentYear = props.student.dcDeptclass;
    const studentEmail = props.student.mail;

    return (
        <>
            <div className='card'>
                <p>Student Name: {studentName}</p>
                <p>Student Department: {studentYear}</p>
                <p>Student Email: {studentEmail}</p>
            </div>
        </>
    )
}
