const express = require('express');
const app = new express();
const port = 3050;

app.get('/', (res, req) => {
    return 'yes';
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
