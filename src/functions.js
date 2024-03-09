import { TodoistApi } from "@doist/todoist-api-typescript"

export default function todoGet(token){
    const api = new TodoistApi(token);
    api.addProject({ name: "Shopping List" })
    .then((project) => console.log(project))
    .catch((error) => console.log(error))
}