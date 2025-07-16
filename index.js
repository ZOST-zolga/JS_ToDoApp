const inputForm = document.getElementById("add-text");
const addBtn = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");

// 追加ボタンが押された時入力欄の値を取得し、whatTodo定数に入れる
addBtn.addEventListener("click", () => {
    const whatTodo = inputForm.value;
    inputForm.value = ""; // 入力欄を空にする.


    if (whatTodo === "") return; //  「入力欄が空っぽ（何も書かれていない）だったら、それ以上なにもしないで処理を中断する」

// 未完了リストnewTodoに定数whatTodoの内容を追加
const newTodo = document.createElement("li");
newTodo.textContent = whatTodo;
//.textContent は、HTML要素の中のテキストを読み取ったり、書き換えたりするためのプロパティで、
//読むとき（取得）：要素の中にある「テキストだけ」を取り出す
//書くとき（代入）：要素の中の「テキストだけ」を指定した内容に置き換える

    // 削除ボタンを作成
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";

   //

    // 戻るボタンを作成
    const backBtn = document.createElement("button");
    backBtn.textContent = "戻る";

    //削除ボタンがクリックされたら
    deleteBtn.addEventListener("click", () => {
    if (newTodo.parentNode === doneList) {
        doneList.removeChild(newTodo);
        }else {
        todoList.removeChild(newTodo);
        }
    });

    //完了ボタンを作成
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "完了";

    //完了ボタンがクリックされたら
    doneBtn.addEventListener("click", () => {
        todoList.removeChild(newTodo);
        doneList.appendChild(newTodo);
        newTodo.appendChild(backBtn);
        newTodo.removeChild(doneBtn);
        newTodo.appendChild(deleteBtn);
    });

    // 戻るボタンがクリックされたら
    backBtn.addEventListener("click", () => {
        doneList.removeChild(newTodo);
        todoList.appendChild(newTodo);
        newTodo.removeChild(backBtn);
        newTodo.appendChild(doneBtn);
    });

    newTodo.appendChild(doneBtn);
    todoList.appendChild(newTodo);
    newTodo.appendChild(deleteBtn);
});

