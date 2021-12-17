//const todosUrl = "http://localhost:3001/todos/";
const todosUrl = "http://localhost:3002/todos/";

const getById = async (id) => {
    const url = todosUrl + id.toString();
    let responseData;
    try {
        const response = await fetch(url);
        const contentType = response.headers.get('Content-Type');
        if (contentType === "application/json; charset=utf-8") {
            responseData = await response.json();
        }
        else {
            responseData = await response.text();
        }
    } catch (error) {
    }
    return responseData;
}

const getAll = async () => {
    const url = todosUrl;
    const data = await (await fetch(url)).json();
    return data;
}

export { getById, getAll };