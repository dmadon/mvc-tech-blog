async function newPostFormSubmit(event){
    event.preventDefault();

    const title = document.querySelector('input#new-title').value.trim();
    const content = document.querySelector('textarea#new-content').value.trim();

    const response = await fetch ('/api/posts',{
        method:'POST',
        body:JSON.stringify({
            title,
            content
        }),
        headers:{'Content-Type':'application/json'}
    });
    if(response.ok){
        document.location.replace('/dashboard');
    }
    else{
        alert(response.statusText)
    };
};

function cancelButtonHandler(event){
    event.preventDefault();
    document.location.replace('/dashboard')};

document.querySelector('#cancel-btn').addEventListener('click',cancelButtonHandler);
document.querySelector('.new-post-form').addEventListener('submit',newPostFormSubmit);