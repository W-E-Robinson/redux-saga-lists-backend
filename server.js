const cors= require("cors");
const express = require("express");

const app = express();
app.use(express.json());
app.use(cors());

const list = [
    {id: Math.floor(Math.random() * 100000), value: "take out the rubbish", completed: false},
    {id: Math.floor(Math.random() * 100000), value: "take out the garbage", completed: false},
    {id: Math.floor(Math.random() * 100000), value: "walk the dog", completed: false},
];

const getList = async () => {
    return list;
};

const toggleItemCompletion = async (id) => {
    list[id].completed = !list[id].completed;
    return list;
};

const postItem = async (value) => {
    list.push({
        id: Math.floor(Math.random() * 100000),
        value: value,
        completed: false,
    });
    return list;
};

const deleteItem = async (id) => {
    filteredList = list.filter(item => item.id !== id);
    list = filteredList;
    return list;
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

app.patch("/list/:id", (request, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const id = request.params.id;

    toggleItemCompletion(id)
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

    if (!request.body.value) {
        response.status(400).send("Error: 'value' not present in body");
        return;
    };

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

app.delete("/list/:id", (request, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const id = request.body.id;

    deleteItem(id)
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
