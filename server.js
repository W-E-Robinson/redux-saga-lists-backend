const cors = require("cors");
const express = require("express");

const app = express();
app.use(express.json());

const lists = [
    [
        {id: 1, value: "take out the rubbish", completed: false},
        {id: 2, value: "take out the garbage", completed: false},
        {id: 3, value: "walk the dog", completed: false},
    ],
    [],
];

const returnList = async (id) => {
    return lists[id - 1];
};

app.get("/lists/:id", (request, response) => {
    const id = request.params.id;

    returnList(id)
        .then(data => {
            console.log("GET /lists");
            response.status(200).json({ message: "Completed Successfully!", data: data });
        })
        .catch(error => {
            console.error("Error", error);
            response.status(500).send("500 Internal Server Error!");
        });
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Express server up on port: ${PORT}`);
});
