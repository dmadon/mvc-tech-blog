async function saveEditsHandler(event){
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1];

    const title = document.querySelector('input#edit-title').value.trim();
    const content = document.querySelector('textarea#edit-content').value.trim();

    const response = await fetch(`/api/posts/${id}`,{
        method: 'PUT',
        body:JSON.stringify({
            title,
            content
        }),
        headers:{'Content-Type':'application/json'}
    })
    if (response.ok){
        document.location.replace('/dashboard');
    }
    else{
        alert(response.statusText);
    };
};


async function deletePostHandler(event){
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1];

    const response = await fetch (`/api/posts/${id}`,{
        method:'DELETE'
    });

    if(response.ok){
        document.location.replace('/dashboard/');
    }
    else{
        alert(response.statusText);
    };
};



document.querySelector('.edit-post-form').addEventListener('submit',saveEditsHandler);
document.querySelector('#delete-post-btn').addEventListener('click',deletePostHandler);