//  Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAIZRfVhRieKuCFO9xe7Mi-xDmVHNXDQzc",
  authDomain: "todo-app-d8e9a.firebaseapp.com",
  databaseURL: "https://todo-app-d8e9a-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "todo-app-d8e9a",
  storageBucket: "todo-app-d8e9a.appspot.com",
  messagingSenderId: "363905138735",
  appId: "1:363905138735:web:5c689593b13269c5af46da",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

//  Selectors
const userInput = document.getElementById("todoInput");
const todoList = document.getElementById("list");

//  Add Todo
function addTodo() {
  const value = userInput.value.trim();
  if (value === "") {
    alert("Please enter a task");
    return;
  }

  const ref = db.ref("todos").push();
  ref.set({
    id: ref.key,
    text: value,
  });

  userInput.value = "";
}


db.ref("todos").on("value", (snapshot) => {
  todoList.innerHTML = "";
  snapshot.forEach((child) => {
    const data = child.val();
    const li = document.createElement("li");
    li.textContent = data.text;

    // Delete Button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteTodo(data.id);

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTodo(data.id, data.text);

    li.appendChild(delBtn);
    li.appendChild(editBtn);
    todoList.appendChild(li);
  });
});

// Delete Single Todo
function deleteTodo(id) {
  db.ref("todos/" + id).remove();
}

// Edit Todo
function editTodo(id, oldText) {
  const newText = prompt("Update task:", oldText);
  if (newText && newText.trim() !== "") {
    db.ref("todos/" + id).update({ text: newText });
  }
}

//  Delete All
function deleteAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    db.ref("todos").remove();
  }
}
