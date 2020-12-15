var express = require('express'); //declare variable 
var app = express();
var data =  require('./employee.json');
app.use(express.json())

app.get('/employee', (req, res) => {
    //if no data return 
    if(!data) {
        res.status(404).send('No information found')
    };
    res.send(data);
});

app.get('/employee/:id', (req, res) => {
    const findEmployee = data.employees.find(function (employee) {
        return parseInt(req.params.id) === employee.id
    });

    if(!findEmployee) {
        res.status(404).send('No information found')
    };

    res.send(findEmployee);
});

app.post('/employee', (req, res) => {
    const findEmployee = {
        id: data.employees.length + 1,
        name: req.body.name,
        salary: req.body.salary,
        department: req.body.department
    };

    if(!findEmployee) {
        res.status(404).send('Could not find information')
    };

    data.employees.push(findEmployee)

    res.send(findEmployee)

    return
});

app.put('/employee/:id', (req, res) => {
    const findEmployee = data.employees.find(function (employee) {
        return parseInt(req.params.id) === employee.id
    });

     if(!findEmployee) {
         res.status(404).send('Could not find information')
     };

    findEmployee.name = req.body.name;

     res.send(findEmployee);
});

app.delete('/employee/:id', (req, res) => {

    const findEmployee = data.employees.find(function (employees) {
        return parseInt(req.params.id) === employees.id
    })

    if(!findEmployee) {
        res.status(404).send('Could not find information')
    };

    const index = data.employees.indexOf(findEmployee);
    data.employees.splice(index, 1);

    res.send(findEmployee)
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});