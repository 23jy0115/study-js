const onclickAdd = () => {
    //テクストボックスの値を取得後、テキストボックスの初期化をする
    const inputText = document.getElementById("add-text").value;
    document.getElementById("add-text").value = "";

    //テキストボックスで空白以外の値を未完了リストに追加
    if(inputText != ""){
        createIncompleteTodo(inputText);
    }
}

//渡された引数を元にTODOリストを作成する関数
const createIncompleteTodo = (todo) => {
        //liタグの生成
        const li = document.createElement("li");

        //divタグ生成
        const div = document.createElement("div");
        div.className = "list-row";
    
        //pタグ生成
        const p = document.createElement("p");
        p.className = "todo-item";
        p.innerText = todo;
    
        //buttonタグ(完了)の生成
        const completeButton = document.createElement("button")
        completeButton.innerText = "完了";
        completeButton.addEventListener("click", () => {
            const moveTarget = completeButton.closest("li");
            //完了ボタンの下にある削除ボタンと完了ボタン自身を消す
            completeButton.nextElementSibling.remove();
            completeButton.remove();
            //戻すボタンを生成しdivタグ下に配置
            const backButton = document.createElement("button");
            backButton.innerText = "戻す";
            backButton.addEventListener("click", () => {
                //TODOの内容を未完了に移動させる
                const todoText = backButton.previousElementSibling.innerText;
                createIncompleteTodo(todoText);
                //押された戻すボタンから一番近いliを削除
                backButton.closest("li").remove();
            });
            moveTarget.firstElementChild.appendChild(backButton);
            //完了TODOリストの履歴から消す
            const deleteCompleteButton = document.createElement("button");
            deleteCompleteButton.innerText = "完了から消す";
            deleteCompleteButton.addEventListener("click", () => {
                deleteCompleteButton.closest("li").remove();
            });
            moveTarget.firstElementChild.appendChild(deleteCompleteButton);
            //完了リスト下に配置
            document.getElementById("complete-list").appendChild(moveTarget);
        });
    
        //buttonタグ(削除)の生成
        const deleteButton = document.createElement("button")
        deleteButton.innerText = "削除";
        deleteButton.addEventListener("click", () => {
            //削除するliを削除ボタンから一番近いものから探して消す
            const deleteTarget = deleteButton.closest("li");
            document.getElementById("incomplete-list").removeChild(deleteTarget);
        });
    
        //タグの階層構造を生成
        div.appendChild(p);
        div.appendChild(completeButton);
        div.appendChild(deleteButton);
        li.appendChild(div);
        
        //htmlの階層に追加
        document.getElementById("incomplete-list").appendChild(li);
};

document.getElementById("add-button").addEventListener("click", onclickAdd)