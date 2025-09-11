LoadData();

async function LoadData() {
    let data = await fetch('http://localhost:3000/posts');
    let posts = await data.json();
    for (const post of posts) {
        let body = document.getElementById("body");
        body.innerHTML += convertDataToHTML(post);
    }
}

async function LoadDataA() {
    let data = await fetch('http://localhost:3000/posts');
    let posts = await data.json();
    for (const post of posts) {
        let body = document.getElementById("body");
        body.innerHTML += convertDataToHTML(post);
    }
}

function convertDataToHTML(post) {
    let result = "<tr>";
    result += "<td>" + post.id + "</td>";
    result += "<td>" + post.title + "</td>";
    result += "<td>" + post.views + "</td>";
    result += "<td><input type='submit' value='Delete' onclick='Delete("+post.id+")'></input></td>";
    result += "</tr>";
    return result;
}

//POST: domain:port//posts + body
async function SaveData(){
    let title = document.getElementById("title").value;
    let view = Number(document.getElementById("view").value);

    // Lấy danh sách posts hiện tại để tìm maxId
    let res = await fetch('http://localhost:3000/posts');
    let posts = await res.json();
    let maxId = posts.length > 0 ? Math.max(...posts.map((p) => typeof p.id === "number" ? p.id : 0)) : 0;
    let newId = maxId + 1;

    let dataObj = { id: newId, title: title, views: view, isDelete: false };
    await fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify(dataObj),
        headers: {
            "Content-Type": "application/json"
        }
    });
}

//DELETE: domain:port//posts/id
async function Delete(id){
    // Lấy dữ liệu hiện tại của post
    let res = await fetch('http://localhost:3000/posts/' + id);
    let post = await res.json();

    // Cập nhật isDelete thành true
    post.isDelete = true;

    await fetch('http://localhost:3000/posts/' + id, {
        method: 'PUT',
        body: JSON.stringify(post),
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log("Xoá mềm thành công");
}