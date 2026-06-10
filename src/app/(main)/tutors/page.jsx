import React from 'react';

const TutorPage = async() => {
    const res = fetch ('http://localhost:5000/tutor')
    return (
        <div>
            tutors details
        </div>
    );
};

export default TutorPage;