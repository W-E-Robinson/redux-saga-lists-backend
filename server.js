const cors= require("cors");
const express = require("express");

const app = express();
app.use(express.json());
app.use(cors());

let list = [
    {id: 0, value: "take out the rubbish", completed: false},
    {id: 1, value: "take out the garbage", completed: false},
    {id: 2, value: "walk the dog", completed: false},
];

const getList = async () => {
    return list;
};

const completeItem = async (id) => {
    list[id].completed = true;
};

const postItem = async (value) => {
    list.push({
        id: Math.floor(Math.random() * 1000),
        value: value,
        completed: false,
    });
};

const deleteItem = async (id) => {
    filteredList = list.filter(item => item.id !== id);
    list = filteredList;
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
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const id = request.body.id;

    completeItem(id)
        .then(data => {
            console.log("PATCH /list");
            response.status(201).json({ message: "Item successfully patched!", data: data });
        })
        .catch(error => {
            console.error("Error", error);
            response.status(500).send("500 Internal Server Error!");
        });
});

app.post("/list", (request, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const value = request.body.value;

    postItem(value)
        .then(data => {
            console.log("POST /list");
            response.status(201).json({ message: "Item successfully posted!", data: data });
        })
        .catch(error => {
            console.error("Error", error);
            response.status(500).send("500 Internal Server Error!");
        });
});

app.delete("/list", (request, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const id = request.body.id;

    postItem(id)
        .then(data => {
            console.log("DELETE /list");
            response.status(201).json({ message: "Item successfully deleted!", data: data });
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
