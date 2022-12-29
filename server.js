const cors= require("cors");
const express = require("express");

const app = express();
app.use(express.json());
app.use(cors());

const list = [
    {id: 1, value: "take out the rubbish", completed: false},
    {id: 2, value: "take out the garbage", completed: false},
    {id: 3, value: "walk the dog", completed: false},
];

const getList = async () => {
    return list;
};

const patchItem = async (id, value, completed) => {
    for (let i = 0; i < list.length; i++) {
        if (i.id === id) {
            i.value = value;
            i.completed = completed;
        }
    }
};

const postItem = async (id, value, completed) => {
    return null;
};

const deleteItem = async (id) => {
    return null;
};

app.get("/list", (request, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');

    getList()
        .then(data => {
            console.log("GET /list");
            if (data) {
                response.status(200).json({ message: "List successfully returned!", data: data });
            } else {
                response.status(200).json({ message: "That list doesn't exist!", data: [] });
            }
        })
        .catch(error => {
            console.error("Error", error);
            response.status(500).send("500 Internal Server Error!");
        });
});

app.patch("/list", (request, response) => {
    const id = request.body.id;
    const value = requst.body.value;
    const completed = request.body.value;

    patchItem(id)
        .then(data => {
            console.log("PATCH /list");
            response.status(200).json({ message: "List successfully patched!", data: data });
        })
        .catch(error => {
            console.error("Error", error);
            response.status(500).send("500 Internal Server Error!");
        });
});

app.post("/list", (request, response) => {
    const id = request.body.id;
    const value = requst.body.value;
    const completed = request.body.value;

    postItem(id)
        .then(data => {
            console.log("POST /list");
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
