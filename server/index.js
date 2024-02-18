const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(cors())

app.listen(8080, () => {
    console.log('server listening on port 8080');
});

app.get('/', (req, res) => {
    res.send('Gotcha buddy!');
});

app.get('/getRandomStudent', async (req, res) => {
    try {
        let students = [];
        let randomLetter;
        let randomLetter2;
        do {
            randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            randomLetter2 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            
            const response = await axios.get(`https://api-lookup.dartmouth.edu/v1/lookup?q=${randomLetter}${randomLetter2}&includeAlum=false&field=uid&field=displayName&field=eduPersonPrimaryAffiliation&field=mail&field=eduPersonNickname&field=dcDeptclass&field=dcAffiliation`);

            console.log(`Request URL: https://api-lookup.dartmouth.edu/v1/lookup?q=${randomLetter}${randomLetter2}&includeAlum=false&field=uid&field=displayName&field=eduPersonPrimaryAffiliation&field=mail&field=eduPersonNickname&field=dcDeptclass&field=dcAffiliation`);

            students = response.data.users.filter(student => student.eduPersonPrimaryAffiliation === 'Student');

            if (students.length === 0) {
                console.log(`No students found for letter "${randomLetter}". Retrying...`);
            }

        } while (students.length === 0);

        res.json(students);

    } catch (error) {
        console.error('Error fetching random student:', error);
        res.status(500).send('Internal Server Error');
    }
});
