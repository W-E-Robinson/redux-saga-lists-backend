const cors = require("cors");
const express = require("express");

const app = express();
app.use(express.json());

//NOTE: re add multiple lists so get works as expected
const lists = [
    {id: 1, value: "take out the rubbish", completed: false},
    {id: 2, value: "take out the garbage", completed: false},
    {id: 3, value: "walk the dog", completed: false},
];

const getList = async (id) => {
    return lists[id - 1];
};

const patchList = async (id, value, completed) => {
    for (let i = 0; i < lists.length; i++) {
        if (i.id === id) {
            i.value = value;
            i.completed = completed;
        }
    }
};

const postList = async (id, value, completed) => {
    return null;
}

app.get("/lists/:id", (request, response) => {
    const id = request.params.id;

    getList(id)
        .then(data => {
            console.log("GET /lists");
            response.status(200).json({ message: "List successfully returned!", data: data });
        })
        .catch(error => {
            console.error("Error", error);
            response.status(500).send("500 Internal Server Error!");
        });
});

app.patch("/lists", (request, response) => {
    const id = request.body.id;
    const value = requst.body.value;
    const completed = request.body.value;

    patchList(id)
        .then(data => {
            console.log("PATCH /lists");
            response.status(200).json({ message: "List successfully patched!", data: data });
        })
        .catch(error => {
            console.error("Error", error);
            response.status(500).send("500 Internal Server Error!");
        });
});

app.post("/lists", (request, response) => {
    const id = request.body.id;
    const value = requst.body.value;
    const completed = request.body.value;

    postList(id)
        .then(data => {
            console.log("POST /lists");
            response.status(201).json({ message: "List successfully posted!", data: data });
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
