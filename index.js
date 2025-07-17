const addText = document.getElementById("add-text");
const addBtn = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");

/**
 * 削除ボタンを生成する関数
 * @param {HTMLElement} listItem 削除対象のリストアイテム
 * @returns {HTMLButtonElement} 削除ボタン
 */
const makeDeleteBtn = (listItem) => {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.addEventListener("click", () => {
        // 親要素から自身を削除する
        // 完了リスト、未完了リストどちらからでも削除できるようにする
        listItem.parentNode.removeChild(listItem);
    });
    return deleteBtn;
};

/**
 * 戻るボタンを生成する関数
 * @param {HTMLElement} listItem 戻す対象のリストアイテム
 * @returns {HTMLButtonElement} 戻るボタン
 */
const makeBackBtn = (listItem) => {
    const backBtn = document.createElement("button");
    backBtn.textContent = "戻る";
    // 戻るボタンは最初は未完了リストには不要なので、ここでは表示/非表示を直接操作しません
    // 完了時に必要に応じて追加・表示します

    backBtn.addEventListener("click", () => {
        doneList.removeChild(listItem); // 完了リストから削除
        todoList.appendChild(listItem); // 未完了リストに追加

        // ボタンの切り替え
        listItem.removeChild(backBtn); // 戻るボタンを削除
        const doneBtn = makeDoneBtn(listItem); // 新しい完了ボタンを作成して追加
        listItem.insertBefore(doneBtn, listItem.lastChild); // 削除ボタンの前に挿入（順序を維持）
    });
    return backBtn;
};


/**
 * 完了ボタンを生成する関数
 * @param {HTMLElement} listItem 完了対象のリストアイテム
 * @returns {HTMLButtonElement} 完了ボタン
 */
const makeDoneBtn = (listItem) => {
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "完了";
    doneBtn.addEventListener("click", () => {
        todoList.removeChild(listItem); // 未完了リストから削除
        doneList.appendChild(listItem); // 完了リストに追加

        // ボタンの切り替え
        listItem.removeChild(doneBtn); // 完了ボタンを削除
        const backBtn = makeBackBtn(listItem); // 新しい戻るボタンを作成して追加
        listItem.insertBefore(backBtn, listItem.lastChild); // 削除ボタンの前に挿入
    });
    return doneBtn;
};


/**
 * @param {string} text 追加するTODOテキスト
 * @returns {HTMLLIElement} 新しく作成されたTODOアイテム
 */
const makeTodo = (text) => {
    const listItem = document.createElement("li");
    listItem.textContent = text; // テキストコンテンツを設定

    // 各ボタンを生成し、リストアイテムに追加
    // 💡 ボタンは作成時にそのボタンが操作するlistItemを引数として渡します
    const deleteBtn = makeDeleteBtn(listItem);
    const doneBtn = makeDoneBtn(listItem); // 未完了状態なので完了ボタンが必要
    const backBtn = makeBackBtn(listItem); // 戻るボタンは生成しておくが、最初は表示しない

    listItem.appendChild(doneBtn);
    listItem.appendChild(deleteBtn);
    // backBtnは最初は表示しないが、要素自体は持っておいても良い
    // または、完了したときに初めて生成するロジックにするか、どちらでもOK
    // ここではシンプルに、必要な時に作成し直す形にしています。（makeBackBtn、makeDoneBtn内で）
    // 💡 より良い方法として、backBtnを最初から作っておき、スタイルでdisplay: none;にしておくこともできます。
    // そして、完了時にdisplay: block;、未完了に戻る時にdisplay: none;と切り替える。
    // その方がDOM操作が減ります。今回は既存のロジックに沿って、削除・追加する形にしました。

    return listItem;
};

// --- イベントリスナー ---

// 追加ボタンが押された時入力欄の値を取得し、whatTodo定数に入れる
addBtn.addEventListener("click", () => {
    const whatTodo = addText.value.trim(); // 前後の空白を除去
    addText.value = ""; // 入力欄を空にする

    if (whatTodo === "") return; // 入力欄が空っぽだったら処理を中断する

    const newTodoItem = makeTodo(whatTodo); // makeTodo関数を使って新しいTODOアイテムを作成
    todoList.appendChild(newTodoItem); // 未完了リストに追加
});